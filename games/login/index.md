# _Login_
<link rel="stylesheet" href="{{ '/assets/css/style.css' | relative_url }}">

<div id="arcade-page" markdown="1">

{% include arcade_sidebar.html %}

<div class="arcade-content-window" markdown="1">

<div class="auth-card-wrapper">
<h2 id="auth-title">Login/Signup</h2>
<p id="auth-subtitle">Loging in/Signing up gives you access to more features such as saving, emergency key and more.</p>

<div class="auth-form-group">
<label>Username</label>
<input type="text" id="auth-username" placeholder="Choose username..." required>
</div>

<div class="auth-form-group">
<label>Password</label>
<input type="password" id="auth-password" placeholder="••••••••" required>
</div>

<button id="btn-primary-auth" class="auth-submit-btn">Log In</button>

<p class="auth-toggle-notice">
<span id="auth-switch-prompt">Sign Up</span> 
<button id="btn-toggle-mode" class="auth-inline-link">Create Account</button>
</p>
</div>

</div>

</div>
