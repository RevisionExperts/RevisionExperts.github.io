<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Counter-Strike 1.6 - Web Client</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body, html { width: 100%; height: 100%; background-color: #111; font-family: sans-serif; overflow: hidden; display: flex; justify-content: center; align-items: center; color: #fff; }
        .setup-container { text-align: center; max-width: 500px; padding: 20px; border: 2px solid #de9b35; background: #1c1d20; border-radius: 8px; }
        h2 { color: #de9b35; margin-bottom: 15px; }
        p { margin-bottom: 20px; font-size: 14px; line-height: 1.5; color: #ccc; }
        .btn { display: inline-block; background: #de9b35; color: #fff; padding: 12px 24px; text-decoration: none; font-weight: bold; border-radius: 4px; transition: transform 0.1s; }
        .btn:hover { background: #f3aa3c; transform: scale(1.02); }
        .btn-alt { background: #3a3f44; margin-top: 10px; font-size: 12px; }
        .btn-alt:hover { background: #4e545a; }
    </style>
</head>
<body>

    <div class="setup-container">
        <h2>Counter-Strike 1.6 Web Terminal</h2>
        <p>
            Due to browser security protocols (Cloudflare Anti-Bot tracking), high-performance 3D action environments cannot deploy natively inside third-party website windows.
        </p>
        <!-- Launch the full instance directly safely in a parent tab frame -->
        <a href="https://play-cs.com" target="_blank" rel="noopener noreferrer" class="btn">
            Launch Full Screen Game Client
        </a>
        <br>
        <a href="https://github.io" class="btn btn-alt">
            Return to Homepage
        </a>
    </div>

</body>
</html>

