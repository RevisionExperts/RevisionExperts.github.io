import { Net, Xash3D } from "./dist-B9FkK1bt.js";
//#region src/services/xash-webrtc.ts
var Xash3DWebRTC = class extends Xash3D {
	channel;
	resolve;
	ws;
	peer;
	multiplayerIP;
	onError;
	constructor(opts) {
		super(opts);
		this.multiplayerIP = opts?.multiplayerIP;
		this.net = new Net(this);
		this.onError = opts?.onError;
	}
	async init() {
		await Promise.all([super.init(), this.connect()]);
	}
	initConnection(stream) {
		if (this.peer) return;
		this.peer = new RTCPeerConnection();
		this.peer.onicecandidate = (e) => {
			if (!e.candidate) return;
			this.ws.send(JSON.stringify({
				event: "candidate",
				data: e.candidate.toJSON()
			}));
		};
		stream?.getTracks()?.forEach((t) => {
			this.peer.addTrack(t, stream);
		});
		let channelsCount = 0;
		this.peer.ondatachannel = (e) => {
			if (e.channel.label === "write") e.channel.onmessage = (ee) => {
				const packet = {
					ip: [
						127,
						0,
						0,
						1
					],
					port: 8080,
					data: ee.data
				};
				if (ee.data.arrayBuffer) ee.data.arrayBuffer().then((data) => {
					packet.data = data;
					this.net.incoming.enqueue(packet);
				});
				else this.net.incoming.enqueue(packet);
			};
			e.channel.onopen = () => {
				channelsCount += 1;
				if (e.channel.label === "read") this.channel = e.channel;
				if (channelsCount === 2) {
					if (this.resolve) {
						const r = this.resolve;
						this.resolve = void 0;
						r();
					}
				}
			};
		};
	}
	_onError(error, ip) {
		const ws = error.target;
		if (ws && ws.readyState && ws.readyState === 3) {
			if (!confirm(`Failed to connect to ${ip}, continue?`)) {
				this.onError?.();
				window.location.reload();
			}
		}
	}
	async connect() {
		const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
		return new Promise((resolve) => {
			this.resolve = resolve;
			const ip = `ws://${this.multiplayerIP}/websocket`;
			this.ws = new WebSocket(ip);
			this.ws.onerror = (error) => {
				this._onError(error, ip);
				resolve(void 0);
			};
			const handler = async (e) => {
				this.initConnection(stream);
				const parsed = JSON.parse(e.data);
				if (parsed.event === "offer") {
					const sdp = typeof parsed.data === "string" ? JSON.parse(parsed.data) : parsed.data;
					await this.peer.setRemoteDescription(sdp);
					const answer = await this.peer.createAnswer();
					await this.peer.setLocalDescription(answer);
					this.ws.send(JSON.stringify({
						event: "answer",
						data: answer
					}));
				}
				if (parsed.event === "candidate") {
					const sdp = typeof parsed.data === "string" ? JSON.parse(parsed.data) : parsed.data;
					await this.peer.addIceCandidate(sdp);
				}
			};
			this.ws?.addEventListener("message", handler);
		});
	}
	sendto(packet) {
		if (!this.channel) return;
		this.channel.send(packet.data);
	}
};
//#endregion
export { Xash3DWebRTC };
