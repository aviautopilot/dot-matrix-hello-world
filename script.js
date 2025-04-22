const canvas = document.getElementById("starfield");
const ctx = canvas.getContext("2d");

let stars = [];
const STAR_COUNT = 300;
let w, h;

function initCanvas() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
  stars = [];
  for (let i = 0; i < STAR_COUNT; i++) {
    stars.push({
      x: Math.random() * w,
      y: Math.random() * h,
      z: Math.random() * w,
    });
  }
}

function drawStars(mouseX = 0, mouseY = 0) {
  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = "white";
  for (let i = 0; i < STAR_COUNT; i++) {
    let star = stars[i];
    star.z -= 1;
    if (star.z <= 0) star.z = w;

    const k = 128.0 / star.z;
    const px = (star.x - w / 2) * k + w / 2 + mouseX * 0.1;
    const py = (star.y - h / 2) * k + h / 2 + mouseY * 0.1;

    if (px >= 0 && px < w && py >= 0 && py < h) {
      ctx.beginPath();
      ctx.arc(px, py, 1, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}

let mouseX = 0, mouseY = 0;
document.addEventListener("mousemove", (e) => {
  mouseX = (e.clientX - w / 2) / 10;
  mouseY = (e.clientY - h / 2) / 10;
});

function animate() {
  drawStars(mouseX, mouseY);
  requestAnimationFrame(animate);
}

window.addEventListener("resize", initCanvas);

initCanvas();
animate();
