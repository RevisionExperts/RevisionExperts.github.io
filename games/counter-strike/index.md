<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Counter-Strike 1.6 - RevisionExperts</title>
    <style>
        body {
            margin: 0;
            background-color: #111;
            color: #fff;
            font-family: Arial, sans-serif;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100vh;
            overflow: hidden;
        }
        #loader-container {
            position: absolute;
            text-align: center;
            z-index: 10;
            width: 300px;
        }
        #status {
            margin-bottom: 12px;
            font-size: 14px;
            color: #aaa;
        }
        .progress-track {
            width: 100%;
            height: 20px;
            background-color: #222;
            border-radius: 10px;
            overflow: hidden;
            border: 1px solid #444;
        }
        .progress-fill {
            width: 0%;
            height: 100%;
            background: linear-gradient(90deg, #ff6600, #ff9900);
            transition: width 0.1s ease-out;
        }
        canvas {
            width: 100vw;
            height: 100vh;
            display: none;
            background-color: #000;
        }
    </style>
</head>
<body>

    <!-- 1. The Dynamic Graphical Loading Interface -->
    <div id="loader-container">
        <div id="status">Bypassing security restrictions...</div>
        <div class="progress-track">
            <div id="progress-bar" class="progress-fill"></div>
        </div>
    </div>

    <!-- 2. The Game Execution Canvas -->
    <canvas id="canvas" oncontextmenu="event.preventDefault()"></canvas>

    <!-- 3. Self-Contained Header Generation Bypass Script -->
    <script type="text/javascript">
        // This block auto-creates a service worker out of thin air to unblock SharedArrayBuffer
        if ('serviceWorker' in navigator) {
            const swCode = `
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
            const blob = new Blob([swCode], { type: 'text/javascript' });
            navigator.serviceWorker.register(URL.createObjectURL(blob)).then(reg => {
                if (reg.active && !window.crossOriginIsolated) {
                    window.location.reload();
                }
            });
        }

        // 4. Core Game Engine Parameters
        var Module = {
            canvas: document.getElementById('canvas'),
            arguments: ['-game', 'cstrike', '-nostartup'],
            print: console.log,
            printErr: console.error,
            
            setStatus: function(text) {
                var statusElement = document.getElementById('status');
                var progressBar = document.getElementById('progress-bar');
                var loaderContainer = document.getElementById('loader-container');
                
                var match = text.match(/([^(]+)\((\d+(\.\d+)?)\/(\d+)\)/);
                if (match) {
                    var currentStep = parseFloat(match[2]);
                    var totalSteps = parseFloat(match[4]);
                    var percentage = Math.round((currentStep / totalSteps) * 100);
                    
                    statusElement.innerHTML = "Downloading engine assets... (" + percentage + "%)";
                    progressBar.style.width = percentage + "%";
                } else {
                    statusElement.innerHTML = text || "Unpacking internal file tables...";
                }
                
                if (!text) {
                    loaderContainer.style.display = 'none';
                    document.getElementById('canvas').style.display = 'block';
                }
            },
            locateFile: function(path) { return path; }
        };
    </script>
    
    <!-- 5. Initialize Engine Assembly -->
    <script async src="xash.js"></script>
</body>
</html>
