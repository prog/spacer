import IView from "./IVIew";
import * as assets from "./assets";



export default class Background {


	public texture: THREE.Texture;
	public object: THREE.Object3D;


	constructor() {
		this.texture = new THREE.TextureLoader().load("res/images/857-tileable-classic-nebula-space-patterns/2.jpg");
		this.texture.wrapS = THREE.RepeatWrapping;
		this.texture.wrapT = THREE.RepeatWrapping;
		this.object = new THREE.Mesh(assets.planeGeometry, new THREE.MeshBasicMaterial({map: this.texture}));
		this.object.position.z = -1;
	}


	public beforeRender(view: IView) {
		const bgSize = 300;

		this.texture.repeat.set(view.w / bgSize, view.h / bgSize);
		this.texture.offset.set((view.x - view.w / 2) / bgSize, (view.y - view.h / 2) / bgSize);
		this.object.position.x = view.x;
		this.object.position.y = view.y;
		this.object.scale.set(view.w, view.h, 1);
	}

}
