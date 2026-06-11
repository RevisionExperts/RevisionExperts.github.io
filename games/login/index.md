# _Login_
<link rel="stylesheet" href="{{ '/assets/css/style.css' | relative_url }}">

<div id="arcade-page" markdown="1">

{% include arcade_sidebar.html %}

<div class="arcade-content-window" markdown="1">

<div class="auth-card-wrapper">
<h2 id="auth-title">🕹️ Player Login</h2>
<p id="auth-subtitle">Sign in to sync high scores across device viewports.</p>

<div class="auth-form-group">
<label>Player Username</label>
<input type="text" id="auth-username" placeholder="Choose username..." required>
</div>

<div class="auth-form-group">
<label>Secret Password</label>
<input type="password" id="auth-password" placeholder="••••••••" required>
</div>

<button id="btn-primary-auth" class="auth-submit-btn">Authorize Account</button>

<p class="auth-toggle-notice">
<span id="auth-switch-prompt">New to the platform?</span> 
<button id="btn-toggle-mode" class="auth-inline-link">Create Account</button>
</p>
</div>

</div>

</div>

<script>
  const firebaseConfig = {
    apiKey: "AIzaSyARmMn5vR0v_Kse2iR_eRKNCbEZow2vScs",
    authDomain: "://firebaseapp.com",
    projectId: "arcade-login-c7c70",
    storageBucket: "arcade-login-c7c70.firebasestorage.app",
    messagingSenderId: "38283367864",
    appId: "1:38283367864:web:944edbf3bccfe1fc38bb7d",
    measurementId: "G-6VGZ4M1DHL"
  };

  firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth();

  const usernameInput = document.getElementById("auth-username");
  const passwordInput = document.getElementById("auth-password");
  const submitBtn = document.getElementById("btn-primary-auth");
  const toggleBtn = document.getElementById("btn-toggle-mode");
  const titleText = document.getElementById("auth-title");
  const subtitleText = document.getElementById("auth-subtitle");
  const switchPrompt = document.getElementById("auth-switch-prompt");

  let isLoginMode = true;

  toggleBtn.addEventListener("click", () => {
    isLoginMode = !isLoginMode;
    if (isLoginMode) {
      titleText.innerText = "🕹️ Player Login";
      subtitleText.innerText = "Sign in to sync high scores across device viewports.";
      submitBtn.innerText = "Authorize Account";
      switchPrompt.innerText = "New to the platform?";
      toggleBtn.innerText = "Create Account";
    } else {
      titleText.innerText = "🎮 Register Profile";
      subtitleText.innerText = "Claim your universal arcade username today.";
      submitBtn.innerText = "Create Profile";
      switchPrompt.innerText = "Already have a profile?";
      toggleBtn.innerText = "Sign In";
    }
  });

  submitBtn.addEventListener("click", () => {
    const rawUsername = usernameInput.value.trim();
    const password = passwordInput.value;

    if (!rawUsername || !password) {
      alert("Please enter values inside both credential input parameters.");
      return;
    }

    const dummyEmail = rawUsername.toLowerCase() + "@arcade.local";
    submitBtn.innerText = "Processing Auth Script...";
    submitBtn.disabled = true;

    auth.setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .then(() => {
        if (isLoginMode) {
          return auth.signInWithEmailAndPassword(dummyEmail, password);
        } else {
          return auth.createUserWithEmailAndPassword(dummyEmail, password);
        }
      })
      .then(() => {
        if (isLoginMode) {
          alert("Authorization Successful! Welcome back.");
        } else {
          alert("Account Successfully Created! Welcome aboard.");
        }
        window.location.href = "/games/";
      })
      .catch((error) => {
        let cleanMessage = error.message;
        if (error.code === "auth/invalid-credential" || error.code === "auth/wrong-password" || error.code === "auth/user-not-found") {
          cleanMessage = "Incorrect username or secret password.";
        } else if (error.code === "auth/email-already-in-use") {
          cleanMessage = "This username is already taken by another player.";
        } else if (error.code === "auth/weak-password") {
          cleanMessage = "Password must be at least 6 characters long.";
        } else if (error.code === "auth/invalid-email") {
          cleanMessage = "Invalid characters detected inside your username string.";
        }
        
        alert("Authentication Error: " + cleanMessage);
        submitBtn.disabled = false;
        submitBtn.innerText = isLoginMode ? "Authorize Account" : "Create Profile";
      });
  });
</script>
