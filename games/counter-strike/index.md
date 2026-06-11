<link rel="stylesheet" href="{{ '/assets/css/style.css' | relative_url }}">

<div id="arcade-page" markdown="1">

{% include arcade_sidebar.html %}
--------------------------------------------------------------
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
        #status-container {
            position: absolute;
            text-align: center;
            z-index: 10;
        }
        .spinner {
            border: 4px solid rgba(255,255,255,0.1);
            width: 50px;
            height: 50px;
            border-radius: 50%;
            border-left-color: #ff9900;
            animation: spin 1s linear infinite;
            margin: 0 auto 15px;
        }
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        canvas {
            width: 100vw;
            height: 100vh;
            display: none;
            background-color: #000;
        }
    </style>
</head>
<body>

    <div id="status-container">
        <div class="spinner" id="spinner"></div>
        <div id="status">Loading GoldSrc Engine Assets...</div>
    </div>

    <!-- The Canvas where the game renders -->
    <canvas id="canvas" oncontextmenu="event.preventDefault()"></canvas>

    <script type="text/javascript">
        if ("serviceWorker" in navigator) {
            navigator.serviceWorker.register("./mini-coi.js").then(reg => {
        +       // Reloads once on first visit to apply headers
                if (reg.active && !window.crossOriginIsolated) {
                    window.location.reload();
                }
            });
        }       
        // Xash3D WebAssembly Engine Configuration
        var Module = {
            canvas: document.getElementById('canvas'),
            // Set engine arguments (runs the cstrike mod)
            arguments: ['-game', 'cstrike', '-nostartup'],
            print: console.log,
            printErr: console.error,
            
            // Track and display loading progress
            setStatus: function(text) {
                if (!Module.setStatus.last) Module.setStatus.last = { time: Date.now(), text: '' };
                if (text === Module.setStatus.last.text) return;
                
                var m = text.match(/([^(]+)\((\d+(\.\d+)?)\/(\d+)\)/);
                var statusElement = document.getElementById('status');
                var spinnerElement = document.getElementById('spinner');
                
                if (m) {
                    text = m[1] + '(' + m[2] + '/' + m[4] + ')';
                }
                
                if (!text) {
                    // Hide loading items, show the canvas game view
                    statusElement.style.display = 'none';
                    spinnerElement.style.display = 'none';
                    document.getElementById('canvas').style.display = 'block';
                } else {
                    statusElement.innerHTML = text;
                }
            },
            
            // Point the engine to look inside your folder directory tree
            locateFile: function(path) {
                return path;
            }
        };

        // Fallback catch if the user's browser blocks SharedArrayBuffer
        if (!window.SharedArrayBuffer) {
            document.getElementById('status').innerHTML = 
                "<b style='color:red;'>Error:</b> Your browser blocks SharedArrayBuffer.<br>GitHub Pages lacks cross-origin isolation headers required for multiplayer mods.";
            document.getElementById('spinner').style.display = 'none';
        }
    </script>
    
    <!-- Core game engine compilation hooks -->
    <script async src="xash.js"></script>
</body>
</html>
