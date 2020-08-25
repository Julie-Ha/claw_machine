const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

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