<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Counter-Strike 1.6 - Web Port</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body, html {
            width: 100vw;
            height: 100vh;
            background-color: #000;
            overflow: hidden;
        }
        canvas {
            width: 100vw;
            height: 100vh;
            top: 0;
            left: 0;
            position: fixed;
        }
    </style>
    <!-- Loads the community web engine build scripts directly over CDN network safely -->
    <script src="https://cdn.jsdelivr.net/npm/xash3d-fwgs@latest/dist/raw.js"></script>
</head>
<body>

    <!-- Main rendering canvas context for the web assembly engine graphics -->
    <canvas id="canvas"></canvas>

    <script>
        // Automatic runtime injection handler for structural WASM context files
        window.addEventListener('load', () => {
            if (typeof Xash3D !== 'undefined') {
                Xash3D({
                    canvas: document.getElementById('canvas'),
                    // Connection params pointing cleanly to community server nodes
                    args: ['-game', 'cstrike', '+connect', 'play-cs.com:27015']
                });
            }
        });
    </script>

</body>
</html>
