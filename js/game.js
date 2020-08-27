const machine = new Machine();
const claw = new Claw();

const bearsArray = [];

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(background, 0, 0);
    
    bearsArray.forEach(bear => bear.draw());
	claw.draw();
    machine.draw();

    drawScore('black');

    if ((score != 0) && (score % 5 == 0)) {
        drawScore('white');
    } 
}

function update() {
    frame++;

    if ((score != 0) && (score % 5 == 0)) {
        playRainBearsAnimation();
    }
    
    handleBears();

    claw.update();
    bearsArray.forEach(bear => bear.update());

	draw();
	window.requestAnimationFrame(update);
}

function drawScore(color) {
    ctx.fillStyle = color;
    ctx.font = '25px Verdana';
    ctx.fillText(`Score: ${ score }`, 425, 75);
}

//Gère le nombre d'ours dans la machine
function handleBears() {
    //Ajoute un ours si le nombre max n'est pas atteint
    if (bearsArray.length < bearsMax) {
        bearsArray.push(new Bear());
    }

    //Supprime les ours qui sont arrivés dans le trou de la machine
    for (let i = 0; i < bearsArray.length; i++) {
        if (bearsArray[i].state == 0) {
            bearsArray.splice(i, 1);
        }
    }
}

//Fait pleuvoir des ours dans la machine
function playRainBearsAnimation() {
    if (bearsArray.length < 100) {
        if(frame % 3 == 0) {
            let bear = new Bear();
            let min = machine.xWin;
            let max = machine.xWin + machine.widthWin - bear.width;
            bear.x = generateRandomNumber(min, max);
            bear.y = 0;
            bear.speed = Math.random() * 3 + 1;
            bear.catchable = false;

            bearsArray.push(bear);
        }
    }
}

update();