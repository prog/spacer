import CommonSmokeParticle from "./../common/SmokeParticle";
import Game from "./Game";
import * as assets from "./assets";
import * as constants from "./../common/constants";
import Vector from "../common/Vector";



export default class SmokeParticle extends CommonSmokeParticle {


	public object: THREE.Object3D;

	protected startSize;
	protected finalSize;
	protected startOpacity;
	protected finalOpacity;
	protected material: THREE.Material;


	public constructor(game: Game) {
		super(game);
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
