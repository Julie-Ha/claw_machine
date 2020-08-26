class Machine {
	constructor() {
		this.width = 660;
		this.height = 540;
        this.widthWin = 624;
        this.x = (canvas.width / 2) - (this.width / 2);
        this.xWin = (canvas.width / 2) - (this.widthWin / 2);
        this.y = 0;
	}
	draw() {
		ctx.drawImage(machineSprite, 0, 0, this.width, this.height, this.x, this.y, this.width, this.height);
	}
}