import Vector from "./Vector";
import Game from "./Game";



export default class Object {


	protected game: Game;

	public mass: number;
	public dragCoefficient: number;

	public position: Vector;
	public velocity: Vector;
	public rotation: number;
	public angularSpeed: number;


	protected getDragForce(): Vector {
		const enviromentViscosity = this.game.getEnviromentViscosity(this.position);
		return this.velocity.clone().scale(-enviromentViscosity * this.dragCoefficient);
	}


	protected getEnginesForce(): Vector {
		return new Vector(0, 0);
	}


	protected getRotationForce(): number {
		return 0;
	}


	public constructor(game: Game) {
		this.game = game;

		this.position = new Vector();
		this.velocity = new Vector();
		this.rotation = 0;
		this.angularSpeed = 0;
	}


	protected tickMovement() {
		const acceleration = (new Vector())
			.add(this.getDragForce())
			.add(this.getEnginesForce())
			.scale(1 / this.mass);

		this.velocity.add(acceleration);
		this.position.add(this.velocity);
	}


	protected tickRotation() {
		const angularAcceleration = this.getRotationForce() / this.mass;
		this.angularSpeed += angularAcceleration;
		this.rotation += this.angularSpeed;
	}


	public tick(): void {
		this.tickMovement();
		this.tickRotation();
	}

}
