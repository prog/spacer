import CommonRocket from "./../common/Rocket";
import Game from "./Game";
import * as assets from "./assets";
import * as constants from "./../common/constants";



export default class Shot extends CommonRocket {


	public object: THREE.Object3D;


	public constructor(game: Game) {
		super(game);
		this.object = new THREE.Mesh(assets.planeGeometry, assets.rocketMaterial);
		this.object.scale.set(5, 5, 1);
	}


	public beforeRender(): void {
		this.object.position.set(this.position.x, this.position.y, -1.0);
		this.object.rotation.z = this.orientation - constants.PIHALF;
	}

}
