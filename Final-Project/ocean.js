import * as THREE from 'three';

export class Ocean {
  constructor(scene) {
    this.scene = scene;

    // Load the textures
    this.textureLoader = new THREE.TextureLoader();
    this.baseColorTexture = this.textureLoader.load('Textures/Ocean/Ground062L_2K-PNG_Color.png'); // Base color texture
    this.normalMap = this.textureLoader.load('Textures/Ocean/Ground062L_2K-PNG_NormalGL.png'); // Normal map (OpenGL)
    this.roughnessMap = this.textureLoader.load('Textures/Ocean/Ground062L_2K-PNG_Roughness.png'); // Roughness map

    // Create the material with textures
    this.material = new THREE.MeshStandardMaterial({
      map: this.baseColorTexture, // Base color texture
      normalMap: this.normalMap, // Normal map for surface details
      roughnessMap: this.roughnessMap, // Roughness map for surface interaction
      roughness: 0.6, // Default roughness value
      metalness: 0.0, // Default metalness value
      color: new THREE.Color(0x555555) // Apply a darker neutral color (gray) to the material
    });

    // Create the geometry (plane for the ocean floor)
    this.geometry = new THREE.PlaneGeometry(5, 5); // Start with a reasonable size for the plane

    // Create the mesh and apply the material
    this.floor = new THREE.Mesh(this.geometry, this.material);
    this.floor.rotation.x = -Math.PI / 2; // Rotate to make the floor flat
    this.floor.position.y = -8;  // Position the ocean floor slightly below the camera

    // Scale the ocean floor to make it bigger, but keep it proportional
    this.floor.scale.set(15, 10, 1); // Scale in the X and Y direction to make it larger

    this.scene.add(this.floor);
  }

  update() {
    // Any updates to the ocean floor can be done here if needed
  }
}
