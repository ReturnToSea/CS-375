import * as THREE from 'three';
import { Fish } from './fish.js'; // Assuming you already have the fish class
import { Ocean } from './ocean.js'; // Import the ocean class

const w = window.innerWidth;
const h = window.innerHeight;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(w, h);
document.body.appendChild(renderer.domElement);

const fov = 75;
const aspect = w / h;
const near = 0.1;
const far = 20;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 15;

const scene = new THREE.Scene();

// Create gradient texture for the background
const gradientTexture = new THREE.CanvasTexture(createGradient());

// Set the background texture to the gradient
scene.background = gradientTexture;

// Add ocean to the scene
const ocean = new Ocean(scene);

// Add fish to the scene
const fish = new Fish(scene);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 5, 5).normalize();
scene.add(directionalLight);

// Animation loop
function animate() {
  requestAnimationFrame(animate);

  fish.update();  // Update fish position and rotation
  ocean.update(); // Update ocean (if you add animations or wave effects)

  renderer.render(scene, camera);
}

animate();

// Function to create a gradient canvas texture
function createGradient() {
  const canvas = document.createElement('canvas');
  canvas.width = window.innerWidth; // Full screen width
  canvas.height = window.innerHeight; // Full screen height

  const ctx = canvas.getContext('2d');

  // Create a vertical gradient from top (light) to bottom (dark)
  const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);

  // Start with a lighter blue at the top and transition to darker blue at the bottom
  gradient.addColorStop(0, '#00BFFF');
  gradient.addColorStop(0.3, '#2e58b0');
  gradient.addColorStop(0.5, '#17377a');
  gradient.addColorStop(0.7, '#092154');  // Steel blue (darker)
  gradient.addColorStop(1, '#00050f');  // Dark ocean blue at the bottom

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);  // Apply the gradient to the whole canvas

  return canvas;
}
