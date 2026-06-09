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
