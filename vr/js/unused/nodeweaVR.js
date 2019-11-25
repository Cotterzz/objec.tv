//var constant = {PI:3.1415926535,ETA:1.5708,TAU:6.283184,TURN:360,HTURN:180,QTURN:90};

//var nodes = [];
//var labels = [];
//var joins = [];


//var oldeventX;
//var oldeventY;

//var controllerA, controllerB;
//var controllers = 0;
//var cursor;
//var movedA;
//var movedB;

//var raycaster = new THREE.Raycaster();
//var mouse = new THREE.Vector2();
//var vector = new THREE.Vector3();
//
//var plane;
//
//var VR = false;
//var originY = 0;
//var unit;
//if(VR){
//	unit = 0.02;
//	originY = 2;
//} else {
//	unit = 2;
//	cursor = {};
//}
//var zs = unit*3;
//var xs = unit*7;
//var ys = unit*5;

//var viewport = new ViewPort();



//var viewport = {
	//scene:null,
	//renderer:null,
	//camera:null,
	//init:function(){
		//this.container = document.getElementById("container");
    	//this.renderer = new THREE.WebGLRenderer({canvas:document.getElementById("canvas3d"),antialias:true});
    	//this.renderer.physicallyCorrectLights = true;
    	//this.renderer.shadowMap.enabled = true;
        //this.renderer.shadowMap.type = THREE.BasicShadowMap;

       //if(VR){
       //	this.renderer.vr.enabled = true;
		//	this.renderer.vr.standing = true
       //	document.body.appendChild( WEBVR.createButton( this.renderer ) );
    	//}

    	//this.renderer.setSize(window.innerWidth, window.innerHeight);
    	//console.log("Max isotropy:", this.renderer.getMaxAnisotropy());
    	//this.scene = new THREE.Scene();
    	//this.scene.background = new THREE.Color( 0xffffff );
    	//this.camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 1000);
    	//this.scene.add(this.camera);
    	//this.camera.position.set(0, 0,100);
    	//this.camera.near = 0.0001;
    	//this.camera.lookAt(this.scene.position);
    	//this.orbitcontrols = new THREE.OrbitControls(this.camera, this.container);
    	//if(!VR){
    	//	this.animate();
    	//	plane = new THREE.Mesh(new THREE.PlaneBufferGeometry(500, 500, 8, 8), new THREE.MeshBasicMaterial({color: 0xff00ff}));
		//	plane.visible = false;
		//	this.scene.add(plane);
    	//};
	//},

	//vranimate:function(){ viewport.renderer.setAnimationLoop( viewport.vrrender )},

    //vrrender:function(){
        //viewport.renderer.render(viewport.scene, viewport.camera);
        //THREE.VRController.update();
        //checkCollisions();
        //refresh();
    //},
    
	//animate:function(){
		//requestAnimationFrame(viewport.animate);
    	//viewport.renderer.render(viewport.scene, viewport.camera);
    	//refresh();
	//}

//};

//function checkCollisions(){
//	if(controllerA){ checkCollision(controllerA) };
//	if(controllerB){ checkCollision(controllerB) };
//}

