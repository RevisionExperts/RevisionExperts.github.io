<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Counter-Strike 1.6 - RevisionExperts</title>
    <style>
        body {
            margin: 0;
            background-color: #0b0c0d;
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
            width: 320px;
        }
        #status {
            margin-bottom: 15px;
            font-size: 14px;
            color: #ffa500;
            font-weight: bold;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        .progress-track {
            width: 100%;
            height: 12px;
            background-color: #1a1c1e;
            border-radius: 6px;
            overflow: hidden;
            border: 1px solid #333;
        }
        .progress-fill {
            width: 0%;
            height: 100%;
            background: linear-gradient(90deg, #ff4500, #ff8c00);
            box-shadow: 0 0 10px #ff4500;
            transition: width 0.1s linear;
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

    <div id="loader-container">
        <div id="status">Connecting to MediaFire Cloud Node...</div>
        <div class="progress-track">
            <div id="progress-bar" class="progress-fill"></div>
        </div>
    </div>

    <canvas id="canvas" oncontextmenu="event.preventDefault()"></canvas>

    <script type="text/javascript">
        // ⚠️ PASTE YOUR DIRECT MEDIAFIRE DOWNLOAD URL BETWEEN THE QUOTES BELOW:
        var MEDIAFIRE_URL = "https://download1979.mediafire.com/k9pzyic88kog2mBlVxBZHvnqng0zG4HsHvNPgwBimeo9JhW5CJB34ydLVjdQdwYkFiENwizwo3uMkYQ_1O1XfUw3MvtOpWolNVtcNu_hPQea_IPpmPIo_7DEaCCXkVoahfKKBx8tj_I64F8mlzsdUYwDbiwKheHWZ3JvQcu3YlRR/izel62cmmqhgx50/cstrike.zip";

        // Self-contained Service Worker header unblocker
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

        // WebAssembly Core Game Variable Configurations
        var Module = {
            canvas: document.getElementById('canvas'),
            arguments: ['-game', 'cstrike', '-nostartup'],
            print: console.log,
            printErr: console.error,
            
            // Drives the visual loading bar percentages using the data download stream
            setStatus: function(text) {
                var statusElement = document.getElementById('status');
                var progressBar = document.getElementById('progress-bar');
                var loaderContainer = document.getElementById('loader-container');
                
                var match = text.match(/([^(]+)\((\d+(\.\d+)?)\/(\d+)\)/);
                if (match) {
                    var currentStep = parseFloat(match[2]);
                    var totalSteps = parseFloat(match[4]);
                    var percentage = Math.round((currentStep / totalSteps) * 100);
                    
                    statusElement.innerHTML = "Downloading Full Game Assets... " + percentage + "%";
                    progressBar.style.width = percentage + "%";
                } else {
                    statusElement.innerHTML = text || "Extracting folder matrix...";
                }
                
                if (!text) {
                    loaderContainer.style.display = 'none';
                    document.getElementById('canvas').style.display = 'block';
                }
            },
            
            // Automatically pulls the massive zip from MediaFire and creates a virtual system drive
            preRun: [function() {
                Module.FS_createPreloadedFile('/', 'cstrike.zip', MEDIAFIRE_URL, true, false);
            }],
            locateFile: function(path) { return path; }
        };
    </script>
    
    <script async src="xash.js"></script>
</body>
</html>