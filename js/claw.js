class Claw {
	constructor() {
		this.width = 120;
		this.height = 249;
		this.x = (canvas.width / 2) - (this.width / 2);
		this.y = 0;
		this.state = 1;
		this.bear = null; //L'ours attrapé
		this.velX = 0;
		this.speed = 3;
		this.friction = 0.92;
	}

	update() {
		//Etat 1: La pince se déplace normalement
		if (this.state == 1) { 
			this.move();
		}

		//Etat 2: La pince essaie d'attraper un ours
		if (this.state == 2) {
			this.playDownAnimation();
		}

		//Etat 3: Détection d'un ours et mouvement vers le haut
		if (this.state == 3) {
			this.playUpAnimation();
		}

		//Etat 4: La pince remonte avec un ours
		if (this.state == 4) {
			this.playUpWithBearAnimation();
		}

		//Etat 5: La pince se deplace vers la gauche et lache l'ours
		if (this.state == 5) {
			this.playLeftAnimation();
		}
		
	}

	draw() {
		ctx.drawImage(clawSprite, 0, 0, this.width, this.height, this.x, this.y, this.width, this.height);
	}

	move() {
		if (keys[39]) {
			if (this.velX < this.speed) {
				this.velX++;
			}
		}
		if (keys[37]) {
			if (this.velX > -this.speed) {
				this.velX--;
			}
		}
		if (keys[32]) { //Si le joueur appuie sur la barre espace 
			this.state = 2; //On passe à l'état 2
		}

		// Permet à la pince de bouger de manière fluide 
		// et de continuer à bouger un peu lorsqu'une flèche directionnelle est relachée
		this.velX *= this.friction;
		this.x += this.velX;

		// Vérification des bords de la machine
		if (this.x + this.width >= machine.xWin + machine.widthWin) {
			this.x = machine.xWin + machine.widthWin - this.width;
		} else if (this.x <= machine.xWin) {
			this.x = machine.xWin;
		}
	}

	playDownAnimation() {
		//Réinitialisation de la velocité sinon la pince bouge lorsqu'elle a fini de remonter
		this.velX = 0;

		if (this.y > machine.height / 6) {
			this.state = 3;
		} else {
			this.y += this.speed;
		}
	}

	playUpAnimation() {
		for (let i = 0; i < bearsArray.length; i++) {
			//On vérifie si un ours se trouve dans la pince
			if ((bearsArray[i].state != 3) && (bearsArray[i].x > this.x) && (bearsArray[i].x + bearsArray[i].width < this.x + this.width)) {
					score++;
					this.state = 4; 
					this.bear = bearsArray[i];
					this.bear.state = 2; //L'ours est attrapé, il passe à l'état 2
					break;
			  }
		}

		//Si on est ici, c'est qu'aucun ours n'a été attrapé, on remonte la pince
		if (this.y < 0) {
			this.state = 1;
		} else {
			this.y -= this.speed;
		}
	}

	playUpWithBearAnimation() {
		if (this.y < 0) {
			this.state = 5;
		} else {
			this.y -= this.speed;
		}
	}

	playLeftAnimation() {
		//La pince se dirige vers le trou de la machine pour relacher l'ours
		if (this.x > machine.width / 3 + this.width / 2) {
			this.x -= this.speed;
		} else {
			this.state = 1;
			this.bear.state = 3;
			this.bear = null;
		}
	}
}