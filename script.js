// 1. 3D Cube Rotation
document.addEventListener('mousemove', (e) => {
  let x = e.clientX / window.innerWidth * 360;
  let y = e.clientY / window.innerHeight * 360;
  document.getElementById("cube").style.transform = `rotateX(${y}deg) rotateY(${x}deg)`;
});

// 2. Real-Time Clock
function updateClock() {
  const clock = document.getElementById("clock");
  const date = new Date();
  clock.innerHTML = date.toLocaleTimeString();
}
setInterval(updateClock, 1000);

// 3. Particle Effect Background
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const particles = [];

function Particle(x, y) {
  this.x = x;
  this.y = y;
  this.size = Math.random() * 5 + 1;
  this.speedX = Math.random() * 3 - 1.5;
  this.speedY = Math.random() * 3 - 1.5;
}

Particle.prototype.update = function() {
  this.x += this.speedX;
  this.y += this.speedY;
  this.size -= 0.05;
};

Particle.prototype.draw = function() {
  ctx.fillStyle = "#ffffff";
  ctx.strokeStyle = "#ffffff";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
};

function createParticles(e) {
  const numberOfParticles = 5;
  for (let i = 0; i < numberOfParticles; i++) {
    particles.push(new Particle(e.x, e.y));
  }
}

canvas.addEventListener("mousemove", createParticles);

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach((particle, index) => {
    particle.update();
    particle.draw();
    if (particle.size <= 0.3) {
      particles.splice(index, 1);
    }
  });
  requestAnimationFrame(animateParticles);
}
animateParticles();

// 4. Memory Game (Simplified Version)
const cards = ["A", "B", "C", "D", "A", "B", "C", "D"];
let cardHTML = "";
cards.sort(() => Math.random() - 0.5);
cards.forEach((card, index) => {
  cardHTML += `<div class="card" data-index="${index}">${card}</div>`;
});
document.getElementById("game-board").innerHTML = cardHTML;
document.querySelectorAll(".card").forEach(card => {
  card.addEventListener("click", () => {
    card.classList.toggle("flipped");
  });
});

// 5. Drawing Board
const drawingCanvas = document.getElementById("drawing-board");
const ctxDrawing = drawingCanvas.getContext("2d");
let drawing = false;
drawingCanvas.addEventListener("mousedown", () => {
  drawing = true;
});
drawingCanvas.addEventListener("mouseup", () => {
  drawing = false;
});
drawingCanvas.addEventListener("mousemove", (e) => {
  if (drawing) {
    ctxDrawing.lineTo(e.clientX, e.clientY);
    ctxDrawing.stroke();
  }
});
ctxDrawing.lineWidth = 2;
ctxDrawing.lineCap = "round";
ctxDrawing.strokeStyle = "#ffffff";

// 6. Music Visualizer (With Web Audio API)
const audio = new Audio('your-music-file.mp3'); // Add a valid mp3 link
audio.loop = true;
audio.play();

const visualizerCanvas = document.getElementById("audio-visualizer");
const ctxVisualizer = visualizerCanvas.getContext("2d");
const analyser = new (window.AudioContext || window.webkitAudioContext)().createAnalyser();
const source = analyser.context.createMediaElementSource(audio);
source.connect(analyser);
analyser.connect(analyser.context.destination);

visualizerCanvas.width = 500;
visualizerCanvas.height = 200;

function drawVisualizer() {
  const bufferLength = analyser.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);
  analyser.getByteFrequencyData(dataArray);
  
  ctxVisualizer.fillStyle = "#000000";
  ctxVisualizer.fillRect(0, 0, visualizerCanvas.width, visualizerCanvas.height);
  const barWidth = visualizerCanvas.width / bufferLength;
  
  dataArray.forEach((value, index) => {
    const barHeight = value;
    ctxVisualizer.fillStyle = "#00ff00";
    ctxVisualizer.fillRect(index * barWidth, visualizerCanvas.height - barHeight, barWidth, barHeight);
  });

  requestAnimationFrame(drawVisualizer);
}
drawVisualizer();
