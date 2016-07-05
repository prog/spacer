import Rocket from "./Rocket";
import Ship from "./Ship";
import Vector from "./Vector";



export default class Game {


	public ships: Ship[] = [];
	public rockets: Rocket[] = [];


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


	public tick(): void {
		this.ships.forEach((ship: Ship) => ship.tick());
		this.rockets.forEach((rocket: Rocket) => rocket.tick());
	}

}
