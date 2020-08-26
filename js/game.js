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

update();