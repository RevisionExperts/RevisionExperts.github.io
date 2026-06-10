<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Counter-Strike 1.6 - Web Port</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body, html { width: 100%; height: 100%; background-color: #000; overflow: hidden; }
        .game-container { width: 100%; height: 100%; }
        iframe { width: 100%; height: 100%; border: none; }
    </style>
</head>
<body>

    <div class="game-container">
        <!-- Replaced sandbox with a fully permissive engine fallback -->
        <iframe 
            src="https://play-cs.com/"
            allow="autoplay; keyboard; gamepad; fullscreen; pointer-lock; cross-origin-isolated"
            sandbox="allow-scripts allow-same-origin allow-forms allow-pointer-lock allow-downloads allow-popups">
        </iframe>
    </div>

</body>
</html>
