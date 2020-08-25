const machine = new Machine();
const claw = new Claw();

const bearsArray = [];
bearsArray.push(handleBears());

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.drawImage(background, 0, 0);

    bearsArray.forEach(bear => bear.draw());

	claw.draw();
	machine.draw();

	ctx.drawImage(lights, 0, 0);
}

function update() {

    claw.update();

    bearsArray.forEach(bear => bear.update());

	draw();
	requestAnimationFrame(update);
}

update();

