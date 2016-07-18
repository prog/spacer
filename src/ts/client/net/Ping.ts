import Timer = NodeJS.Timer;



interface IPingCallback {
	(pongTime: number, latency: number, serverTicks: number): void;
}



export default class Ping {


	private socket: SocketIOClient.Socket;
	private maxLatency: number;
	private lastLatency: number = null;

	private number = 0;
	private pingTime: number = null;
	private timeout: any = null;
	private callbacks: IPingCallback[] = [];


	protected handlePong(number: number, serverTicks: number): void {
		if (number === this.number) {
			const pongTime = (new Date()).getTime();
			const latency = (pongTime - this.pingTime);
			this.finish(pongTime, latency, serverTicks);
		}
	}


	protected finish(pongTime: number, latency: number, serverTicks: number): void {
		const callbacks = this.callbacks;
		this.number++;
		this.pingTime = null;
		this.callbacks = [];
		this.lastLatency = latency;
		clearTimeout(this.timeout);
		callbacks.forEach((callback: IPingCallback) => {
			callback.call(null, pongTime, latency, serverTicks);
		});
	}


	public constructor(socket: SocketIOClient.Socket, maxLatency = 1000) {
		this.socket = socket;
		this.socket.on("p", this.handlePong.bind(this));
		this.maxLatency = maxLatency;
	}


	public send(callback: IPingCallback): void {
		this.callbacks.push(callback);
		if (null === this.pingTime) {
			this.pingTime = (new Date()).getTime();
			this.timeout = setTimeout(this.finish.bind(this, null, null, null), this.maxLatency);
			this.socket.emit("p", this.number, this.lastLatency);
		}
	}


	public pingPong(callback: IPingCallback, maxTime: number = 3000, maxPings = 20) {
		const startTime = (new Date()).getTime();
		const res = {
			serverTicks: null,
			latency: null,
			pongTime: null,
		};
		let pingsCount = 0;


		const pongCallback = ((pongTime: number, latency: number, serverTicks: number) => {
			pingsCount++;
			if ((null !== serverTicks) && (null === res.latency || latency < res.latency)) {
				res.pongTime = pongTime;
				res.latency = latency;
				res.serverTicks = serverTicks;
			}
			const timeStop = (null !== maxTime && pongTime >= startTime + maxTime - this.maxLatency);
			const countStop = (null !== maxPings && pingsCount >= maxPings);
			if (timeStop || countStop) {
				callback.call(null, res.pongTime, res.latency, res.serverTicks);
				return;
			}
			this.send(pongCallback);
		});
		this.send(pongCallback);
	}

}
