class Claw {
  constructor() {
    this.width = 120;
    this.height = 249;
    this.x = canvas.width / 2 - this.width / 2;
    this.y = 0;
    this.state = new DefaultClawState(this);
    this.bear = null; //L'ours attrapé
    this.velX = 0;
    this.speed = 5;
    this.friction = 0.92;
  }

  update() {
    this.state.handleBehavior();
  }

  draw() {
    ctx.drawImage(
      clawSprite,
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

  catchBear() {
    for (let i = 0; i < machine.bears.length; i++) {
      //On vérifie si un ours se trouve dans la pince
      if (
        machine.bears[i].catchable &&
        machine.bears[i].x > this.x &&
        machine.bears[i].x + machine.bears[i].width < this.x + this.width
      ) {
        score++;
        this.bear = machine.bears[i];
        this.bear.state = new CaughtState(this.bear);
        break;
      }
    }
  }
}

//Pattern State
class ClawState {
  constructor(claw) {
    this.claw = claw;
  }
}

class DefaultClawState extends ClawState {
  handleBehavior() {
    if (keys[39]) {
      if (this.claw.velX < this.claw.speed) {
        this.claw.velX++;
      }
    }
    if (keys[37]) {
      if (this.claw.velX > -this.claw.speed) {
        this.claw.velX--;
      }
    }
    if (keys[32]) {
      //Si le joueur appuie sur la barre espace
      //On passe à l'état dans lequel la pince descend
      this.claw.state = new GoDownState(this.claw); 
    }

    // Permet à la pince de bouger de manière fluide
    // et de continuer à bouger un peu lorsqu'une flèche directionnelle est relachée
    this.claw.velX *= this.claw.friction;
    this.claw.x += this.claw.velX;

    // Vérification des bords de la machine
    if (this.claw.x + this.claw.width >= machine.xWin + machine.widthWin) {
      this.claw.x = machine.xWin + machine.widthWin - this.claw.width;
    } else if (this.claw.x <= machine.xWin) {
      this.claw.x = machine.xWin;
    }
  }
}

class GoDownState extends ClawState {
  handleBehavior() {
    //Réinitialisation de la velocité sinon la pince bouge lorsqu'elle a fini de remonter
    this.claw.velX = 0;
    if (this.claw.y > machine.height / 6) {
      //On passe à l'état dans lequel la pince monte
      this.claw.state = new GoUpState(this.claw); 
      this.claw.catchBear();
    } else {
      this.claw.y += this.claw.speed;
    }
  }
}

class GoUpState extends ClawState {
  handleBehavior() {
    if (this.claw.y < 0) {
      //Si un ours est attrapé, la pince se dirige à gauche sinon elle reprend son comportement par défaut
      this.claw.state = this.claw.bear
        ? new GoLeftState(this.claw)
        : new DefaultClawState(this.claw);
    } else {
      this.claw.y -= this.claw.speed;
    }
  }
}

class GoLeftState extends ClawState {
  handleBehavior() {
    if (this.claw.x > machine.width / 3 + this.claw.width / 2) {
      this.claw.x -= this.claw.speed;
    } else {
      this.claw.state = new DefaultClawState(this.claw);
      this.claw.bear.state = new FallState(this.claw.bear);
      this.claw.bear = null;
    }
  }
}
