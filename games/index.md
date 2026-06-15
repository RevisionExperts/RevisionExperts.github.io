# _Arcade_
<link rel="stylesheet" href="{{ '/assets/css/style.css' | relative_url }}">

<div id="arcade-page" markdown="1">

{% include arcade_sidebar.html %}

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

  <!-- 4. Web Fishing -->
  {% include game_card.html 
     location="/games/web-fishing" 
     name="Web Fishing" 
     description="Fishing..." 
     image="https://sites.cortland.edu/dragon-chronicle/wp-content/uploads/sites/43/2025/02/Webfishing_logo.png"
     bg_color="#82C8E5" %}

  <!-- ULTRAKILL -->
  {% include game_card.html 
     location="/games/ultrakill" 
     name="ULTRAKILL" 
     description="BLOOD IS FUEL" 

  <!-- Planet Clicker-->
  {% include game_card.html 
     location="/games/planet-clicker" 
     name="Planet Clicker" 
     description="Planet but the clicker" 
 
     image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0gj1uUkzcGq6dbsvuO4A8qMSbIrusfY3aag3rzJlvXw&s"
     bg_color="#ED2100" %}

  <!-- 5. Counter-Strike -->
  {% include game_card.html 
     location="/games/cs16-new" 
     name="Counter-Strike 1.6" 
     description="Tactical first-person shooter" 
     image="https://cdn.akamai.steamstatic.com/steam/apps/730/capsule_616x353.jpg?t=1733170852"
     bg_color="#1A1A1A" %}

    </div>

  </div>

</div>
