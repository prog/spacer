import BaseGame from "./../common/Game";
import Ship from "./Ship";
import Rocket from "./Rocket";
import * as assets from "./assets";



export default class Game extends BaseGame {


	protected scene: THREE.Scene;
	protected camera: THREE.OrthographicCamera;

	protected backgroundTexture: THREE.Texture;
	protected background: THREE.Object3D;


	public constructor() {
		super();

		this.scene = new THREE.Scene();
		this.camera = new THREE.OrthographicCamera(0, 0, 0, 0, -1, 1);

		this.backgroundTexture = new THREE.TextureLoader().load("res/images/857-tileable-classic-nebula-space-patterns/2.jpg");
		this.backgroundTexture.wrapS = THREE.RepeatWrapping;
		this.backgroundTexture.wrapT = THREE.RepeatWrapping;
		this.background = new THREE.Mesh(assets.planeGeometry, new THREE.MeshBasicMaterial({map: this.backgroundTexture}));
		this.background.position.z = -1;

		this.scene.add(this.background);
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


	protected updateCamera(ship: Ship, viewportAspectRatio: number) {
		const containBaseWidth = 100;
		const containBaseHeight = 100;
		const maxSpeedZoomOut = 5.0;

		const speed = ship.velocity.getSize();
		const speedMax = ship.getMaxSpeed();
		const speedRatio = Math.min(1, speedMax > 0 ? speed / speedMax : 0);

		const zoom = 1 + speedRatio * (maxSpeedZoomOut - 1);
		const containWidth = containBaseWidth * zoom;
		const containHeight = containBaseHeight * zoom;
		const containAspectRatio = containWidth / containHeight;
		const maxViewOffset = Math.min(containWidth, containHeight) / 2 -10;

		const camPos = ship.position.clone();

		if (speedRatio > 0) {
			const vOffset = ship.velocity.clone();
			vOffset.scale(maxViewOffset * speedRatio / speed);
			camPos.add(vOffset);
		}

		const matchWidth = (containAspectRatio > viewportAspectRatio);
		const viewWidth = (matchWidth) ? containWidth : containWidth * viewportAspectRatio;
		const viewHeight = (matchWidth) ? containHeight / viewportAspectRatio : containHeight;
		const vwh = 0.5 * viewWidth;
		const vhh = 0.5 * viewHeight;

		this.camera.position.x = camPos.x;
		this.camera.position.y = camPos.y;
		//this.camera.rotation.z = (this.ship.getOrientation()-90) * 2 * Math.PI / 360;
		this.camera.left = -vwh;
		this.camera.right = vwh;
		this.camera.top = vhh;
		this.camera.bottom = -vhh;
		this.camera.updateProjectionMatrix();
	}


	protected updateBackground() {
		const bgSize = 300;

		const w = this.camera.right - this.camera.left;
		const h = this.camera.top - this.camera.bottom;

		this.backgroundTexture.repeat.set(w / bgSize, h / bgSize);
		this.backgroundTexture.offset.set((this.camera.position.x - w/2) / bgSize, (this.camera.position.y - h/2) / bgSize);
		this.background.position.x = this.camera.position.x;
		this.background.position.y = this.camera.position.y;
		this.background.scale.set(w, h, 1);
	}


	public render(renderer: THREE.Renderer, ship: Ship, viewportAspectRatio: number) {
		this.ships.forEach((ship: Ship) => ship.beforeRender());
		this.rockets.forEach((rocket: Rocket) => rocket.beforeRender());
		this.updateCamera(ship, viewportAspectRatio);
		this.updateBackground();
		renderer.render(this.scene, this.camera);
	}

}
