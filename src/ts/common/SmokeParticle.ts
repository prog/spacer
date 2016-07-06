import Game from "./Game";
import Particle from "./Particle";



export default class SmokeParticle extends Particle {


	public constructor(game: Game) {
		super(game);

		this.mass = 1;
		this.dragCoefficient = 0.1;
	}

}
