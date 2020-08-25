const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const background = new Image();
background.src = 'img/background.png';
const lights = new Image();
lights.src = 'img/lights.png';

let velX = 0;
let speed = 1.5;
let friction = 0.92;
let keys = [];

// key events
document.body.addEventListener("keydown", function (e) {
    keys[e.keyCode] = true;
});
document.body.addEventListener("keyup", function (e) {
    keys[e.keyCode] = false;
});