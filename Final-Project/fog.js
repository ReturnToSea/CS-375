import * as THREE from 'three';

export function createFog(scene, color = 0x091f61, density = 0.07) {
    scene.fog = new THREE.FogExp2(color, density);
}
