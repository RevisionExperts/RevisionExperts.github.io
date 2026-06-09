# _Arcade_

<link rel="stylesheet" href="{{ '/assets/css/style.css' | relative_url }}">

<div id="arcade-page" markdown="1">

  <!-- COLUMN 1: LEFT NAVIGATION SIDEBAR -->
  <div class="arcade-sidebar" markdown="1">
    
    <a href="/games/login/" class="profile-account-card auth-guest-card" title="Click to Sign In">
      <div class="profile-avatar-circle guest-avatar-frame">
        <svg xmlns="http://w3.org" viewBox="0 0 24 24" fill="#8a8d98" class="guest-user-icon">
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
        </svg>
      </div>
      <div class="profile-meta-text">
        <span class="username-display">Guest Player</span>
        <span class="user-status-tag login-action-link">🔑 Sign In / Register</span>
      </div>
    </a>

    <h3>⚙️ SYSTEM</h3>
    <a href="/games/settings/" class="menu-btn">🔧 Settings</a>
    <a href="/games/leaderboard/" class="menu-btn">🏆 High Scores</a>
    <a href="/games/favorites/" class="menu-btn">⭐ Favorites</a>
  </div> <!-- This tag MUST sit right here to close the sidebar column cleanly -->

  <!-- COLUMN 2: RIGHT CONTENT AREA WINDOW -->
  <div class="arcade-content-window" markdown="1">
    
  <div class="arcade-content-window" markdown="1">
<div class="arcade-card-container">

  <!-- 1. Undertale Yellow -->
  {% include game_card.html 
     location="/games/undertale-yellow" 
     name="Undertale Yellow" 
     description="undertale with a gun" 
     image="https://upload.wikimedia.org/wikipedia/commons/6/6b/Undertale_Yellow_splash_screen.png"
     bg_color="#EFBF04" %}

  <!-- 2. People Playground -->
  {% include game_card.html 
     location="/games/people-playground" 
     name="People Playground" 
     description="Gore and chaos sandbox game" 
     image="https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1118200/capsule_616x353.jpg?t=1776802758"
     bg_color="#6D8196" %}

  <!-- 3. Sonic.exe -->
  {% include game_card.html 
     location="/games/sonic.exe" 
     name="Sonic.exe" 
     description="sonic but hes exe" 
     image="https://i0.wp.com/constant-thinker.com/wp-content/uploads/2017/03/sonic-1.jpg?w=324&h=182&ssl=1"
     bg_color="#CD1C18" %}

  {% include game_card.html 
     location="/games/web-fishing" 
     name="Web Fishing" 
     description="Fishing..." 
     image="https://sites.cortland.edu/dragon-chronicle/wp-content/uploads/sites/43/2025/02/Webfishing_logo.png"
     bg_color="#82C8E5" %}
    </div>

  </div>

</div>
