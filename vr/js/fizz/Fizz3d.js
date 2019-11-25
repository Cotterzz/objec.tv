class Fizz3d extends THREE.Object3D {
	constructor(viewport, width, depth){
        super();
        this.width = width;
        this.depth = depth;
		viewport.addEventListener("enterframe", () => { this.enterFrame() } );
		this.system = new DefaultSystem(width, depth);
		var geometry = new THREE.PlaneGeometry( width, depth, 32 );
		var material = new THREE.MeshBasicMaterial( {color: 0x0066ff, side: THREE.DoubleSide} );
		var plane = new THREE.Mesh( geometry, material );
		plane.rotation.x = global.ETA;
		this.add( plane );
		this.fizzPoints = [];
	}

	enterFrame(){
		this.system.applyRules();
		for (var i = 0; i < this.fizzPoints.length; i++) {
			this.fizzPoints[i].update();
		}
    }

    addFizzpoint(fizzpoint){
    	this.fizzPoints.push(fizzpoint);
    	this.system.addMember(fizzpoint);

    }
}