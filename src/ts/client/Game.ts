import Background from "./Background";
import BaseGame from "./../common/Game";
import Particle from "./Particle";
import Rocket from "./Rocket";
import Ship from "./Ship";
import SmokeParticle from "./SmokeParticle";
import IView from "./IVIew";



export default class Game extends BaseGame {


	protected scene: THREE.Scene;
	protected camera: THREE.OrthographicCamera;

	protected particles: Particle[] = [];
	protected background: Background;


	public constructor() {
		super();

		this.scene = new THREE.Scene();
		this.camera = new THREE.OrthographicCamera(0, 0, 0, 0, -1, 1);
		this.background = new Background();
		this.scene.add(this.background.object);
	}


	public createShip(): Ship {
		const ship = new Ship(this);
		this.ships.push(ship);
		this.scene.add(ship.object);
		return ship;
	}


	public removeShip(ship: Ship): void {
		this.scene.remove(ship.object);
		super.removeShip(ship);
	}


	public createRocket(): Rocket {
		const rocket = new Rocket(this);
		this.rockets.push(rocket);
		this.scene.add(rocket.object);
		return rocket;
	}


	public removeRocket(rocket: Rocket): void {
		this.scene.remove(rocket.object);
		super.removeRocket(rocket);
	}


	public createSmokeParticle(): SmokeParticle {
		const particle = new SmokeParticle(this);
		this.particles.push(particle);
		this.scene.add(particle.object);
		return particle;
	}


	public removeParticle(particle: Particle): void {
		this.particles.splice(this.particles.indexOf(particle), 1);
		this.scene.remove(particle.object);
	}


	protected updateCamera(view: IView): void {
		const vwh = 0.5 * view.w;
		const vhh = 0.5 * view.h;
		this.camera.position.x = view.x;
		this.camera.position.y = view.y;
		this.camera.left = -vwh;
		this.camera.right = vwh;
		this.camera.top = vhh;
		this.camera.bottom = -vhh;
		this.camera.updateProjectionMatrix();
	}


	public render(renderer: THREE.Renderer, ship: Ship, viewportAspectRatio: number): void {
		this.ships.forEach((ship: Ship) => ship.beforeRender());
		this.rockets.forEach((rocket: Rocket) => rocket.beforeRender());
		this.particles.forEach((particle: Particle) => particle.beforeRender());

		const view = ship.calculateView(viewportAspectRatio);
		this.updateCamera(view);
		this.background.beforeRender(view);
		renderer.render(this.scene, this.camera);
	}


	public tick(): void {
		super.tick();
		this.particles.forEach((particle: Particle) => particle.tick());
	}


	public run(refTime: number, serverTicks: number) {
		const now = new Date().getTime();
		const elapsedTime = now - refTime;
		const adjustedServerTicks = serverTicks + (elapsedTime / this.tickInterval);
		const tickNumber = Math.floor(adjustedServerTicks);

		this.refTickTime = refTime;
		this.refTickNumber = serverTicks;
		this.tickNumber = tickNumber;
		this.runTicks();
	}
}
