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
            background-color: #0b0c0d;
            overflow: hidden;
            font-family: Arial, sans-serif;
        }
        .wrapper {
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
        }
        .header-bar {
            background: #1a1c1e;
            color: #de9b35;
            padding: 10px 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 2px solid #de9b35;
            height: 50px;
        }
        .header-bar a {
            color: #ffffff;
            text-decoration: none;
            font-weight: bold;
            font-size: 14px;
            background: #3a3f44;
            padding: 5px 15px;
            border-radius: 4px;
            transition: background 0.2s;
        }
        .header-bar a:hover {
            background: #de9b35;
        }
        .game-frame {
            flex: 1;
            width: 100%;
            height: calc(100% - 50px);
            border: none;
        }
    </style>
</head>
<body>

    <div class="wrapper">
        <!-- Navigation bar to allow players to return to your main homepage easily -->
        <div class="header-bar">
            <span>Counter-Strike 1.6 Web Port</span>
            <a href="https://github.io">← Back to Home</a>
        </div>
        
        <!-- Uses a programmatic cross-origin embed layout optimized for Play-CS bypass rules -->
        <iframe 
            class="game-frame"
            src="https://play-cs.com" 
            allow="autoplay; keyboard; gamepad; fullscreen; pointer-lock"
            sandbox="allow-scripts allow-same-origin allow-forms allow-pointer-lock allow-downloads allow-popups">
        </iframe>
    </div>

</body>
</html>
