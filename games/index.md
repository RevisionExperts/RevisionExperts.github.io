# _Arcade_

<link rel="stylesheet" href="{{ '/assets/css/style.css' | relative_url }}">

<div id="arcade-page" markdown="1">

<div class="arcade-card-container">

  <!-- 1. Undertale Yellow -->
  {% include game_card.html 
     location="/games/undertale-yellow" 
     name="Undertale Yellow" 
     description="undertale with a gun" 
     image="/games/undertale-yellow/favicon.png"
     bg_color="#EFBF04" %}

  <!-- 2. People Playground -->
  {% include game_card.html 
     location="/games/people-playground" 
     name="People Playground" 
     description="Gore and chaos sandbox game" 
     image="/assets/img/playground.jpg"
     bg_color="#6D8196" %}

  <!-- 3. Sonic.exe -->
  {% include game_card.html 
     location="/games/sonic.exe" 
     name="Sonic.exe" 
     description="sonic but hes exe" 
     image="/games/sonic.exe/thumbnail.png"
     bg_color="#CD1C18" %}

  {% include game_card.html 
     location="/games/web-fishing" 
     name="Web Fishing" 
     description="Fishing..." 
     image="/games/web-fishing/"
     bg_color="#82C8E5" %}
</div>

</div>
