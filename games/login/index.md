# _Login_

<link rel="stylesheet" href="{{ '/assets/css/style.css' | relative_url }}">

<div id="arcade-page" markdown="1">

  <!-- Re-use our clean navigation include sidebar -->
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

<!-- LOAD FIREBASE WEB MODULE APIS (Version 10 CDN) -->
<script type="module">
  import { initializeApp } from "https://gstatic.com";
  import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://gstatic.com";

  // Paste YOUR personal Firebase Console setup object parameters down below
  const firebaseConfig = {
    apiKey: "PASTE_YOUR_API_KEY_HERE",
    authDomain: "PASTE_YOUR_AUTH_DOMAIN_HERE",
    projectId: "PASTE_YOUR_PROJECT_ID_HERE",
    storageBucket: "...",
    messagingSenderId: "...",
    appId: "..."
  };

  // Initialize Core Services
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  // Grab form UI nodes
  const usernameInput = document.getElementById("auth-username");
  const passwordInput = document.getElementById("auth-password");
  const submitBtn = document.getElementById("btn-primary-auth");
  const toggleBtn = document.getElementById("btn-toggle-mode");
  const titleText = document.getElementById("auth-title");
  const subtitleText = document.getElementById("auth-subtitle");
  const switchPrompt = document.getElementById("auth-switch-prompt");

  let isLoginMode = true;

  // Toggle layout mode between Sign-In and Registration Sign-Up
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

  // Execute Firebase Secure Authentication Calls
  submitBtn.addEventListener("click", async () => {
    const rawUsername = usernameInput.value.trim();
    const password = passwordInput.value;

    if (!rawUsername || !password) {
      alert("Please enter values inside both credential input parameters.");
      return;
    }

    // SILENT APPENDER WORKAROUND: Formats the username safely into a hidden email format
    const dummyEmail = `${rawUsername.toLowerCase()}@arcade.local`;

    try {
      submitBtn.innerText = "Processing Auth Script...";
      submitBtn.disabled = true;

      if (isLoginMode) {
        // Authenticated Login using masked username string
        await signInWithEmailAndPassword(auth, dummyEmail, password);
        alert("Authorization Successful! Welcome back.");
      } else {
        // Authenticated Registration using masked username string
        await createUserWithEmailAndPassword(auth, dummyEmail, password);
        alert("Account Successfully Created! Welcome aboard.");
      }
      
      // Send user back to main catalog menu window
      window.location.href = "{{ '/games/' | relative_url }}";

    } catch (error) {
      // Clean up common Firebase error codes to fit username context
      let cleanMessage = error.message;
      if (error.code === "auth/invalid-credential") {
        cleanMessage = "Incorrect username or secret password.";
      } else if (error.code === "auth/email-already-in-use") {
        cleanMessage = "This username is already taken by another player.";
      } else if (error.code === "auth/weak-password") {
        cleanMessage = "Password must be at least 6 characters long.";
      }
      
      alert("Authentication Error: " + cleanMessage);
      submitBtn.disabled = false;
      submitBtn.innerText = isLoginMode ? "Authorize Account" : "Create Profile";
    }
  });
</script>
