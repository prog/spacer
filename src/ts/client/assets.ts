const textureLoader = new THREE.TextureLoader();

const planeGeometry = new THREE.PlaneGeometry(1, 1);

const shipTexture = textureLoader.load("res/images/ship1.png");
const shipMaterial = new THREE.MeshBasicMaterial({map: shipTexture, transparent: true});

const rocketTexture = textureLoader.load("res/images/rocket.png");
const rocketMaterial = new THREE.MeshBasicMaterial({map: rocketTexture, transparent: true});

const smokeParticleTexture = textureLoader.load("res/images/particle.gif");
const smokeParticleMaterial = new THREE.MeshBasicMaterial({map: smokeParticleTexture, transparent: true});



export {
	planeGeometry,
	shipMaterial,
	rocketMaterial,
	smokeParticleMaterial,
};
