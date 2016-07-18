import Game from "./Game";
import * as express from "express";
import * as socketIO from "socket.io";
import * as http from "http";
import * as path from "path";



export default class Server {


	public game: Game;
	public app: express.Application;
	public httpServer: http.Server;
	public io: SocketIO.Server;
	public serverPort: number;


	protected handlePing(socket: SocketIO.Socket, number: number, latency: number) {
		socket.emit("p", number, this.game.getTicksTime());
	}


	protected handleClientConnected(socket: SocketIO.Socket) {
		socket.on("p", this.handlePing.bind(this, socket));
	}


	public constructor() {
		this.game = new Game();
		this.app = express();
		this.httpServer = http.createServer(this.app as any);
		this.io = socketIO(this.httpServer);
		this.io.serveClient(true);
		this.io.on("connection", this.handleClientConnected.bind(this));

		this.serverPort = process.env.PORT || 8080;

		this.app.use("/res", express.static(path.resolve("public/res")));
		this.app.get("/", function(req, res) {
			res.sendFile(path.resolve("public/index.html"));
		});
	}


	public run(): void {
		console.log("Starting Spacer server on port " + this.serverPort);
		this.game.run();
		this.httpServer.listen(this.serverPort);
	}

}
