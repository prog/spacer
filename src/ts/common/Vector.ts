export default class Vector {


	public x: number;
	public y: number;


	public constructor(x: number = 0.0, y: number = 0.0) {
		this.x = x;
		this.y = y;
	}


	public add(v: Vector): Vector {
		this.x += v.x;
		this.y += v.y;
		return this;
	}


	public multiply(v: Vector): Vector {
		this.x *= v.x;
		this.y *= v.y;
		return this;
	}


	public scale(f: number): Vector {
		this.x *= f;
		this.y *= f;
		return this;
	}


	public setSize(f: number): Vector {
		return this.scale(f/this.getSize());
	}


	public flip(): Vector {
		return this.scale(-1);
	}


	public rotate90L(): Vector {
		const tmp = this.y;
		this.y = this.x;
		this.x = -tmp;
		return this;
	}



	public rotate90R(): Vector {
		const tmp = this.x;
		this.x = this.y;
		this.y = -tmp;
		return this;
	}


	public getSize(): number {
		return Math.sqrt(this.x * this.x + this.y * this.y);
	}



	public clone(): Vector {
		return new Vector(this.x, this.y);
	}


	public static fromAngle(radians: number, size: number): Vector {
		return new Vector(Math.cos(radians) * size, Math.sin(radians) * size);
	}

}
