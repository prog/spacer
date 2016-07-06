import Object from "./Object";
import Game from "./Game";



export default class Particle extends Object {


	protected timeToLive: number;
	protected liveTime: number;


	public constructor(game: Game) {
		super(game);
		this.liveTime = 0;
	}


	public tick() {
		super.tick();

		this.liveTime += 1;
		if (this.liveTime > this.timeToLive) {
			this.game.removeParticle(this);
		}
	}

}
