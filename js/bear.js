class Bear {

	constructor() {
		this.width = 72;
		this.height = 72;
		this.x = this.generatePositionX();
		this.y = machine.height / 2 + this.height;
        this.sprite = 'img/bear.png';

        //Etat de l'ours, 1: spawn, 2: attrapé, 3: relaché
        this.state = 1;

        //La hauteur à laquelle l'ours va spawner (générer aléatoiremenr)
        this.spawnHeight = this.generateSpawnHeight();
    }
    
	update() {
        //Etat 1: L'ours spawn
        if (this.state == 1) {
            this.playSpawnAnimation();
        }

        //Etat 2: L'ours est attrapé, il se déplace en fonction de la pince
        if (this.state == 2) {
            this.x = claw.x + claw.width / 2 - this.width / 2;
            this.y = claw.y + claw.height - this.height / 2;
        }

        //Etat 3: Relaché
        if (this.state == 3) {
            if (this.y < machine.height) {
                this.y++;
            }
            else {
                this.state = 0;
            }
        }
    }
    
	draw() {
		let img = new Image();
		img.src = this.sprite;
		ctx.drawImage(img, 0, 0, this.width, this.height, this.x, this.y, this.width, this.height);
    }
    
    generatePositionX() {
        let min = machine.xWin + machine.widthWin / 2 - this.width;
        let max = machine.xWin + machine.widthWin - this.width;
        return generateRandomNumber(min, max);
    }

    generateSpawnHeight() {
        let min = machine.height / 2 + this.height / 2;
        let max = machine.height / 2 + this.height / 8;
        return generateRandomNumber(min, max);
    }
    
    playSpawnAnimation() {
        if (this.y > this.spawnHeight) {
            this.y--;
        } else {
            this.state = 1;
        }
    }
}