//function refresh(){
//	if(cursor){
//		for (var i = 0; i < nodes.length; i++) {
//			if(cursor.touching==nodes[i]){
//				nodes[i].label.material.color.setHex( 0xff00ff );
//			} else {
//				nodes[i].label.material.color.setHex( 0xffffff );
//			}
//		}
//		
//		
//		
//	}
//	if(controllerA && controllerB) {
//	for (var i = 0; i < nodes.length; i++) {
//		if(controllerA.touching==nodes[i]){
//			if(controllerB.touching==nodes[i]) {
//				// BOTH
//				nodes[i].label.material.color.setHex( 0x0000ff );
//			} else {
//				// CONTROLLER A
//				nodes[i].label.material.color.setHex( 0xff0000 );
//			}
//		} else if(controllerB.touching==nodes[i]) {
//				// CONTROLLER B
//				nodes[i].label.material.color.setHex( 0x00ff00 );
//		} else {
//				// NEITHER
//				nodes[i].label.material.color.setHex( 0xffffff );
//			}
//		}
//		if(controllerA.touching){controllerA.setVibe( "label", 0.5 )} else {controllerA.setVibe( "label", 0 );}
//		if(controllerB.touching){controllerB.setVibe( "label", 0.5 )} else {controllerB.setVibe( "label", 0 );}
//
//		if(controllerA.holding){
//			movedA = new THREE.Vector3().subVectors(controllerA.position, controllerA.grab.position);
//			controllerA.holding.position.addVectors(controllerA.grabbed.position, movedA);
//			controllerA.holding.updateJoin();
//			console.log(controllerA.holding.updateJoin);
//		}
//		if(controllerB.holding){
//			movedB = new THREE.Vector3().subVectors(controllerB.position, controllerB.grab.position);
//			controllerB.holding.position.addVectors(controllerB.grabbed.position, movedB);
//			controllerB.holding.updateJoin();
//			console.log(controllerB.holding.updateJoin);
//		}
//	}
//}

//function checkCollision(controller){
//	var threshold = 0.1;
//	var collide = false;
//	for (var i = 0; i < nodes.length; i++) {
//		var pointA = nodes[i].localToWorld(new THREE.Vector3());
//		var pointB = controller.localToWorld(new THREE.Vector3());
//		var vt = nodes[i].label.faceHeight/2;
//		var ht = nodes[i].label.faceWidth/2;
//		//console.log(ht,vt);
//		if (pointB.z<pointA.z && pointB.z>pointA.z-threshold){
//			
//			if (pointB.x<(pointA.x+ht) && pointB.x>(pointA.x-ht)){
//				//console.log(pointB.y, pointA.y);
//				if (pointB.y<(pointA.y+vt) && pointB.y>(pointA.y-vt)){
//					//console.log("collision!")
//					//controller.setVibe( "label"+i, 0.5 );
//					collide=true;
//					controller.touching = nodes[i];
//					//labels[i].material.color.setHex( 0x00ff00 );
//				}
//			}
//		}
//		
//	}
//
//	if(!collide){
//			controller.touching = null;
//		}
//
//	return collide;
//}



//console.log(THREE.VRController.supported)
//
//if(VR){
//	window.addEventListener( 'vr controller connected', vrControllerAdded);
//} else {
//	document.addEventListener( 'mousemove', onDocumentMouseMove, false );
//	document.addEventListener( 'mousedown', onDocumentMouseDown, false );    
//	document.addEventListener( 'mouseup', onDocumentMouseUp, false ); 
//}

//function onDocumentMouseMove(event){
//
//	oldeventX = event.clientX;
//	oldeventY = event.clientY;
//	
//	vector.set( ( event.clientX / window.innerWidth ) * 2 - 1, - ( event.clientY / window.innerHeight ) * 2 + 1, 0.5); // z = 0.5 important!
//
//    vector.unproject( viewport.camera );
//
//    raycaster.set( viewport.camera.position, vector.sub( viewport.camera.position ).normalize() );
//
//
//
//	//raycaster.setFromCamera( mouse.clone(), viewport.camera );
//	var objects = raycaster.intersectObjects(labels);
//	
//	cursor.touching = null;
//	if (objects.length>0) {
//		//console.log("HIT x ", objects.length);
//        cursor.touching = objects[0].object.node;
//        //console.log(cursor.touching);
//    	}
//	
//    plane.visible = true;
//    var intersect = raycaster.intersectObject(plane);
//    if(intersect.length>0){
//    	cursor.position = new THREE.Vector3(intersect[0].point.x, intersect[0].point.y, intersect[0].point.z);
//	}
//    plane.visible = false;
//
//    if(cursor.holding){
//			movedA = new THREE.Vector3().subVectors(cursor.position, cursor.grab.position);
//			//console.log(cursor.position.x, cursor.position.y, cursor.position.z, cursor.grab.position.x, cursor.grab.position.y, cursor.grab.position.z, movedA.x, movedA.y, movedA.z)
//			//var oldZ= cursor.holding.position.z;
//			cursor.holding.position.addVectors(cursor.grabbed.position, movedA);
//			//cursor.holding.position.z = oldZ;
//			cursor.holding.updateJoin();
//			//console.log(controllerA.holding.updateJoin);
//		}
//
//
//}

