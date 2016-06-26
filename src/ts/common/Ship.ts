import Object from "./Object";
import Vector from "./Vector";
import Game from "./Game";



export default class Ship extends Object {


	public mass: number = 20;
	public dragCoefficient = 0.1;
	public enginePower: number = 4;
	public rotationSpeed: number = 15;

	public isEngineOn: boolean = false;
	public isRotatingLeft: boolean = false;
	public isRotatingRight: boolean = false;


	public constructor(game: Game) {
		super(game);
		this.orientation = 90;
	}


	/** Return maximum ship speed at current position */
	public getMaxSpeed(): number  {
		const enviromentViscosity = this.game.getEnviromentViscosity(this.position);
		return this.enginePower / (this.dragCoefficient * enviromentViscosity);
		// return Math.sqrt(this.enginePower / (this.dragCoefficient * enviromentViscosity));
	}


	public tick(): void {
		// dragForce = -(this.velocity * this.dragCoefficient * enviromentViscosity)
		// engineForce = engineOn ? (this.enginePower * this.shipOrientation) : 0
		// force = dragForce + engineForce
		// acceleration = force / this.mass
		// velocity += acceleration
		// position += velocity

		const enviromentViscosity = this.game.getEnviromentViscosity(this.position);

		// drag force:
		const acceleration = this.velocity.clone();
		// force.multiply(this.velocity);
		acceleration.scale(-enviromentViscosity * this.dragCoefficient);

		// + engine force:
		if (this.isEngineOn) {
			acceleration.add(Vector.fromAngle(this.orientation * 2 * Math.PI / 360.0, this.enginePower));
		}

		// acceleration:
		acceleration.scale(1 / this.mass);

		// update current velocity and position:
		this.velocity.add(acceleration);
		this.position.add(this.velocity);

		// rotation:
		if (this.isRotatingLeft) {
			this.orientation += this.rotationSpeed;
			if (this.orientation > 360) {
				this.orientation -= 360;
			}
		}
		if (this.isRotatingRight) {
			this.orientation -= this.rotationSpeed;
			if (this.orientation < 0) {
				this.orientation += 360;
			}
		}
	}

}
