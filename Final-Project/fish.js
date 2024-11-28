import * as THREE from 'three';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.161.0/examples/jsm/loaders/GLTFLoader.js';

export class Fish {
  constructor(scene) {
    this.scene = scene;
    this.loader = new GLTFLoader();
    this.fish = null;
    this.mixer = null;

    this.direction = new THREE.Vector3(1, 0, 0); //facing right
    this.speed = 0.005; //swimming speed
    this.rotationSpeed = 0.005; //rotation speed

    this.targetRotation = Math.PI / 2; //facing right

    this.loadModel();
    this.changeDirection();
    this.setupRandomDirectionChange();
  }

  loadModel() {
    this.loader.load('Models/tuna_fish.glb', (gltf) => {
      this.fish = gltf.scene;
      this.scene.add(this.fish);

      //initial rotation
      this.fish.rotation.y = Math.PI / 2;

      //scale and position
      this.fish.scale.set(0.5, 0.5, 0.5);
      this.fish.position.set(0, 0, 0);

      //play animation
      if (gltf.animations.length > 0) {
        this.mixer = new THREE.AnimationMixer(this.fish);
        gltf.animations.forEach((clip) => {
          this.mixer.clipAction(clip).play();
        });
      }
    });
  }

  //change direction
  changeDirection() {
    this.targetRotation = Math.random() * Math.PI * 2;
  }

  //update the fish rotation 
  rotateFish() {
    let angleDiff = this.targetRotation - this.fish.rotation.y;

    //normalize angle difference
    if (angleDiff > Math.PI) angleDiff -= Math.PI * 2;
    if (angleDiff < -Math.PI) angleDiff += Math.PI * 2;

    //rotate the fish
    this.fish.rotation.y += Math.sign(angleDiff) * this.rotationSpeed;
  }

  //move the fish
  moveFish() {
    if (this.fish) {
      this.fish.position.x += Math.sin(this.fish.rotation.y) * this.speed;
      this.fish.position.z += Math.cos(this.fish.rotation.y) * this.speed;

      //boundaries
      //TODO: fix boundaries
      const w = window.innerWidth;
      const h = window.innerHeight;

      // Assuming the camera's z position is at 5
      const cameraZ = 5;

      const minBoundX = -w / 2;
      const maxBoundX = w / 2;
      const minBoundZ = -h / 2;
      const maxBoundZ = h / 2;

      if (this.fish.position.x > maxBoundX) this.fish.position.x = maxBoundX;
      if (this.fish.position.x < minBoundX) this.fish.position.x = minBoundX;
      if (this.fish.position.z > maxBoundZ) this.fish.position.z = maxBoundZ;
      if (this.fish.position.z < minBoundZ) this.fish.position.z = minBoundZ;
    }
  }

  //random direction change 5 seconds
  setupRandomDirectionChange() {
    setInterval(() => {
      this.changeDirection();
    }, 5000);
  }

  update() {
    //update animation
    if (this.mixer) {
      this.mixer.update(0.01);
    }

    this.rotateFish();
    this.moveFish();
  }
}
