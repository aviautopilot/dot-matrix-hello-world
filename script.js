const canvas = document.getElementById("space");
const ctx = canvas.getContext("2d");

let w, h;
function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

// Generate Stars
const STAR_COUNT = 500;
const stars = Array.from({ length: STAR_COUNT }, () => ({
  x: Math.random() * w,
  y: Math.random() * h,
  z: Math.random() * w,
  size: Math.random() * 1.5 + 0.5,
  opacity: Math.random(),
  speed: Math.random() * 0.5 + 0.2,
  twinkle: Math.random() < 0.5
}));

// Shooting stars
let shootingStars = [];

function spawnShootingStar() {
  if (Math.random() < 0.01) {
    shootingStars.push({
      x: Math.random() * w,
      y: Math.random() * h / 2,
      length: Math.random() * 80 + 100,
      speed: Math.random() * 10 + 6,
      opacity: 1
    });
  }
}

// Asteroids
const asteroidCount = 10;
const asteroids = Array.from({ length: asteroidCount }, () => ({
  x: Math.random() * w,
  y: Math.random() * h,
  r: Math.random() * 2 + 1,
  dx: Math.random() * 0.5 - 0.25,
  dy: Math.random() * 0.5 - 0.25
}));

function draw() {
  ctx.fillStyle = "rgba(0, 0, 10, 0.3)";
  ctx.fillRect(0, 0, w, h);

  // Stars
  stars.forEach(star => {
    star.opacity += (Math.random() - 0.5) * 0.05;
    star.opacity = Math.max(0.1, Math.min(1, star.opacity));
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, ${200 + Math.random() * 55}, ${star.opacity})`;
    ctx.fill();
  });

  // Shooting stars
  spawnShootingStar();
  shootingStars.forEach((s, i) => {
    ctx.strokeStyle = `rgba(255,255,255,${s.opacity})`;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(s.x, s.y);
    ctx.lineTo(s.x + s.length, s.y + s.length / 4);
    ctx.stroke();
    s.x += s.speed;
    s.y += s.speed / 4;
    s.opacity -= 0.01;
    if (s.opacity <= 0) shootingStars.splice(i, 1);
  });

  // Asteroids
  asteroids.forEach(ast => {
    ast.x += ast.dx;
    ast.y += ast.dy;
    if (ast.x < 0) ast.x = w;
    if (ast.y < 0) ast.y = h;
    if (ast.x > w) ast.x = 0;
    if (ast.y > h) ast.y = 0;

    ctx.beginPath();
    ctx.arc(ast.x, ast.y, ast.r, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(150,150,150,0.3)";
    ctx.fill();
  });

  requestAnimationFrame(draw);
}

draw();
