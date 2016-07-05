import Object from "./Object";
import Game from "./Game";
import Vector from "./Vector";



export default class Rocket extends Object {


	protected fuel: number;
	protected timer: number;

	protected enginePower: number;


	protected getEnginesForce(): Vector {
		if (this.fuel > 0) {
			return Vector.fromAngle(this.rotation, this.enginePower);
		} else {
			return new Vector(0, 0);
		}
	}


	public constructor(game: Game) {
		super(game);

		this.fuel = 25 * 5;
		this.timer = 25 * 5;

		this.mass = 1;
		this.dragCoefficient = 0.1 / 20;
		this.enginePower = 1 / (5 - 1);
	}


	public tick() {
		this.tickMovement();
		
		if (this.fuel > 0) {
			this.fuel -= 1;
		} else if (this.timer > 0) {
			this.timer -= 1;
		} else {
			// todo: create explosion
			// this.game.createExplosion();
			this.game.removeRocket(this);
		}
	}

}
