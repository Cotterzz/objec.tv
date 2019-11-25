class FizzPoint {
	constructor(parent, position = new THREE.Vector3(), mass=1, radius=4, softradius=4.1){
		this.position = new THREE.Vector3().copy(position);
		this.rotation = new THREE.Euler();
		this.velocity = new THREE.Vector3();
		this.mass = mass;
		this.radius = radius;
		this.softRadius = softradius;
		this.mesh = new THREE.Mesh();
		var geometry = new THREE.SphereGeometry(this.radius, 32, 32);
        var material = new THREE.MeshPhongMaterial({color: 0x0033ff});
        this.hardmesh = new THREE.Mesh(geometry, material);
        this.mesh.add( this.hardmesh );
        var softgeometry = new THREE.SphereGeometry(this.softRadius, 32, 32);
        var softmaterial = new THREE.MeshPhongMaterial({color: 0x00ffff, transparent: true, opacity:0.2});
        this.softmesh = new THREE.Mesh(softgeometry, softmaterial);
        this.mesh.add( this.softmesh );
        parent.add(this.mesh);
	}
	update(){
		this.mesh.position.copy(this.position);
		this.mesh.rotation.copy(this.rotation);
	}
}