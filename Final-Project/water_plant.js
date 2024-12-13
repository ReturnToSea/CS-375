import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.161.0/build/three.module.js';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.161.0/examples/jsm/loaders/GLTFLoader.js';
import { clone } from 'https://cdn.jsdelivr.net/npm/three@0.161.0/examples/jsm/utils/SkeletonUtils.js'; // Correct path from the CDN

export class WaterPlant {
    constructor(scene) {
        this.scene = scene;
        this.loader = new GLTFLoader();
        this.waterPlantOriginal = null;
        this.mixer = null; 
        this.clonesMixers = [];

        this.loadModel();
    }

    loadModel() {
        this.loader.load('Models/water_plant.glb', (gltf) => {
        this.waterPlantOriginal = gltf.scene;

        this.waterPlantOriginal.position.set(12, -7, 5);
        this.waterPlantOriginal.scale.set(0.07, 0.17, 0.07);

        //this.scene.add(this.waterPlantOriginal);

        this.waterPlantOriginal.traverse((child) => {
            if (child.isMesh) {
            child.material.color.set(0x125409);
            }
        });

        if (gltf.animations && gltf.animations.length > 0) {
            this.mixer = new THREE.AnimationMixer(this.waterPlantOriginal);
            gltf.animations.forEach((clip) => {
            const action = this.mixer.clipAction(clip);
            action.reset();
            action.play();
            });
        }

        this.addDuplicates(gltf.animations);
        });
    }

    addDuplicates(animations) {
        const clones = 50;
        
        const positiveXRange = 8;
        const negativeXRange = 7;
        const positiveZRange = 3;
        const negativeZRange = 7.5;
    
        for (let i = 0; i < clones; i++) {
        const clonePlant = clone(this.waterPlantOriginal);
    
        const xOffset = (Math.random() * (positiveXRange + negativeXRange)) - negativeXRange;
        const zOffset = (Math.random() * (positiveZRange + negativeZRange)) - negativeZRange;
        const yOffset = (Math.random() * 0.1) - 0.1;
    
        clonePlant.position.set(
            this.waterPlantOriginal.position.x + xOffset,
            this.waterPlantOriginal.position.y,
            this.waterPlantOriginal.position.z + zOffset
        );
    
        clonePlant.scale.set(
            this.waterPlantOriginal.scale.x,
            this.waterPlantOriginal.scale.y + yOffset,
            this.waterPlantOriginal.scale.z
        );
    
        const cloneMixer = new THREE.AnimationMixer(clonePlant);
        animations.forEach((clip) => {
            const action = cloneMixer.clipAction(clip);
            action.reset();
            action.play();
        });
    
        this.clonesMixers.push(cloneMixer);
    
        this.scene.add(clonePlant);
        }
    }
    
    

    update(deltaTime) {
        if (this.mixer) {
        this.mixer.update(deltaTime);
        }

        this.clonesMixers.forEach((cloneMixer) => {
        cloneMixer.update(deltaTime);
        });
    }
}
