const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const background = new Image();
const box = new Image();
const claw = new Image();
const lights = new Image();
const bear = new Image();

const clawWidth = 144;
const boxX = 168;
const boxWidth = 626;

background.src = 'images/background.png';
box.src = 'images/box.png';
claw.src = 'images/claw.png';
lights.src = 'images/lights.png';
bear.src = 'images/bear.png';


//Position centree de la pince
let clawX = (canvas.width / 2) - (clawWidth / 2);


function draw() {
	ctx.drawImage(background, 0, 0);
	ctx.drawImage(claw, 0, 0, claw.width, claw.height, clawX, 0, claw.width, claw.height);

	//ctx.drawImage(bear, 0, 0, bear.width, bear.height, , , );

	ctx.drawImage(box, 0, 0);
	ctx.drawImage(lights, 0, 0);
}


function update(time = 0) {
	draw();
	requestAnimationFrame(update);
}

document.addEventListener('keydown', event => {
	if (event.keyCode === 37) {
		clawX--;
	} else if (event.keyCode == 39) {
		clawX++;
	}
})

update();