class Bear {
	constructor() {
		this.width = 72;
		this.height = 72;
		this.x = 0;
		this.y = 0;
		this.sprite = 'img/bear.png';
	}
	update() {

	}
	draw() {
		let img = new Image();
		img.src = this.sprite;
		ctx.drawImage(img, 0, 0, this.width, this.height, this.x, this.y, this.width, this.height);
	}
}

