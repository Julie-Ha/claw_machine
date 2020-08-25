class Claw {
	constructor() {
		this.width = 120;
		this.height = 249;
		this.x = (canvas.width / 2) - (this.width / 2);
		this.y = 0;
		this.sprite = 'img/claw.png';
		this.state = 1;
	}
	update() {
		//Etat 1: La pince se déplace normalement
		if (this.state == 1) { 
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
	        if (keys[32]) { //Si le joueur appuie sur la barre espace 
	        	this.state = 2; //On passe à l'état 2
	        }

	        //apply some friction to x velocity.
	        velX *= friction;
	        this.x += velX;

	        // bounds checking
	        if (this.x + this.width >= machine.xWin + machine.widthWin) {
	            this.x = machine.xWin + machine.widthWin - this.width;
	        } else if (this.x <= machine.xWin) {
	            this.x = machine.xWin;
	        }
		}

		//Etat 2: La pince essaie d'attraper un ours
		if (this.state == 2) {
			//Reinitialisation de la velocité sinon la pince bouge en remontant
			velX = 0;

			//La pince descend jusqu'à atteindre 1/6 de la hauteur de la machine
			if (this.y == machine.height / 6) {
				this.state = 3;
			} else {
				this.y++;
			}
		}

		//Etat 3: La pince remonte avec ou sans ours
		if (this.state == 3) {
			if (this.y == 0) {
				this.state = 1;
			} else {
				this.y--;
			}
		}
		
	}
	draw() {
		let img = new Image();
		img.src = this.sprite;
		ctx.drawImage(img, 0, 0, this.width, this.height, this.x, this.y, this.width, this.height);
	}
}