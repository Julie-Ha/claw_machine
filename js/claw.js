class Claw {
	constructor() {
		this.width = 120;
		this.height = 249;
		this.x = (canvas.width / 2) - (this.width / 2);
		this.y = 0;
		this.sprite = 'img/claw.png';
		this.state = 1;
		this.bear = null;
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
		let img = new Image();
		img.src = this.sprite;
		ctx.drawImage(img, 0, 0, this.width, this.height, this.x, this.y, this.width, this.height);
	}

	move() {
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

	playDownAnimation() {
		//Réinitialisation de la velocité sinon la pince bouge lorsqu'elle a fini de remonter
		velX = 0;

		if (this.y > machine.height / 6) {
			this.state = 3;
		} else {
			this.y += speed;
		}
	}

	playUpAnimation() {
		for (let i = 0; i < bearsArray.length; i++) {
			if ((bearsArray[i].state != 3) && (bearsArray[i].x > this.x) && (bearsArray[i].x + bearsArray[i].width < this.x + this.width)) {
				  this.state = 4;
				  this.bear = bearsArray[i];
				  this.bear.state = 2;
				  break;
			  }
		}

		if (this.y < 0) {
			this.state = 1;
		} else {
			this.y -= speed;
		}
	}

	playUpWithBearAnimation() {
		if (this.y < 0) {
			this.state = 5;
		} else {
			this.y -= speed;
		}
	}

	playLeftAnimation() {
		if (this.x > machine.width / 3 + this.width / 2) {
			this.x -= speed;
		} else {
			this.state = 1;
			this.bear.state = 3;
			this.bear = null;
		}
	}
}