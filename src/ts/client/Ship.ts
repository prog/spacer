import BaseShip from "./../common/Ship";
import {shipGeometry, shipMaterial} from "./assets";
import Game from "./Game";



export default class Ship extends BaseShip {


	public object: THREE.Object3D;


	public constructor(game: Game) {
		super(game);
		this.object = new THREE.Mesh(shipGeometry, shipMaterial);
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
		this.object.rotation.z = (this.orientation - 90) * 2 * Math.PI / 360;
	}

}
