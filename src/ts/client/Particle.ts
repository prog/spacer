import Object from "./../common/Object";
import Game from "./Game";



export default class Particle extends Object {


	protected game: Game;
	protected timeToLive: number;
	protected liveTime: number;

	public object: THREE.Object3D;


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

	public beforeRender(): void { }

}
