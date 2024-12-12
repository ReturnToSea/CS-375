// lights.js
import * as THREE from 'three';

export function createLighting(scene) {
        
    // Ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // Directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(0, 3, 6).normalize();
    directionalLight.target.position.set(0, 0, 0);
    //could not get shadows to work :(
    directionalLight.castShadow = true;
    directionalLight.shadowDarkness = 0.5;
    //directionalLight.shadowCameraVisible = true;
    

    scene.add(directionalLight);
    return { ambientLight, directionalLight };
}
