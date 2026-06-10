# _Counter-Strike_
<link rel="stylesheet" href="{{ '/assets/css/style.css' | relative_url }}">

<div id="arcade-page" markdown="1">

{% include arcade_sidebar.html %}

<div class="arcade-content-window" markdown="1">

<div class="game-page-header">
<h2>Counter-Strike</h2>
<p>Tactical first-person shooter gameplay</p>
</div>

<div class="game-content">
<iframe src="https://playcsgame.com" style="width: 100%; height: 700px; border: none; border-radius: 8px;" allow="fullscreen"></iframe>
</div>

</div>

</div>

<style>
.game-content {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 750px;
  background: #000;
  border-radius: 8px;
  overflow: hidden;
}

iframe {
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.8);
}
</style>
