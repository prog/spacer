import Vector from "./Vector";
import Game from "./Game";



export default class Object {


	protected game: Game;

	public mass: number;
	public dragCoefficient;

	public position: Vector;
	public orientation: number;
	public velocity: Vector;


	protected getEngineForce(): Vector {
		return new Vector(0, 0);
	}


	public constructor(game: Game) {
		this.game = game;

		this.position = new Vector();
		this.orientation = 0;
		this.velocity = new Vector();
	}


	protected tickMovement() {
		// dragForce = -(this.velocity * this.dragCoefficient * enviromentViscosity)
		// engineForce = getEngineForce()
		// force = dragForce + engineForce
		// acceleration = force / this.mass
		// velocity += acceleration
		// position += velocity

		const enviromentViscosity = this.game.getEnviromentViscosity(this.position);
		const acceleration = this.velocity.clone()
			.scale(-enviromentViscosity * this.dragCoefficient)
			.add(this.getEngineForce())
			.scale(1 / this.mass);

		this.velocity.add(acceleration);
		this.position.add(this.velocity);
	}


	public tick(): void {
		this.tickMovement();
	}

}
