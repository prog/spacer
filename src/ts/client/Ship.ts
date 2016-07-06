import BaseShip from "./../common/Ship";
import Game from "./Game";
import * as assets from "./assets";
import * as constants from "./../common/constants";
import Vector from "../common/Vector";



export default class Ship extends BaseShip {


	public object: THREE.Object3D;


	public constructor(game: Game) {
		super(game);
		this.object = new THREE.Mesh(assets.planeGeometry, assets.shipMaterial);
		this.object.scale.set(10, 10, 1);
	}


	public tick(): void {
		super.tick();
		if (this.isEngineOn) {
			const a = this.velocity.clone();
			const b = this.velocity.clone().rotate90L().setSize(0.5);
			const c = Vector.fromAngle(this.rotation, 1);
			for (let x=0; x<2; x++) {
				const particle = this.game.createSmokeParticle();
				particle.position = this.position.clone();
				particle.position.add(c.clone().scale(-6));
				particle.position.add(c.clone().rotate90L().scale(0.8 * (x-0.5)*2));
				particle.position.add(a.clone().scale(-Math.random()));
				particle.position.add(b.clone().scale(Math.random() - 0.5));
				particle.velocity = this.velocity.clone();
				particle.rotation = this.rotation;
			}
		}
	}


	public beforeRender(): void {
		const maxSpeed = this.getMaxSpeed();
		const maxSpeedHalf = maxSpeed / 2;
		const scratchSize = 2;
		const probability = (this.velocity.getSize() - maxSpeedHalf) / maxSpeedHalf;

		let scratchX = 0;
		let scratchY = 0;

		if (Math.random() < probability) {
			scratchX = Math.random() * scratchSize - scratchSize/2;
			scratchY = Math.random() * scratchSize - scratchSize/2;
		}

		this.object.position.set(this.position.x + scratchX, this.position.y + scratchY, 0.0);
		this.object.rotation.z = this.rotation - constants.PIHALF;
	}

}
