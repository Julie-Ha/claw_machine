const machine = new Machine();

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(background, 0, 0);

  machine.draw();

  drawScore("black");

  if (score != 0 && (score % 5 == 0 || score % 7 == 0)) {
    drawScore("white");
  }
}

function update() {
  frame++;

  if (score != 0 && score % 5 == 0) {
    machine.playRainBearsAnimation();
  } else if (score != 0 && score % 7 == 0) {
    machine.playJumpingBearsAnimation();
  }

  machine.update();

  draw();
  window.requestAnimationFrame(update);
}

function drawScore(color) {
  ctx.fillStyle = color;
  ctx.font = "25px Verdana";
  ctx.fillText(`Score: ${score}`, 425, 75);
}

update();
