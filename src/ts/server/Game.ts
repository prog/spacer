import BaseGame from "../common/Game";



export default class Game extends BaseGame {


	public tick() {
		super.tick();

		// todo: test collisions
	}


	public run() {
		this.refTickNumber = 1;
		this.refTickTime = new Date().getTime();
		this.tickNumber = 0;
		this.runTicks();
	}

}
