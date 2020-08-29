class Bear {
  constructor() {
    this.width = 72;
    this.height = 72;
    this.x = this.generatePositionX();
    this.y = machine.height / 2 + this.height;

    this.state = new SpawnState(this);

    //La hauteur à laquelle l'ours va spawner (générer aléatoiremenr)
    this.spawnHeight = this.generateSpawnHeight();

    this.released = false;
    this.catchable = true;
    this.speed = 1;
  }

  update() {
    this.state.handleBehavior();
  }

  draw() {
    ctx.drawImage(
      bearSprite,
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
    this.y > this.spawnHeight
      ? (this.y -= this.speed)
      : (this.state = new DefaultBearState(this));
  }

  playJumpAnimation() {
    this.y > this.spawnHeight
      ? (this.y -= this.speed)
      : (this.state = new FallState(this));
  }

  playFallAnimation() {
    if (this.y < machine.height) {
      this.y += this.speed;
    } else {
      this.state = new DefaultBearState(this);
      this.released = true;
    }
  }
}

//Pattern State
class BearState {
  constructor(bear) {
    this.bear = bear;
  }
}

class DefaultBearState extends BearState {
  handleBehavior() {}
}

class SpawnState extends BearState {
  handleBehavior() {
    this.bear.playSpawnAnimation();
  }
}

class CaughtState extends BearState {
  handleBehavior() {
    this.bear.x = machine.claw.x + machine.claw.width / 2 - this.bear.width / 2;
    this.bear.y = machine.claw.y + machine.claw.height - this.bear.height / 2;
  }
}

class FallState extends BearState {
  handleBehavior() {
    this.bear.playFallAnimation();
  }
}

class JumpState extends BearState {
  handleBehavior() {
    this.bear.playJumpAnimation();
  }
}