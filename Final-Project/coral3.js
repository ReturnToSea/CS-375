import * as THREE from 'three';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.161.0/examples/jsm/loaders/GLTFLoader.js';

export class Coral3 {
  constructor(scene) {
    this.scene = scene;
    this.loader = new GLTFLoader();
    this.coral = null;
    this.mixer = null;

    // //adding light in coral file cuz lazy
    // this.addLights();

    this.loadModel();
  }

//   addLights() {
//     const ambientLight = new THREE.AmbientLight(0xffffff, 1);
//     this.scene.add(ambientLight);
//   }

  loadModel() {
    this.loader.load('Models/fan_coral_med.glb', (gltf) => {
      this.coral = gltf.scene;
      this.scene.add(this.coral);

      this.coral.scale.set(50, 50, 50);
      this.coral.position.set(-3, -6, 5);

      this.coral.traverse((child) => {
        if (child.isMesh) {
          child.material = new THREE.MeshStandardMaterial({
            color: this.getRandomCustomColor(),
          });
        }
      });
    });
  }

  getRandomCustomColor() {
    const customColors = [
      0x003300, //Green
      0x4b0000, //Red
      0xffcc00, //Yellow
      0x1a1a3d, //Blue 
      0x4b0082, //Purple
    ];

    return customColors[Math.floor(Math.random() * customColors.length)];
  }
}
