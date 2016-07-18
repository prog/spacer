import Rocket from "./Rocket";
import Ship from "./Ship";
import Vector from "./Vector";



export default class Game {


	protected tickInterval = 1000 / 25; // [ms]

	protected refTickNumber: number = null;
	protected refTickTime: number = null;
	protected tickNumber: number = 0;

	protected ships: Ship[] = [];
	protected rockets: Rocket[] = [];


	public getTicksTime(): number {
		const now = (new Date()).getTime();
		const elapsed = (now - this.refTickTime);
		return this.refTickNumber + (elapsed / this.tickInterval);
	}


	/** Return enviroment viscosity by position. */
	public getEnviromentViscosity(position: Vector): number {
		return 1;
	}


	public createShip(): Ship {
		const ship = new Ship(this);
		this.ships.push(ship);
		return ship;
	}


	public removeShip(ship: Ship) {
		this.ships.splice(this.ships.indexOf(ship), 1);
	}


	public createRocket(): Rocket {
		const shot = new Rocket(this);
		this.rockets.push(shot);
		return shot;
	}


	public removeRocket(rocket: Rocket) {
		this.rockets.splice(this.rockets.indexOf(rocket), 1);
	}


	protected tick(): void {
		this.ships.forEach((ship: Ship) => ship.tick());
		this.rockets.forEach((rocket: Rocket) => rocket.tick());
	}


	protected runTicks(): void {
		const now = (new Date()).getTime();
		const elapsedTime = now - this.refTickTime;
		const elapsedTicks = (elapsedTime / this.tickInterval);
		const tickNumber = Math.floor(this.refTickNumber + elapsedTicks);
		const nextTickNumber = (tickNumber + 1);
		const nextTickTime = (nextTickNumber - this.refTickNumber) * this.tickInterval + this.refTickTime;
		const nextTickTimeout = (nextTickTime - now);

		while (tickNumber > this.tickNumber) {
			this.tickNumber++;
			this.tick();
		}

		setTimeout(this.runTicks.bind(this), nextTickTimeout);
	};

}
