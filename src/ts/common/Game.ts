import Shot from "./Shot";
import Ship from "./Ship";
import Vector from "./Vector";



export default class Game {


	public ships: Ship[] = [];
	public shots: Shot[] = [];


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


	public tick(): void {
		this.ships.forEach((ship: Ship) => ship.tick());
		this.shots.forEach((shot: Shot) => shot.tick());
	}

}
