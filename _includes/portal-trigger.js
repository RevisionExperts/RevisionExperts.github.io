const secretImg = document.getElementById('secret-img');

if (secretImg) {
    let pressTimer;

    // Start the 3-second countdown when pressed
    function startPress(e) {
        if (e.type === 'touchstart') {
            e.preventDefault(); 
        }

        pressTimer = setTimeout(() => {
            const code = prompt("Enter portal access code:");
            
            if (code === "math sucks") {
                // Redirects to example.com for now
                window.location.href = "https://revisionexperts.github.io/games";
            } else if (code !== null) {
                alert("Incorrect code.");
            }
        }, 3000); 
    }

    // Cancel the timer instantly if the user lets go early
    function cancelPress() {
        clearTimeout(pressTimer);
    }

    // Desktop Mouse Controls
    secretImg.addEventListener('mousedown', startPress);
    secretImg.addEventListener('mouseup', cancelPress);
    secretImg.addEventListener('mouseleave', cancelPress);

    // Mobile/Tablet Touch Controls
    secretImg.addEventListener('touchstart', startPress, { passive: false });
    secretImg.addEventListener('touchend', cancelPress);
    secretImg.addEventListener('touchmove', cancelPress);
}
