import Game from "./Game";
import Ship from "./Ship";
declare var io: SocketIOClientStatic;



export default class Client {

	protected KEY_UP = 38;
	protected KEY_DOWN = 40;
	protected KEY_LEFT = 37;
	protected KEY_RIGHT = 39;


	protected game: Game;
	protected socket: SocketIOClient.Socket;
	protected renderer: THREE.Renderer;
	protected viewportAspectRatio;

	protected ship: Ship;


	protected handleViewportResize() {
		const width = window.innerWidth;
		const height = window.innerHeight;
		const q = 1;

		this.renderer.setSize(width * q, height * q);
		this.viewportAspectRatio = height > 0 ? width / height : 1;
	}



	protected handleSocketConnected() {

	}


	protected handleSocketDisconnected() {

	}


	protected connect() {
		this.socket.connect();
	}


	protected disconnect() {

	}


	protected runRenderingLoop() {
		requestAnimationFrame(this.runRenderingLoop.bind(this));
		this.game.render(this.renderer, this.ship, this.viewportAspectRatio);
	}


	protected stopRenderingLoop() {
		// todo
	}


	protected runGameLoop() {
		setInterval(() => {
			this.game.tick();
		}, 1000/25);
	}


	protected stopGameLoop() {
		//
	}


	protected handleKey(evt: KeyboardEvent) {
		const keyDown = ("keydown" === evt.type);
		switch (evt.keyCode) {
			case this.KEY_UP:
				this.ship.isEngineOn = keyDown;
				break;
			case this.KEY_LEFT:
				this.ship.isRotatingLeft = keyDown;
				break;
			case this.KEY_RIGHT:
				this.ship.isRotatingRight = keyDown;
				break;
		}
	}


	public constructor() {
		this.game = new Game();
		this.ship = this.game.createShip();
		/*
		this.socket = io({
			transports: ["websocket"],
			autoConnect: false,
		});
		this.socket.on("connect", this.handleSocketConnected.bind(this));
		this.socket.on("disconnect", this.handleSocketDisconnected.bind(this));
		*/
		this.renderer = new THREE.WebGLRenderer();

		this.handleViewportResize();
		setInterval(this.handleViewportResize.bind(this), 1000);
		document.body.appendChild(this.renderer.domElement);
		document.addEventListener("keydown", this.handleKey.bind(this), false);
		document.addEventListener("keyup", this.handleKey.bind(this), false);
	}


	public run(): void {
		//this.socket.connect();
		// this.socket.emit("join", {name: "Jon Doe"});
		this.runRenderingLoop();
		this.runGameLoop();
	}

}
