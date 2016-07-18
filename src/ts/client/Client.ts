import Game from "./Game";
import Ping from "./net/Ping";
import Ship from "./Ship";
import * as keys from "./keys";
declare var io: SocketIOClientStatic;



export default class Client {


	protected game: Game;
	protected ping: Ping;
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


	protected runRenderingLoop() {
		requestAnimationFrame(this.runRenderingLoop.bind(this));
		this.game.render(this.renderer, this.ship, this.viewportAspectRatio);
	}


	protected handleKey(evt: KeyboardEvent) {
		const keyDown = ("keydown" === evt.type);
		switch (evt.keyCode) {
			case keys.UP:
				this.ship.isEngineOn = keyDown;
				break;
			case keys.LEFT:
				this.ship.isRotatingLeft = keyDown;
				break;
			case keys.RIGHT:
				this.ship.isRotatingRight = keyDown;
				break;
			case keys.CTRL:
				this.ship.isRocketFireOn = keyDown;
				break;
			default:
				// console.log(evt.keyCode);
		}
	}


	public constructor() {
		this.game = new Game();
		this.ship = this.game.createShip();
		this.socket = io({
			transports: ["websocket"],
			autoConnect: false,
		});
		this.ping = new Ping(this.socket);
		this.renderer = new THREE.WebGLRenderer();

		this.handleViewportResize();
		setInterval(this.handleViewportResize.bind(this), 1000);
		document.body.appendChild(this.renderer.domElement);
		document.addEventListener("keydown", this.handleKey.bind(this), false);
		document.addEventListener("keyup", this.handleKey.bind(this), false);
	}


	protected startGame(time, serverTicks) {
		this.game.run(time, serverTicks);
		this.runRenderingLoop();
	}


	public run(): void {
		this.socket.on("connect", () => {
			this.ping.pingPong((pongTime: number, latency: number, serverTicks: number) => {
				if (null !== pongTime) {
					this.startGame(pongTime - latency / 2, serverTicks);
				} else {
					// sync error
				}
			});
		});

		this.socket.connect();
	}

}
