import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.161.0/build/three.module.js';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.161.0/examples/jsm/loaders/GLTFLoader.js';
import { clone } from 'https://cdn.jsdelivr.net/npm/three@0.161.0/examples/jsm/utils/SkeletonUtils.js'; // Correct path from the CDN

export class WaterPlant {
  constructor(scene) {
    this.scene = scene;
    this.loader = new GLTFLoader();
    this.waterPlantOriginal = null;
    this.mixer = null; 
    this.clonesMixers = []; // Array to hold mixers for the clones

    this.loadModel();
  }

  loadModel() {
    this.loader.load('Models/water_plant.glb', (gltf) => {
      this.waterPlantOriginal = gltf.scene;

      this.waterPlantOriginal.position.set(12, -7, 5);
      this.waterPlantOriginal.scale.set(0.07, 0.15, 0.07);

      //this.scene.add(this.waterPlantOriginal);

      this.waterPlantOriginal.traverse((child) => {
        if (child.isMesh) {
          child.material.color.set(0x125409); // Dark green color
        }
      });

      // If the model has animations, create a mixer for the original model
      if (gltf.animations && gltf.animations.length > 0) {
        this.mixer = new THREE.AnimationMixer(this.waterPlantOriginal);
        gltf.animations.forEach((clip) => {
          const action = this.mixer.clipAction(clip);
          action.reset();
          action.play();
        });
      }

      // Add clones to the scene and set up animation mixers for each clone
      this.addDuplicates(gltf.animations);
    });
  }

  addDuplicates(animations) {
    const clones = 50; // Number of clones
    
    // Variables to control the spawn range for positive and negative directions
    const positiveXRange = 8; // Positive range for x-axis
    const negativeXRange = 7; // Negative range for x-axis
    const positiveZRange = 3; // Positive range for z-axis
    const negativeZRange = 7.5; // Negative range for z-axis
  
    for (let i = 0; i < clones; i++) {
      const clonePlant = clone(this.waterPlantOriginal);
  
      // Generate random offsets for x and z positions within the specified ranges
      const xOffset = (Math.random() * (positiveXRange + negativeXRange)) - negativeXRange; // Random value between -negativeXRange and positiveXRange
      const zOffset = (Math.random() * (positiveZRange + negativeZRange)) - negativeZRange; // Random value between -negativeZRange and positiveZRange
  
      // Apply the random offsets to the clone position
      clonePlant.position.set(
        this.waterPlantOriginal.position.x + xOffset,
        this.waterPlantOriginal.position.y,
        this.waterPlantOriginal.position.z + zOffset
      );
  
      clonePlant.scale.set(
        this.waterPlantOriginal.scale.x,
        this.waterPlantOriginal.scale.y,
        this.waterPlantOriginal.scale.z
      );
  
      // Create a new mixer for each clone and add animations to it
      const cloneMixer = new THREE.AnimationMixer(clonePlant);
      animations.forEach((clip) => {
        const action = cloneMixer.clipAction(clip);
        action.reset();
        action.play();
      });
  
      // Store the mixer for each clone
      this.clonesMixers.push(cloneMixer);
  
      this.scene.add(clonePlant);
    }
  }
  
  

  update(deltaTime) {
    // Update the mixer for the original model
    if (this.mixer) {
      this.mixer.update(deltaTime);
    }

    // Update the mixers for the clones
    this.clonesMixers.forEach((cloneMixer) => {
      cloneMixer.update(deltaTime);
    });
  }
}
