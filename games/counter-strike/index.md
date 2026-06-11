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
        
        /* The main container holding the loader interface */
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

        /* The empty gray background track of the progress bar */
        .progress-track {
            width: 100%;
            height: 20px;
            background-color: #222;
            border-radius: 10px;
            overflow: hidden;
            border: 1px solid #444;
        }

        /* The active orange bar that dynamically expands across the track */
        .progress-fill {
            width: 0%; /* Driven dynamically by JavaScript percentages */
            height: 100%;
            background: linear-gradient(90deg, #ff6600, #ff9900);
            transition: width 0.1s ease-out; /* Keeps animation tracking perfectly smooth */
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
        <div id="status">Preparing engine environment...</div>
        <div class="progress-track">
            <div id="progress-bar" class="progress-fill"></div>
        </div>
    </div>

    <!-- The Canvas where the game renders -->
    <canvas id="canvas" oncontextmenu="event.preventDefault()"></canvas>

    <script type="text/javascript">
        // Register the service worker to bypass the GitHub security block
        if ("serviceWorker" in navigator) {
            navigator.serviceWorker.register("./mini-coi.js?v=" + Date.now()).then(reg => {
                reg.update();
                if (reg.active && !window.crossOriginIsolated) {
                    window.location.reload(); 
                }
            });
        }

        // Xash3D WebAssembly Engine Hook Configurations
        var Module = {
            canvas: document.getElementById('canvas'),
            arguments: ['-game', 'cstrike', '-nostartup'],
            print: console.log,
            printErr: console.error,
            
            // This function listens to real-time loading updates from xash.js
            setStatus: function(text) {
                var statusElement = document.getElementById('status');
                var progressBar = document.getElementById('progress-bar');
                var loaderContainer = document.getElementById('loader-container');
                
                // Emscripten formatting string match: e.g., "Downloading data (15/450)"
                var match = text.match(/([^(]+)\((\d+(\.\d+)?)\/(\d+)\)/);
                
                if (match) {
                    var currentStep = parseFloat(match[2]);
                    var totalSteps = parseFloat(match[4]);
                    
                    // Calculate current loading progress out of 100%
                    var percentage = Math.round((currentStep / totalSteps) * 100);
                    
                    // Dynamically push progress to screen text and layout width
                    statusElement.innerHTML = match[1] + " (" + percentage + "%)";
                    progressBar.style.width = percentage + "%";
                } else {
                    // Update text if it's just raw information sentences
                    statusElement.innerHTML = text || "Launching engine modules...";
                }
                
                // If there is no text left to display, it means the loading is 100% done
                if (!text) {
                    loaderContainer.style.display = 'none'; // Hide the progress bar panel
                    document.getElementById('canvas').style.display = 'block'; // Show game canvas
                }
            },
            locateFile: function(path) {
                return path;
            }
        };
    </script>
    
    <script async src="xash.js"></script>
</body>
</html>
