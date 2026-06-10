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
            width: 100%;
            height: 100%;
            background-color: #000;
            overflow: hidden;
            font-family: Arial, sans-serif;
        }
        .game-container {
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        iframe {
            width: 100%;
            height: 100%;
            border: none;
        }
    </style>
</head>
<body>

    <div class="game-container">
        <!-- Serves the WebAssembly client inside your folder layout -->
        <iframe 
            src="https://cs-online.club" 
            allow="autoplay; keyboard; gamepad; fullscreen; pointer-lock"
            sandbox="allow-scripts allow-same-origin allow-forms allow-pointer-lock allow-downloads">
        </iframe>
    </div>

</body>
</html>
