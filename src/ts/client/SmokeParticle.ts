import Game from "./Game";
import Particle from "./Particle";
import Vector from "./../common/Vector";
import * as assets from "./assets";
import * as constants from "./../common/constants";



export default class SmokeParticle extends Particle {


	protected startSize;
	protected finalSize;
	protected startOpacity;
	protected finalOpacity;
	protected material: THREE.Material;


	public constructor(game: Game) {
		super(game);
		this.mass = 1;
		this.dragCoefficient = 0.1;

		this.material = assets.smokeParticleMaterial.clone();
		this.object = new THREE.Mesh(assets.planeGeometry, this.material);
		this.startSize = 4;
		this.finalSize = 40;
		this.startOpacity = 0.1;
		this.finalOpacity = 0;
		this.timeToLive = 25 * 10;

	}


	protected tickMovement() {
		const acceleration = (new Vector())
				.add(this.getDragForce())
				.add(this.getEnginesForce())
				.scale(1 / this.mass);
		this.velocity.add(acceleration);
		this.position.add(this.velocity);
	}

	public beforeRender(): void {
		this.object.position.set(this.position.x, this.position.y, -1);
		this.object.rotation.z = this.rotation - constants.PIHALF;

		const progress = (this.liveTime / this.timeToLive);
		this.material.opacity = progress * (this.finalOpacity - this.startOpacity) + this.startOpacity;
		const size = progress * (this.finalSize - this.startSize) + this.startSize;
		this.object.scale.set(size, size, 1);
	}

}
