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
let velX = 0,
    speed = 1.5, // max speed
    friction = 0.92, // friction
    keys = [];

function draw() {
	ctx.drawImage(background, 0, 0);
	ctx.drawImage(claw, 0, 0, claw.width, claw.height, clawX, 0, claw.width, claw.height);

	//ctx.drawImage(bear, 0, 0, bear.width, bear.height, , , );

	ctx.drawImage(box, 0, 0);
	ctx.drawImage(lights, 0, 0);
}


function update() {

	// check the keys and do the movement.    
    if (keys[39]) {
        if (velX < speed) {
            velX++;
        }
    }
    if (keys[37]) {
        if (velX > -speed) {
            velX--;
        }
    }

    // apply some friction to x velocity.
    velX *= friction;
    clawX += velX;

    // // bounds checking
    // if (x >= 295) {
    //     x = 295;
    // } else if (x <= 5) {
    //     x = 5;
    // }

    // if (y > 295) {
    //     y = 295;
    // } else if (y <= 5) {
    //     y = 5;
    // }


	draw();
	requestAnimationFrame(update);
}

update();

// key events
document.body.addEventListener("keydown", function (e) {
    keys[e.keyCode] = true;
});
document.body.addEventListener("keyup", function (e) {
    keys[e.keyCode] = false;
});