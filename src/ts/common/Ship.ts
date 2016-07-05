import Object from "./Object";
import Vector from "./Vector";
import Game from "./Game";
import * as constants from "./constants";



export default class Ship extends Object {


	public maxAngularSpeed: number;
	public rotationPower: number;
	public enginePower: number;
	public isRocketReady: boolean = true;

	public isEngineOn: boolean = false;
	public isRotatingLeft: boolean = false;
	public isRotatingRight: boolean = false;
	public isRocketFireOn: boolean = false;


	protected getEnginesForce(): Vector {
		if (this.isEngineOn) {
			return Vector.fromAngle(this.rotation, this.enginePower);
		} else {
			return new Vector(0, 0);
		}
	}


	protected getRotationForce(): number {
		if (this.isRotatingLeft && this.isRotatingRight) {
			return 0;
		} else if (this.isRotatingLeft) {
			return (this.angularSpeed < this.maxAngularSpeed) ? this.rotationPower/2 : 0;
		} else if (this.isRotatingRight) {
			return (this.angularSpeed > -this.maxAngularSpeed) ? -this.rotationPower/2 : 0;
		} else if (0 === this.angularSpeed) {
			return 0;
		} else {
			let force = this.rotationPower;
			const maxAngularAcceleration = force / this.mass;
			if (maxAngularAcceleration > Math.abs(this.angularSpeed)) {
				force = Math.abs(this.angularSpeed) * this.mass;
			}
			if (this.angularSpeed > 0) {
				return -force;
			} else if (this.angularSpeed < 0) {
				return force;
			}
		}
	}


	public constructor(game: Game) {
		super(game);
		this.rotation = constants.PIHALF;
		this.mass = 20;
		this.dragCoefficient = 0.1;
		this.enginePower = 2;
		this.rotationPower = 0.6;
		this.maxAngularSpeed = 0.2;
	}


	/** Return maximum ship speed at current position */
	public getMaxSpeed(): number  {
		const enviromentViscosity = this.game.getEnviromentViscosity(this.position);
		return this.enginePower / (this.dragCoefficient * enviromentViscosity);
		// return Math.sqrt(this.enginePower / (this.dragCoefficient * enviromentViscosity));
	}


	protected launchRocket() {
		const rocketL = this.game.createRocket();
		const rocketR = this.game.createRocket();
		const dirUnit = Vector.fromAngle(this.rotation, 1);
		const rocketPosition = this.position.clone().add(dirUnit.clone().scale(-1));
		rocketL.position = rocketPosition.clone().add(dirUnit.clone().rotate90L().scale(3));
		rocketR.position = rocketPosition.clone().add(dirUnit.clone().rotate90R().scale(3));
		rocketL.velocity = this.velocity.clone().add(dirUnit.clone().rotate90L().scale(0.5));
		rocketR.velocity = this.velocity.clone().add(dirUnit.clone().rotate90R().scale(0.5));
		rocketL.rotation = this.rotation - 2 * constants.DEG2RAD;
		rocketR.rotation = this.rotation + 2 * constants.DEG2RAD;
	}


	public tick(): void {
		// fire rocket:
		if (this.isRocketFireOn) {
			if (this.isRocketReady) {
				this.launchRocket();
				this.isRocketReady = false;
			}
		} else {
			this.isRocketReady = true;
		}

		super.tick();
	}

}