//function onDocumentMouseDown(event){
//	if(cursor.touching!=null){
//		cursor.holding  = cursor.touching;
//		viewport.orbitcontrols.enabled = false;
//
//
//		plane.position = cursor.holding.localToWorld(new THREE.Vector3()).clone();
//
//		cursor.grab = {position:null, rotation:null}; 
//		cursor.grab.position = cursor.position.clone();
//
//		cursor.grabbed = {position:null, rotation:null}; 
//		cursor.grabbed.position = cursor.holding.position.clone();
//
//		cursor.holding.dispatchEvent({ type: "nodepress" });
//
//	}
//}
//
//function onDocumentMouseUp(event){
//	if(cursor.holding!=null){
//		cursor.holding  = null;
//		viewport.orbitcontrols.enabled = true;
//	}
//}
//
//function vrControllerAdded(event){
//	console.log("VR CONTROLLER ADDED");
//	
//	//  Here it is, your VR controller instance.
//	//  It’s really a THREE.Object3D so you can just add it to your scene:
//	var controller;
//	controllers +=1
//
//	if(controllers==1){
//		controllerA = controller = event.detail;
//
//	} else if(controllers==2){
//		controllerB = controller = event.detail;
//	} else {
//		console.log("MORE THAN TWO CONTROLLERS ADDED")
//	}
//	
//	viewport.scene.add( controller )
//	//  HEY HEY HEY! This is important. You need to make sure you do this.
//	//  For standing experiences (not seated) we need to set the standingMatrix
//	//  otherwise you’ll wonder why your controller appears on the floor
//	//  instead of in your hands! And for seated experiences this will have no
//	//  effect, so safe to do either way:
//	controller.standingMatrix = viewport.renderer.vr.getStandingMatrix()
//	//  And for 3DOF (seated) controllers you need to set the controller.head
//	//  to reference your camera. That way we can make an educated guess where
//	//  your hand ought to appear based on the camera’s rotation.
//	controller.head = window.camera
//	//  Right now your controller has no visual.
//	//  It’s just an empty THREE.Object3D.
//	//  Let’s fix that!
//	var
//	meshColorOff = 0xDB3236,//  Red.
//	meshColorOn  = 0xF4C20D,//  Yellow.
//	controllerMaterial = new THREE.MeshStandardMaterial({
//		color: meshColorOff
//	}),
//	controllerMesh = new THREE.Mesh(
//		new THREE.CylinderGeometry( 0.005, 0.05, 0.1, 6 ),
//		controllerMaterial
//	),
//	handleMesh = new THREE.Mesh(
//		new THREE.BoxGeometry( 0.03, 0.1, 0.03 ),
//		controllerMaterial
//	)
//	controllerMaterial.flatShading = true
//	controllerMesh.rotation.x = -Math.PI / 2
//	handleMesh.position.y = -0.05
//	controllerMesh.add( handleMesh )
//	controller.userData.mesh = controllerMesh//  So we can change the color later.
//	controller.add( controllerMesh )
//	controllerMesh.position.z = 0.05;
//	//castShadows( controller )
//	//receiveShadows( controller )
//	//  Allow this controller to interact with DAT GUI.
//	//var guiInputHelper = dat.GUIVR.addInputObject( controller )
//	//viewport.scene.add( guiInputHelper )
//	//  Button events. How easy is this?!
//	//  We’ll just use the “primary” button -- whatever that might be ;)
//	//  Check out the THREE.VRController.supported{} object to see
//	//  all the named buttons we’ve already mapped for you!
//	//controller.addEventListener( 'primary press began', function( event ){
//		//event.target.userData.mesh.material.color.setHex( meshColorOn )
//		//guiInputHelper.pressed( true )
//	//})
//	//controller.addEventListener( 'primary press ended', function( event ){
//		//event.target.userData.mesh.material.color.setHex( meshColorOff )
//		//guiInputHelper.pressed( false )
//	//})
//
//	controller.addEventListener( 'grip value changed', function( event ){
//		//console.log(event.type, event.target, event.value);
//
//		if(event.value>0.9 && !event.target.holding && event.target.touching) {
//			event.target.holding = event.target.touching;
//			event.target.grab = {position:null, rotation:null}; 
//			event.target.grab.position = event.target.position.clone();
//			event.target.grab.rotation = event.target.rotation.clone();
//			event.target.grabbed = {position:null, rotation:null}; 
//			event.target.grabbed.position = event.target.holding.position.clone();
//			event.target.grabbed.rotation = event.target.holding.rotation.clone();
//			event.target.holding.dispatchEvent({ type: "nodepress" });
//		}
//		if(event.value<0.8 && event.target.holding ) {
//			event.target.touching = event.target.holding;
//			event.target.holding = null;
//		}
//
//	})
//
//	//  Daddy, what happens when we die?
//	controller.addEventListener( 'disconnected', function( event ){
//		controller.parent.remove( controller );
//	})
//};

