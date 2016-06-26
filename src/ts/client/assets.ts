

export var shipTexture = new THREE.TextureLoader().load("res/images/ship1.png");
export var shipMaterial = new THREE.MeshBasicMaterial({map: shipTexture});
export var shipGeometry = new THREE.PlaneGeometry(10, 10);
export var basePlane = new THREE.PlaneGeometry(1, 1);

shipMaterial.transparent = true;
