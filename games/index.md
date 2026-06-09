# _Arcade_

<link rel="stylesheet" href="{{ '/assets/css/style.css' | relative_url }}">

<div id="arcade-page" markdown="1">

<div class="arcade-card-container">

  <!-- 1. Undertale Yellow -->
  {% include game_card.html 
     location="/games/undertale-yellow" 
     name="Undertale Yellow" 
     description="undertale with a gun" 
     image="/games/undertale-yellow/thumbnail.png"
     bg_color="#ffcc00" %}

  <!-- 2. People Playground -->
  {% include game_card.html 
     location="/games/people-playground" 
     name="People Playground" 
     description="Gore and chaos sandbox game" 
     image="/assets/img/playground.jpg"
     bg_color="#4682b4" %}

  <!-- 3. Sonic.exe -->
  {% include game_card.html 
     location="/games/sonic.exe" 
     name="Sonic.exe" 
     description="sonic but hes exe" 
     image="/games/sonic.exe/thumbnail.png"
     bg_color="#d11a2a" %}

  {% include game_card.html 
     location="/games/web-fishing" 
     name="Web Fishing" 
     description="Fishing..." 
     image="/games/web-fishing/"
     bg_color="#d11a2a" %}
</div>

</div>
