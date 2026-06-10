<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Counter-Strike (DOS)</title>
    <link rel="stylesheet" href="https://js-dos.com">
    <script src="https://js-dos.com"></script>
    <style>
        html, body, #dos { width: 100%; height: 100%; margin: 0; padding: 0; background: #000; }
    </style>
</head>
<body>
    <div id="dos"></div>
    <script>
        // This launches the game file located in this exact folder
        Dos(document.getElementById("dos")).run("cs.zip");
    </script>
</body>
</html>
