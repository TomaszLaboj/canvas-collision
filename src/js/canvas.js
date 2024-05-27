import utils from "./utils";

const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2,
};

const colors = ["#2185C5", "#7ECEFD", "#FFF6E5", "#FF7F66"];
const gravity = 1;
const friction = 0.9;
// Event Listeners
addEventListener("mousemove", (event) => {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
});

addEventListener("resize", () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;

  init();
});

const getDistance = (x1, y1, x2, y2) => {
  const xDistance = x2 - x1;
  const yDistance = y2 - y1;
  return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
}
// Objects
class Circle {
  constructor(x, y, dx, dy, radius, color) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = color;
  }

  draw() {
    c.beginPath();
    c.stroke();

    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
    c.closePath();
  }

  update() {
    this.draw();
    if (this.y + this.radius + this.dy > innerHeight) {
      this.dy = -this.dy * friction;
    } else {
      this.dy += gravity;
    }

    if (
      this.x + this.radius + this.dx > innerWidth ||
      this.x - this.radius <= 0
    ) {
      this.dx = -this.dx;
    }
    this.y += this.dy;
    this.x += this.dx;
  }
}

class StaticCircle {
  constructor(x, y, radius, color) {
    this.x = x;
    this.y = y;
   
    this.radius = radius;
    this.color = color;
  }

  draw() {
    c.beginPath();
    c.stroke();

    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
    c.closePath();
  }

  update() {
    this.draw();
  }
}

// Implementation
let circle;
let circle2;
function init() {
  const radius = 30;
  circle = new StaticCircle(300,300,30, "black")
  circle2 = new StaticCircle(undefined, undefined, 30, 'red')
}
// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);
  circle.update();
  circle2.x = mouse.x;
  circle2.y = mouse.y;
  circle2.update()
  if(getDistance(circle2.x, circle2.y, circle.x, circle.y) < circle.radius + circle2.radius) {
    circle.color = 'red';
  } else {
    circle.color = 'black';
  }
  console.log()
}

init();
animate();
