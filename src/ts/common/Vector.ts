export default class Vector {


	public x: number;
	public y: number;


	public constructor(x: number = 0.0, y: number = 0.0) {
		this.x = x;
		this.y = y;
	}


	public add(v: Vector): void {
		this.x += v.x;
		this.y += v.y;
	}


	public multiply(v: Vector): void {
		this.x *= v.x;
		this.y *= v.y;
	}


	public scale(f: number): void {
		this.x *= f;
		this.y *= f;
	}


	public clone(): Vector {
		return new Vector(this.x, this.y);
	}


	public getSize(): number {
		return Math.sqrt(this.x * this.x + this.y * this.y);
	}


	public static fromAngle(radians: number, size: number): Vector {
		return new Vector(Math.cos(radians) * size, Math.sin(radians) * size);
	}

}
