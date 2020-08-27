const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d', {alpha: false});
const scoreSpan = document.getElementById('score');

const bearsMax = 5;

let score = 0;
let frame = 0;

let background = new Image();
background.src = 'img/background.png';

let machineSprite = new Image();
machineSprite.src = 'img/machine.png';

let clawSprite = new Image();
clawSprite.src = 'img/claw.png';

let bearSprite = new Image();
bearSprite.src = 'img/bear.png';


let keys = [];

// key events
document.body.addEventListener("keydown", function (e) {
    keys[e.keyCode] = true;
});
document.body.addEventListener("keyup", function (e) {
    keys[e.keyCode] = false;
});