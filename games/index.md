# _Arcade_

<link rel="stylesheet" href="{{ '/assets/css/style.css' | relative_url }}">

<div id="arcade-page" markdown="1">

<div class="arcade-card-container">

  <!-- 1. Undertale Yellow -->
  {% include game_card.html 
     location="/games/undertale-yellow" 
     name="Undertale Yellow" 
     description="A brilliant fan-made prequel to the legendary RPG." 
     image="/games/undertale-yellow/thumbnail.png"
     bg_color="#ffcc00" %}

  <!-- 2. People Playground -->
  {% include game_card.html 
     location="/games/people-playground" 
     name="People Playground" 
     description="A physics-based sandbox game where you can cause massive chaos." 
     image="/assets/img/playground.jpg"
     bg_color="#4682b4" %}

  <!-- 3. Sonic.exe -->
  {% include game_card.html 
     location="/games/sonic.exe" 
     name="Sonic.exe" 
     description="The classic creepy gaming myth. Navigate a dark, eerie platforming world." 
     image="/games/sonic.exe/thumbnail.png"
     bg_color="#d11a2a" %}

</div>

</div>
