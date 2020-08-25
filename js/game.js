const machine = new Machine();
const claw = new Claw();

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.drawImage(background, 0, 0);

	claw.draw();
	machine.draw();

	ctx.drawImage(lights, 0, 0);
}

function update() {

    claw.update();

	draw();
	requestAnimationFrame(update);
}

update();

