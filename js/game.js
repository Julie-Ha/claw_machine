const machine = new Machine();
const claw = new Claw();

const bearsArray = [];

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(background, 0, 0);
    
    bearsArray.forEach(bear => bear.draw());
	claw.draw();
	machine.draw();
}

function update() {
    handleBears();
    claw.update();
    bearsArray.forEach(bear => bear.update());

	draw();
	window.requestAnimationFrame(update);
}

update();

function handleBears() {
    if (bearsArray.length < bearsMax) {
        bearsArray.push(new Bear());
    }

    for (let i = 0; i < bearsArray.length; i++) {
        if (bearsArray[i].state == 0) {
            bearsArray.splice(i, 1);
        }
    }
}