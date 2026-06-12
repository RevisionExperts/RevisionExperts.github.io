<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Counter-Strike 1.6 - RevisionExperts</title>
    <style>
        body, html { margin: 0; padding: 0; width: 100%; height: 100%; overflow: hidden; background-color: #000; display: flex; align-items: center; justify-content: center; }
        canvas { width: 100vw; height: 100vh; display: block; background-color: #000; }
        #loading-text { position: absolute; color: #ffa500; font-family: Arial, sans-serif; font-weight: bold; text-transform: uppercase; font-size: 14px; letter-spacing: 1px; pointer-events: none; }
    </style>
</head>
<body>

    <div id="loading-text">Loading Classic Assets...</div>
    <canvas id="canvas" onclick="window.focus(); this.focus();" oncontextmenu="event.preventDefault()"></canvas>

    <script type="text/javascript">
        // UNIVERSAL SECURITY COI UNLOCKER: Dynamically forces Cross-Origin Isolation headers to wake up the CPU
        if (!window.crossOriginIsolated && window.location.protocol !== 'file:') {
            const workerCode = `
                self.addEventListener('install', () => self.skipWaiting());
                self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));
                self.addEventListener('fetch', e => {
                    if (e.request.cache === 'only-if-cached' && e.request.mode !== 'same-origin') return;
                    e.respondWith(
                        fetch(e.request).then(res => {
                            if (res.status === 0) return res;
                            const h = new Headers(res.headers);
                            h.set('Cross-Origin-Opener-Policy', 'same-origin');
                            h.set('Cross-Origin-Embedder-Policy', 'require-corp');
                            return new Response(res.body, { status: res.status, statusText: res.statusText, headers: h });
                        })
                    );
                });
            `;
            const blob = new Blob([workerCode], { type: 'text/javascript' });
            navigator.serviceWorker.register(URL.createObjectURL(blob)).then(() => {
                if (window.name !== 'coi-loop-unlocked') {
                    window.name = 'coi-loop-unlocked';
                    window.location.reload();
                }
            }).catch(err => console.error(err));
        }

        window.Module = {
            canvas: document.getElementById('canvas'),
            arguments: ['-game', 'cstrike', '-nostartup'],
            print: console.log,
            printErr: console.error,
            
            locateFile: function(path) {
                return 'https://github.io' + path;
            },
            
            setStatus: function(text) {
                if (!text) {
                    var textElement = document.getElementById('loading-text');
                    if (textElement) textElement.style.display = 'none';
                    window.focus();
                    document.getElementById('canvas').focus();
                }
            }
        };

        window.addEventListener('load', function() {
            const script = document.createElement('script');
            script.async = true;
            script.type = 'module';
            script.src = 'xash.js';
            document.body.appendChild(script);
        });
    </script>
</body>
</html>
