class Bear {
	constructor() {
		this.width = 72;
		this.height = 72;
		this.x = 0;
		this.y = 0;
		this.sprite = 'img/bear.png';
        this.spawned = false;
	}
	update() {
        if (!this.spawned) {
            this.playSpawnAnimation();
        }
	}
	draw() {
		let img = new Image();
		img.src = this.sprite;
		ctx.drawImage(img, 0, 0, this.width, this.height, this.x, this.y, this.width, this.height);
	}
    // generateRandomHeightSpawn() {
    //     min = machine.height / 2 + this.height / 6;
    //     max = machine.height / 2 + this.height / 2;
    //     return Math.floor(Math.random() * (max - min)) + min;
    // }
    playSpawnAnimation() {
        if (this.y > machine.height / 2 + this.height / 4) {
            this.y--;
        } else {
            this.spawned = true;
        }
    }
}

function generateRandomPosition(bear) {
    min = machine.xWin + machine.widthWin / 2;
    max = machine.xWin + machine.widthWin - bear.width;
    bear.x = Math.floor(Math.random() * (max - min)) + min;
    bear.y = machine.height / 2 + bear.height;
}

function handleBears() {
    let bear = new Bear();
    generateRandomPosition(bear);
    
    return bear;
}
