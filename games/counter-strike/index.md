<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Counter-Strike 1.0 (DOS)</title>
    <!-- Loads js-dos framework directly into this folder -->
    <link rel="stylesheet" href="https://js-dos.com">
    <script src="https://js-dos.com"></script>
    <style>
        html, body, #dos { width: 100%; height: 100%; margin: 0; padding: 0; background: #000; }
    </style>
</head>
<body>
    <div id="dos"></div>
    <script>
        // Runs the specific CS zip package inside this exact folder
        Dos(document.getElementById("dos")).run("cs.zip");
    </script>
</body>
</html>
