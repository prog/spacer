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


	public constructor() {
		this.game = new Game();
		this.app = express();
		this.httpServer = http.createServer(this.app as any);
		this.io = socketIO(this.httpServer);
		this.io.serveClient(true);
		this.serverPort = 8080;

		this.app.use("/res", express.static(path.resolve("public/res")));
		this.app.get("/", function(req, res) {
			res.sendFile(path.resolve("public/index.html"));
		});
	}


	public run(): void {
		this.game.run();
		console.log("Starting Spacer server");
		this.httpServer.listen(this.serverPort);
	}

}
