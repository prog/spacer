import Object from "./Object";
import Vector from "./Vector";
import Game from "./Game";
import * as constants from "./constants";



export default class Ship extends Object {


	public rotationSpeed: number;
	public enginePower: number;
	public isRocketReady: boolean = true;

	public isEngineOn: boolean = false;
	public isRotatingLeft: boolean = false;
	public isRotatingRight: boolean = false;
	public isRocketFireOn: boolean = false;


	protected getEngineForce(): Vector {
		if (this.isEngineOn) {
			return Vector.fromAngle(this.orientation, this.enginePower);
		} else {
			return new Vector(0, 0);
		}
	}


	public constructor(game: Game) {
		super(game);
		this.orientation = constants.PIHALF;
		this.mass = 20;
		this.dragCoefficient = 0.1;
		this.enginePower = 4;
		this.rotationSpeed = 15.0 * constants.DEG2RAD;
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
		const dirUnit = Vector.fromAngle(this.orientation, 1);
		const rocketPosition = this.position.clone().add(dirUnit.clone().scale(-1));
		rocketL.position = rocketPosition.clone().add(dirUnit.clone().rotate90L().scale(3));
		rocketR.position = rocketPosition.clone().add(dirUnit.clone().rotate90R().scale(3));
		rocketL.velocity = this.velocity.clone().add(dirUnit.clone().rotate90L().scale(0.5));
		rocketR.velocity = this.velocity.clone().add(dirUnit.clone().rotate90R().scale(0.5));
		rocketL.orientation = this.orientation - 2 * constants.DEG2RAD;
		rocketR.orientation = this.orientation + 2 * constants.DEG2RAD;
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

		this.tickMovement();

		// rotation:
		if (this.isRotatingLeft) {
			this.orientation += this.rotationSpeed;
			if (this.orientation > constants.PI2) {
				this.orientation -= constants.PI2;
			}
		}
		if (this.isRotatingRight) {
			this.orientation -= this.rotationSpeed;
			if (this.orientation < 0) {
				this.orientation += constants.PI2;
			}
		}

	}

}
