const canvas = document.getElementById('starfield');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.z = 5;

const starLayers = [];
const numLayers = 3;
const starCounts = [500, 1000, 1500];
const starSpeeds = [0.001, 0.002, 0.004];
const starSizes = [1.5, 1.2, 1.0];

const vertexShader = `
  varying float brightness;
  void main() {
    brightness = 0.6 + 0.4 * sin(position.x + position.y + position.z + time);
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = size * (300.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const fragmentShader = `
  varying float brightness;
  void main() {
    float dist = length(gl_PointCoord - vec2(0.5));
    float alpha = 1.0 - smoothstep(0.4, 0.5, dist);
    gl_FragColor = vec4(vec3(brightness), alpha);
  }
`;

function createStarLayer(count, speed, size) {
  const geometry = new THREE.BufferGeometry();
  const positions = [];
  for (let i = 0; i < count; i++) {
    positions.push(
      (Math.random() - 0.5) * 200,
      (Math.random() - 0.5) * 200,
      -Math.random() * 500
    );
  }
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));

  const material = new THREE.PointsMaterial({
    color: 0xffffff,
    size: size,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });

  const stars = new THREE.Points(geometry, material);
  scene.add(stars);
  starLayers.push({ mesh: stars, speed });
}

for (let i = 0; i < numLayers; i++) {
  createStarLayer(starCounts[i], starSpeeds[i], starSizes[i]);
}

let mouseX = 0, mouseY = 0;
document.addEventListener('mousemove', e => {
  mouseX = (e.clientX / window.innerWidth) - 0.5;
  mouseY = (e.clientY / window.innerHeight) - 0.5;
});

let scrollY = 0;
document.addEventListener('scroll', () => {
  scrollY = window.scrollY;
});

function animate() {
  requestAnimationFrame(animate);
  starLayers.forEach((layer, index) => {
    layer.mesh.rotation.x += layer.speed * 0.1;
    layer.mesh.rotation.y += layer.speed * 0.1;

    // Parallax with mouse
    layer.mesh.position.x = mouseX * (index + 1) * 5;
    layer.mesh.position.y = -mouseY * (index + 1) * 5;

    // Scroll warp effect
    layer.mesh.position.z = (scrollY * 0.05) * (index + 1);
  });

  renderer.render(scene, camera);
}
animate();

// 🌟 Lens flare hover
const flareTarget = document.getElementById('flare-target');
let flareLight;
flareTarget.addEventListener('mouseenter', () => {
  flareLight = new THREE.PointLight(0xffeeaa, 2, 50);
  flareLight.position.set(0, 0, 2);
  scene.add(flareLight);
});
flareTarget.addEventListener('mouseleave', () => {
  if (flareLight) {
    scene.remove(flareLight);
    flareLight = null;
  }
});

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
