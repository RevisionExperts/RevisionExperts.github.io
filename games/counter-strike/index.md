    <script type="text/javascript">
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
            
            setStatus: function(text) {
                var statusElement = document.getElementById('status');
                var progressBar = document.getElementById('progress-bar');
                var loaderContainer = document.getElementById('loader-container');
                
                var match = text.match(/([^(]+)\((\d+(\.\d+)?)\/(\d+)\)/);
                if (match) {
                    var currentStep = parseFloat(match[2]);
                    var totalSteps = parseFloat(match[4]);
                    var percentage = Math.round((currentStep / totalSteps) * 100);
                    
                    statusElement.innerHTML = "Downloading Full Game Components... " + percentage + "%";
                    progressBar.style.width = percentage + "%";
                } else {
                    statusElement.innerHTML = text || "Unpacking secure asset filesystem...";
                }
                
                if (!text) {
                    loaderContainer.style.display = 'none';
                    document.getElementById('canvas').style.display = 'block';
                }
            },
            
            // THE LOCAL STITCHER: Points directly to your repo chunks (No MediaFire links)
            preRun: [function() {
                // This tracks your exact local file names sitting in your repo
                var parts = ['cstrike.zip.2', 'cstrike.zip.3', 'cstrike.zip.4', 'cstrike.zip.5'];
                var buffers = [];
                var statusElement = document.getElementById('status');
                var progressBar = document.getElementById('progress-bar');
                
                parts.forEach(function(part, index) {
                    var xhr = new XMLHttpRequest();
                    // Pulls the file relative to your site path
                    xhr.open('GET', part, false); 
                    xhr.responseType = 'arraybuffer';
                    xhr.send(null);
                    
                    buffers.push(new Uint8Array(xhr.response));
                    
                    var pct = Math.round(((index + 1) / parts.length) * 100);
                    statusElement.innerHTML = "Stitching Local Chunks... " + pct + "%";
                    progressBar.style.width = pct + "%";
                });
                
                // Merges everything into the virtual file system
                var totalLength = buffers.reduce((acc, val) => acc + val.length, 0);
                var combined = new Uint8Array(totalLength);
                var offset = 0;
                buffers.forEach(function(buffer) {
                    combined.set(buffer, offset);
                    offset += buffer.length;
                });
                
                Module.FS_createDataFile('/', 'cstrike.zip', combined, true, false);
            }],
            locateFile: function(path) { return path; }
        };
    </script>
