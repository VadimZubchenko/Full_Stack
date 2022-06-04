var canvas;
var ctx;
var running = 0;
var interval = 0;
//
//DOMContentLoaded – браузер полностью загрузил HTML, было построено DOM-дерево, но внешние ресурсы,
// такие как картинки <img> и стили, могут быть ещё не загружены.
//windows.onload – браузер загрузил HTML и внешние ресурсы (картинки, стили и т.д.).
//beforeunload/unload – пользователь покидает страницу.

//функция обработчик событий canvas, ctx будут вызваны, когда произойдёт событие загрузки окна.
window.onload = function () {
  canvas = document.getElementById("mycanvas");
  ctx = canvas.getContext("2d");
};

function startCanvas() {
  let startbutton = document.getElementById("startbutton");
  //jos se on jo käynnissä sittten running = true;
  if (running) {
    running = 0;
    clearInterval(interval);
  } else {
    running = 1;
    startbutton.innerHTML = "Stop";
    interval = setInterval(createRect, 600);
  }
}
function createRect() {
  let x = 0;
  let y = 0;
  let side = 0;
  let color = "#";
  const colorpicker = "0123456789ABCDEF";
  y = Math.floor(Math.random() * 400);
  x = Math.floor(Math.random() * 400);
  side = Math.floor(Math.random() * 80) + 20;
  for (let i = 0; i < 6; i++) {
    let temp = Math.floor(Math.random() * 16); // floor poistaa desimaalia,
    //each iteration color grows up by one of letters[array index]
    color = color + colorpicker[temp];
    console.log(color);
  }
  ctx.fillStyle = color;
  ctx.fillRect(x, y, side, side); // ctx piirtää neliön
}

function clearCanvas() {
  ctx.clearRect(0, 0, 500, 500);
}
