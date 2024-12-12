import * as THREE from 'three';
import { createLighting } from './lights.js'; 
import { Fish } from './fish.js';
import { Ocean } from './ocean.js';
import { Coral } from './coral.js';
import { Coral2 } from './coral2.js';
import { Coral3 } from './coral3.js';
import { WaterPlant } from './water_plant.js';
import { Orca } from './orca.js'
import { Crab } from './crab.js'
import { TreasureChest } from './chest.js'
import { Anchor } from './anchor.js';
import { Rock } from './rock.js';

const w = window.innerWidth;
const h = window.innerHeight;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(w, h);
renderer.shadowMap.enabled = true;
renderer.shadowMapSoft = true;
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
const coral = new Coral(scene);
const coral2 = new Coral2(scene);
const coral3 = new Coral3(scene);
const waterPlant = new WaterPlant(scene);
const orca = new Orca(scene);
const crab = new Crab(scene);
const chest = new TreasureChest(scene);
const anchor = new Anchor(scene);
const rock = new Rock(scene);

const { ambientLight, directionalLight } = createLighting(scene);

fish.castShadow = true;
fish.receiveShadow = true;
coral.castShadow = true;
coral.receiveShadow = true;
waterPlant.castShadow = true;
waterPlant.receiveShadow = true;

let lastTime = 0;

function animate(time) {
  const deltaTime = time - lastTime;
  lastTime = time;

  const delta = deltaTime * 0.001;

  fish.update(delta);
  waterPlant.update(delta);
  orca.update(delta);
  crab.update(delta);

  renderer.render(scene, camera);

  requestAnimationFrame(animate);
}

animate(0);


function createGradient() {
  const canvas = document.createElement('canvas');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const ctx = canvas.getContext('2d');

  const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);

  gradient.addColorStop(0, '#091f61');
  gradient.addColorStop(0.3, '#010a24');
  gradient.addColorStop(0.6, '#00030a');
  gradient.addColorStop(1, '#000105');
  
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  return canvas;
}
