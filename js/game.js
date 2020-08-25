const background = new Image();
background.src = 'img/background.png';
const lights = new Image();
lights.src = 'img/lights.png';

const machine = new Machine();
const claw = new Claw();
const bear = new Bear();


function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.drawImage(background, 0, 0);

	claw.draw();
	bear.draw();
	machine.draw();

	ctx.drawImage(lights, 0, 0);
}

function update() {

    claw.update();

	draw();
	requestAnimationFrame(update);
}

update();