function node3d(x, y, z, text, isroot, scale=1){
	var container = new THREE.Object3D();
	container.label = new Label3d(text, scale);
	container.label.node = container;
	container.joins = [];
	labels.push(container.label);
	container.add(container.label);
	container.position.x = x;container.position.y = y;container.position.z = z;

	container.isroot = isroot;


	if(!isroot){
		container.join = curve3d(x, y, z);
		container.add(container.join);
	}

	container.updateJoin = function(){
		for (var i = 0; i < this.joins.length; i++){
			this.joins[i].update();
			//console.log("UPDATE", i)
		}
		for (var j = 0; j < this.children.length; j++){
			if(this.children[j].joins){
				this.children[j].updateJoin();
			}
		}
		if(!this.isroot){
			this.join.update(this.position.x,this.position.y,this.position.z);
		}
	}

	
	return container;
}

function join3d(nodeA, nodeB, thickness){

	var pointA = nodeA.localToWorld(new THREE.Vector3());
	var pointB = nodeB.localToWorld(new THREE.Vector3());

	var x = pointB.x;
	var y = pointB.y;
	var z = pointB.z;

	//z=-z; y=-y; x=-x;
	//var zoffset = -unit/5;
	//var sx=0, sy=0, sz=zoffset;
	//z+=zoffset;
	var sx = pointA.x;
	var sy = pointA.y;
	var sz = pointA.z;
	var distance = Math.sqrt((x*x)+(y*y)+(z*z));
	//console.log(x,y,z,distance);
	var curve = new THREE.CubicBezierCurve3(
		new THREE.Vector3( sx, sy, sz ),
		new THREE.Vector3( sx, sy, sz-10 ),
		new THREE.Vector3( x, y, z-10 ),
		new THREE.Vector3( x, y, z )
	);

	var points = curve.getPoints( 50 );

	var geometry = new THREE.Geometry().setFromPoints( points );

	var line = new MeshLine();
	line.setGeometry( geometry );

	var resolution = new THREE.Vector2( window.innerWidth/2, window.innerHeight/2 );
	var lw = unit*thickness;
	var material = new MeshLineMaterial( {
		//useMap: false,
		color: new THREE.Color( 0x00ff00 ),
		//opacity: 1,
		resolution: resolution,
		//sizeAttenuation: false,
		lineWidth: lw,
		//color: 0xff0000
	});


	var mesh = new THREE.Mesh( line.geometry, material );

	mesh.nodeA = nodeA;
	mesh.nodeB = nodeB;

	nodeA.joins.push(mesh);
	nodeB.joins.push(mesh);

	mesh.update = function(){
		var pointA = this.nodeA.localToWorld(new THREE.Vector3());
		var pointB = this.nodeB.localToWorld(new THREE.Vector3());

		var x = pointB.x;
		var y = pointB.y;
		var z = pointB.z;
	
		//z=-z; y=-y; x=-x;
		//var zoffset = -unit/5;
		//var sx=0, sy=0, sz=zoffset;
		//z+=zoffset;
		var sx = pointA.x;
		var sy = pointA.y;
		var sz = pointA.z;
		var distance = Math.sqrt((x*x)+(y*y)+(z*z));
		//console.log("updatejoin",x,y,z,distance);
		var curve = new THREE.CubicBezierCurve3(
			new THREE.Vector3( sx, sy, sz ),
			new THREE.Vector3( sx, sy, sz-10 ),
			new THREE.Vector3( x, y, z-10 ),
			new THREE.Vector3( x, y, z )
		);
		var points = curve.getPoints( 50 );
		var geometry = new THREE.Geometry().setFromPoints( points );
		var line = new MeshLine();
		line.setGeometry( geometry );
		this.geometry = line.geometry;  
        this.geometry.verticesNeedUpdate = true;
	}

	return mesh;
	//var material = new THREE.LineBasicMaterial( { color : 0xff0000 } );
	// Create the final object to add to the scene
	//var curveObject = new THREE.Line( geometry, material );
	//return curveObject;
}

