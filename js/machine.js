class Machine {
  constructor() {
    this.width = 660;
    this.height = 540;
    this.widthWin = 624;
    this.x = canvas.width / 2 - this.width / 2;
    this.xWin = canvas.width / 2 - this.widthWin / 2;
    this.y = 0;
    this.claw = new Claw();
    this.bears = [];
    this.bearsAnimation = [];
    this.bearsMax = 5;
  }

  draw() {
    this.claw.draw();
    this.bears.map((bear) => bear.draw());
    this.bearsAnimation.map((bear) => bear.draw());
    ctx.drawImage(
      machineSprite,
      0,
      0,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }

  update() {
    this.handleBears();
    this.claw.update();
    this.bears.map((bear) => bear.update());
    this.bearsAnimation.map((bear) => bear.update());
  }

  //Gère le nombre d'ours dans la machine
  handleBears() {
    //Ajoute un ours si le nombre max n'est pas atteint
    if (this.bears.length < this.bearsMax) {
      this.bears.push(new Bear());
    }

    //Supprime les ours qui sont arrivés dans le trou de la machine
    this.bears.forEach((bear) => {
      bear.released ? this.bears.splice(this.bears.indexOf(bear), 1) : "";
    });
    this.bearsAnimation.forEach((bear) => {
      bear.released
        ? this.bearsAnimation.splice(this.bearsAnimation.indexOf(bear), 1)
        : "";
    });
  }

  // Fait pleuvoir des ours dans la machine
  playRainBearsAnimation() {
    if (this.bearsAnimation.length < 50) {
      if (frame % 3 == 0) {
        let bear = new Bear();
        let min = this.xWin;
        let max = this.xWin + this.widthWin - bear.width;
        bear.x = generateRandomNumber(min, max);
        bear.y = 0;
        bear.speed = Math.random() * 3 + 1;
        bear.catchable = false;
        bear.state = new FallState(bear);

        this.bearsAnimation.push(bear);
      }
    }
  }

  //Fait spawner plein d'ours mais non attrapable
  playJumpingBearsAnimation() {
    if (this.bearsAnimation.length < 50) {
      if (frame % 8 == 0) {
        let bear = new Bear();
        bear.catchable = false;
        bear.state = new JumpState(bear);

        this.bearsAnimation.push(bear);
      }
    }
  }
}
