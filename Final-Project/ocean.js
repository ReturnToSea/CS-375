import * as THREE from 'three';

export class Ocean {
  constructor(scene) {
    this.scene = scene;

    this.textureLoader = new THREE.TextureLoader();
    this.baseColorTexture = this.textureLoader.load('Textures/Ocean/Ground062L_2K-PNG_Color.png');
    this.normalMap = this.textureLoader.load('Textures/Ocean/Ground062L_2K-PNG_NormalGL.png');
    this.roughnessMap = this.textureLoader.load('Textures/Ocean/Ground062L_2K-PNG_Roughness.png');

    this.material = new THREE.MeshStandardMaterial({
      map: this.baseColorTexture,
      normalMap: this.normalMap,
      roughnessMap: this.roughnessMap,
      roughness: 0.6,
      metalness: 0.0,
      color: new THREE.Color(0x555555)
    });

    this.geometry = new THREE.PlaneGeometry(5, 5);

    this.floor = new THREE.Mesh(this.geometry, this.material);
    this.floor.rotation.x = -Math.PI / 2;
    this.floor.position.y = -8;

    this.floor.scale.set(15, 10, 1);

    this.floor.receiveShadow = true;

    this.scene.add(this.floor);
  }

}
