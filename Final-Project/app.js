import * as THREE from 'three';
import { Fish } from './fish.js';
import { Ocean } from './ocean.js';

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

const gradientTexture = new THREE.CanvasTexture(createGradient());

scene.background = gradientTexture;

const ocean = new Ocean(scene);
const fish = new Fish(scene);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 5, 5).normalize();
scene.add(directionalLight);

function animate() {
  requestAnimationFrame(animate);

  fish.update();
  ocean.update(); //update ocean (add effects)

  renderer.render(scene, camera);
}

animate();


function createGradient() {
  const canvas = document.createElement('canvas');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const ctx = canvas.getContext('2d');

  //create gradient
  const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);

  gradient.addColorStop(0, '#00BFFF');
  gradient.addColorStop(0.3, '#2e58b0');
  gradient.addColorStop(0.5, '#17377a');
  gradient.addColorStop(0.7, '#092154');
  gradient.addColorStop(1, '#00050f');

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  return canvas;
}