//function curve3d(x,y,z){
//	z=-z; y=-y; x=-x;
//	var zoffset = -unit/5;
//	var sx=0, sy=0, sz=zoffset;
//	z+=zoffset;
//	var distance = Math.sqrt((x*x)+(y*y)+(z*z));
//	console.log(x,y,z,distance);
//	var curve = new THREE.CubicBezierCurve3(
//		new THREE.Vector3( sx, sy, sz ),
//		new THREE.Vector3( x, sy, sz-(distance*0.5) ),
//		new THREE.Vector3( sx, y, z-(distance*0.5) ),
//		new THREE.Vector3( x, y, z )
//	);
//
//	var points = curve.getPoints( 50 );
//
//	var geometry = new THREE.Geometry().setFromPoints( points );
//
//	var line = new MeshLine();
//	line.setGeometry( geometry );
//
//	var resolution = new THREE.Vector2( window.innerWidth/2, window.innerHeight/2 );
//	var lw = unit*0.5;
//	var material = new MeshLineMaterial( {
//		//useMap: false,
//		color: new THREE.Color( 0x000000 ),
//		//opacity: 1,
//		resolution: resolution,
//		//sizeAttenuation: false,
//		lineWidth: lw,
//		//color: 0xff0000
//	});
//
//
//	var mesh = new THREE.Mesh( line.geometry, material );
//
//	mesh.update = function(x,y,z){
//		z=-z; y=-y; x=-x;
//		var zoffset = -unit/5;
//		var sx=0, sy=0, sz=zoffset;
//		z+=zoffset;
//		var distance = Math.sqrt((x*x)+(y*y)+(z*z));
//		//console.log("updatejoin",x,y,z,distance);
//		var curve = new THREE.CubicBezierCurve3(
//			new THREE.Vector3( sx, sy, sz ),
//			new THREE.Vector3( x, sy, sz-(distance*0.5) ),
//			new THREE.Vector3( sx, y, z-(distance*0.5) ),
//			new THREE.Vector3( x, y, z )
//		);
//		var points = curve.getPoints( 50 );
//		var geometry = new THREE.Geometry().setFromPoints( points );
//		var line = new MeshLine();
//		line.setGeometry( geometry );
//		this.geometry = line.geometry;  
//        this.geometry.verticesNeedUpdate = true;
//	}
//
//	return mesh;
//}

