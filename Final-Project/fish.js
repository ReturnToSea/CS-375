import * as THREE from 'three';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.161.0/examples/jsm/loaders/GLTFLoader.js';

export class Fish {
    constructor(scene) {
        this.scene = scene;
        this.loader = new GLTFLoader();
        this.fish = null;
        this.mixer = null;

        this.direction = new THREE.Vector3(1, 0, 0); //facing right
        this.speed = 0.003; //swimming speed
        this.rotationSpeed = 0.003; //rotation speed

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
        this.fish.scale.set(.5, .5, .5);
        this.fish.position.set(0, 0, 10);

        if (gltf.animations.length > 0) {
            this.mixer = new THREE.AnimationMixer(this.fish);
            gltf.animations.forEach((clip) => {
            this.mixer.clipAction(clip).play();
            });
        }
        });
    }

    changeDirection() {
        this.targetRotation = Math.random() * Math.PI * 2;
    }

    rotateFish() {
        if (this.fish) {
        let angleDiff = this.targetRotation - this.fish.rotation.y;

        //normalize angle
        if (angleDiff > Math.PI) angleDiff -= Math.PI * 2;
        if (angleDiff < -Math.PI) angleDiff += Math.PI * 2;

        this.fish.rotation.y += Math.sign(angleDiff) * this.rotationSpeed;
        }
    }

    //move based on rotation
    moveFish() {
        if (this.fish) {
        this.fish.position.x += Math.sin(this.fish.rotation.y) * this.speed;
        this.fish.position.z += Math.cos(this.fish.rotation.y) * this.speed;

        const maxBoundX = 7;
        const minBoundX = -7;
        const maxBoundZ = 13;
        const minBoundZ = -4.5;
        //TODO: needs to be fixed still keeps getting stuck
        if (this.fish.position.x >= maxBoundX || this.fish.position.x <= minBoundX) {
            this.changeDirection();
        }
        if (this.fish.position.z >= maxBoundZ || this.fish.position.z <= minBoundZ) {
            this.changeDirection();
        }
        if (this.fish.position.x > maxBoundX) this.fish.position.x = maxBoundX;
        if (this.fish.position.x < minBoundX) this.fish.position.x = minBoundX;
        if (this.fish.position.z > maxBoundZ) this.fish.position.z = maxBoundZ;
        if (this.fish.position.z < minBoundZ) this.fish.position.z = minBoundZ;
        }
    }

    update(deltaTime) {
        if (this.fish) {
        if (this.mixer) {
            this.mixer.update(deltaTime);
        }

        this.rotateFish();
        this.moveFish();
        }
    }

    setupRandomDirectionChange() {
        setInterval(() => {
        this.changeDirection();
        }, 5000);
    }
}
