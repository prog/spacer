import Vector from "./Vector";
import Game from "./Game";



export default class Object {


	protected game: Game;

	public position: Vector;
	public orientation: number;
	public velocity: Vector;


	public constructor(game: Game) {
		this.game = game;

		this.position = new Vector();
		this.orientation = 0;
		this.velocity = new Vector();
	}


	public tick(): void {
		this.position.add(this.velocity);
	}

}
