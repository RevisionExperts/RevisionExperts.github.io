# _Login_
---

<div class="auth-container">
  {% include arcade_sidebar.html %}

  <h2 id="auth-title">🕹️ Player Login</h2>
  <p id="auth-subtitle">Sign in to sync high scores across device viewports.</p>

  <!-- Credential Inputs -->
  <input type="text" id="auth-username" placeholder="Player Username">
  <input type="password" id="auth-password" placeholder="Secret Password">
  
  <button id="btn-primary-auth">Authorize Account</button>
  
  <hr style="margin: 20px 0; border: 0; border-top: 1px solid #ccc;">
  
  <!-- NEW: GitHub Auth Button -->
  <button id="btn-github-auth" style="background-color: #24292e; color: white; border: none; padding: 10px; width: 100%; cursor: pointer;">
    🐱 Sign in with GitHub
  </button>

  <p>
    <span id="auth-switch-prompt">New to the platform?</span> 
    <button id="btn-toggle-mode" style="background: none; border: none; color: #007bff; cursor: pointer; text-decoration: underline;">Create Account</button>
  </p>
</div>

<!-- 1. LOAD FIREBASE CORE AND AUTH SDKs (v8 Namespaced Syntax to match your script style) -->
<script src="https://gstatic.com"></script>
<script src="https://gstatic.com"></script>

<script>
  // 2. FIXED CONFIG: Added your missing project ID to authDomain
  const firebaseConfig = {
    apiKey: "AIzaSyARmMn5vR0v_Kse2iR_eRKNCbEZow2vScs",
    authDomain: "arcade-login-c7c70.firebaseapp.com",
    projectId: "arcade-login-c7c70",
    storageBucket: "arcade-login-c7c70.firebasestorage.app",
    messagingSenderId: "38283367864",
    appId: "1:38283367864:web:944edbf3bccfe1fc38bb7d",
    measurementId: "G-6VGZ4M1DHL"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth();

  // DOM Elements
  const usernameInput = document.getElementById("auth-username");
  const passwordInput = document.getElementById("auth-password");
  const submitBtn = document.getElementById("btn-primary-auth");
  const githubBtn = document.getElementById("btn-github-auth");
  const toggleBtn = document.getElementById("btn-toggle-mode");
  const titleText = document.getElementById("auth-title");
  const subtitleText = document.getElementById("auth-subtitle");
  const switchPrompt = document.getElementById("auth-switch-prompt");
  
  let isLoginMode = true;

  // UI Toggle Logic
  toggleBtn.addEventListener("click", () => {
    isLoginMode = !isLoginMode;
    if (isLoginMode) {
      titleText.innerText = "🕹️ Player Login";
      subtitleText.innerText = "Sign in to sync high scores across device viewports.";
      submitBtn.innerText = "Authorize Account";
      switchPrompt.innerText = "New to the platform?";
      toggleBtn.innerText = "Create Account";
      githubBtn.style.display = "block"; // Show GitHub button on login
    } else {
      titleText.innerText = "🎮 Register Profile";
      subtitleText.innerText = "Claim your universal arcade username today.";
      submitBtn.innerText = "Create Profile";
      switchPrompt.innerText = "Already have a profile?";
      toggleBtn.innerText = "Sign In";
      githubBtn.style.display = "none"; // Hide GitHub button on signup
    }
  });

  // NEW: GitHub Authentication Script
  githubBtn.addEventListener("click", () => {
    githubBtn.innerText = "Connecting to GitHub...";
    githubBtn.disabled = true;

    const provider = new firebase.auth.GitHubAuthProvider();
    
    // Using redirect strategy which works natively on mobile & cross-origin deployment environments
    auth.signInWithPopup(provider)
      .then((result) => {
        alert("GitHub Authorization Successful!");
        window.location.href = "/games/";
      })
      .catch((error) => {
        console.error(error);
        alert("GitHub Login Failed: " + error.message);
        githubBtn.innerText = "🐱 Sign in with GitHub";
        githubBtn.disabled = false;
      });
  });

  // Standard Username/Password Logic
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
