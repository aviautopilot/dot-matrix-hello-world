// 1. Weather Data Fetching (Using OpenWeather API)
async function fetchWeather() {
  const apiKey = 'YOUR_OPENWEATHER_API_KEY';  // Replace with your API key
  const city = 'London';  // Example: You can change city or get user location dynamically
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
  const data = await response.json();

  const weatherInfo = `
    <p>${data.name}, ${data.sys.country}</p>
    <p>${data.weather[0].description}</p>
    <p>${data.main.temp}°C</p>
  `;
  document.getElementById('weather-info').innerHTML = weatherInfo;
}

// 2. Live Clock with Animation
function updateClock() {
  const timeElement = document.getElementById('time');
  const date = new Date();
  const timeString = date.toLocaleTimeString();
  timeElement.textContent = timeString;
  timeElement.classList.add('animated-time');
  setTimeout(() => timeElement.classList.remove('animated-time'), 1000);
}

setInterval(updateClock, 1000);

// 3. Particle Effects Background
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

// 4. News Ticker (Random headlines)
const newsHeadlines = [
  "Breaking: New technology is changing the world!",
  "Global economy shows signs of recovery.",
  "Scientists discover new species in the rainforest.",
  "The future of space exploration looks bright.",
  "Health experts urge people to get vaccinated."
];

let tickerIndex = 0;

function updateTicker() {
  const tickerElement = document.getElementById('ticker');
  tickerElement.textContent = newsHeadlines[tickerIndex];
  tickerIndex = (tickerIndex + 1) % newsHeadlines.length;
}

setInterval(updateTicker, 5000);

// 5. Interactive Button Effect
const button = document.getElementById('interactive-btn');
button.addEventListener('click', () => {
  alert('You clicked the button!');
});

// Initial function calls
fetchWeather();
updateClock();
