class Claw {
	constructor() {
		this.width = 120;
		this.height = 249;
		this.x = (canvas.width / 2) - (this.width / 2);
		this.y = 0;
		this.sprite = 'img/claw.png';
	}
	update() {
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
	draw() {
		let img = new Image();
		img.src = this.sprite;
		ctx.drawImage(img, 0, 0, this.width, this.height, this.x, this.y, this.width, this.height);
	}
}