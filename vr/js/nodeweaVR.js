var constant = {PI:3.1415926535,ETA:1.5708,TAU:6.283184,TURN:360,HTURN:180,QTURN:90};

var strings = ["Parent", "child1", "child2", "grandchild"];
var labels = [];
var joins = [];
window.addEventListener( 'vr controller connected', vrcontrolleradded)

var main = {
	init:function(){
		viewport.init();
		labels[0] = label3d(strings[0]);
		labels[0].scale.set(0.05, 0.05, 0.05);
		viewport.scene.add(labels[0]);
		labels[0].position.z = -1;
		labels[0].position.y = 1.5;


		labels[1] = label3d(strings[1]);
		labels[0].add(labels[1]);
		labels[1].position.x = -3.5;
		labels[1].position.y = -5;
		labels[1].position.z = 5;

		labels[2] = label3d(strings[2]);
		labels[0].add(labels[2]);
		labels[2].position.x = 4;
		labels[2].position.y = -6;
		labels[2].position.z = 2;

		labels[3] = label3d(strings[3]);
		labels[2].add(labels[3]);
		labels[3].position.x = 4;
		labels[3].position.y = -6;
		labels[3].position.z = 2;

		joins[0] = curve3d(-3.5, -5, 5);
		joins[1] = curve3d(4, -6, 2);
		joins[2] = curve3d(4, -6, 2);

		labels[0].add(joins[0]);
		labels[0].add(joins[1]);
		labels[2].add(joins[2]);
		
		
		
		
		

		//viewport.scene.add(new THREE.AmbientLight("#FFFFFF", 3));
		viewport.scene.add(new THREE.AmbientLight("#ffffff", 1));
        var light1 = new THREE.PointLight("#ff4444", 150, 100, 2);
        viewport.scene.add(light1);
        light1.position.set(10, 10, 10);

        viewport.vranimate();
	}
};


var viewport = {
	scene:null,
	renderer:null,
	camera:null,
	init:function(){
		this.container = document.getElementById("container");
    	this.renderer = new THREE.WebGLRenderer({canvas:document.getElementById("canvas3d"),antialias:true});
    	this.renderer.physicallyCorrectLights = true;
    	//this.renderer.shadowMap.enabled = true;
        //this.renderer.shadowMap.type = THREE.BasicShadowMap;


        this.renderer.vr.enabled = true;
        document.body.appendChild( WEBVR.createButton( this.renderer ) );


    	this.renderer.setSize(window.innerWidth, window.innerHeight);
    	console.log("Max isotropy:", this.renderer.getMaxAnisotropy());
    	this.scene = new THREE.Scene();
    	this.scene.background = new THREE.Color( 0xffffff );
    	this.camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 1000);
    	this.scene.add(this.camera);
    	this.camera.position.set(0, 0,100);
    	this.camera.near = 0.0001;
    	this.camera.lookAt(this.scene.position);
    	this.orbitcontrols = new THREE.OrbitControls(this.camera, this.container);
    	//this.animate();
	},

	vranimate:function(){ viewport.renderer.setAnimationLoop( viewport.vrrender )},

    vrrender:function(){
        viewport.renderer.render(viewport.scene, viewport.camera);
        labels[0].rotation.y += 0.01
        //ball.mesh.rotation.y +=0.01;
    }
    /*
	animate:function(){
		requestAnimationFrame(viewport.animate);
    	viewport.renderer.render(viewport.scene, viewport.camera);
	}
	*/
};


window.onload = function(){

	

	main.init();
}
console.log(THREE.VRController.supported)

function vrcontrolleradded( event ){
	console.log("VR CONTROLLER ADDED");
	
	//  Here it is, your VR controller instance.
	//  It’s really a THREE.Object3D so you can just add it to your scene:
	var controller = event.detail
	scene.add( controller )
	//  HEY HEY HEY! This is important. You need to make sure you do this.
	//  For standing experiences (not seated) we need to set the standingMatrix
	//  otherwise you’ll wonder why your controller appears on the floor
	//  instead of in your hands! And for seated experiences this will have no
	//  effect, so safe to do either way:
	controller.standingMatrix = renderer.vr.getStandingMatrix()
	//  And for 3DOF (seated) controllers you need to set the controller.head
	//  to reference your camera. That way we can make an educated guess where
	//  your hand ought to appear based on the camera’s rotation.
	controller.head = window.camera
	//  Right now your controller has no visual.
	//  It’s just an empty THREE.Object3D.
	//  Let’s fix that!
	var
	meshColorOff = 0xDB3236,//  Red.
	meshColorOn  = 0xF4C20D,//  Yellow.
	controllerMaterial = new THREE.MeshStandardMaterial({
		color: meshColorOff
	}),
	controllerMesh = new THREE.Mesh(
		new THREE.CylinderGeometry( 0.005, 0.05, 0.1, 6 ),
		controllerMaterial
	),
	handleMesh = new THREE.Mesh(
		new THREE.BoxGeometry( 0.03, 0.1, 0.03 ),
		controllerMaterial
	)
	controllerMaterial.flatShading = true
	controllerMesh.rotation.x = -Math.PI / 2
	handleMesh.position.y = -0.05
	controllerMesh.add( handleMesh )
	controller.userData.mesh = controllerMesh//  So we can change the color later.
	controller.add( controllerMesh )
	castShadows( controller )
	receiveShadows( controller )
	//  Allow this controller to interact with DAT GUI.
	var guiInputHelper = dat.GUIVR.addInputObject( controller )
	scene.add( guiInputHelper )
	//  Button events. How easy is this?!
	//  We’ll just use the “primary” button -- whatever that might be ;)
	//  Check out the THREE.VRController.supported{} object to see
	//  all the named buttons we’ve already mapped for you!
	controller.addEventListener( 'primary press began', function( event ){
		event.target.userData.mesh.material.color.setHex( meshColorOn )
		guiInputHelper.pressed( true )
	})
	controller.addEventListener( 'primary press ended', function( event ){
		event.target.userData.mesh.material.color.setHex( meshColorOff )
		guiInputHelper.pressed( false )
	})
	//  Daddy, what happens when we die?
	controller.addEventListener( 'disconnected', function( event ){
		controller.parent.remove( controller )
	})
}

function curve3d(x,y,z){
	var zoffset = -0.1;
	var sx=0, sy=0, sz=zoffset;
	z+=zoffset;
	var distance = Math.sqrt((x*x)+(y*y)+(z*z));
	console.log(x,y,z,distance);
	var curve = new THREE.CubicBezierCurve3(
		new THREE.Vector3( sx, sy, sz ),
		new THREE.Vector3( x, sy, sz-(distance*0.5) ),
		new THREE.Vector3( sx, y, z-(distance*0.5) ),
		new THREE.Vector3( x, y, z )
	);

	var points = curve.getPoints( 50 );

	var geometry = new THREE.Geometry().setFromPoints( points );

	var line = new MeshLine();
	line.setGeometry( geometry );

	var resolution = new THREE.Vector2( window.innerWidth/2, window.innerHeight/2 );

	var material = new MeshLineMaterial( {
		//useMap: false,
		color: new THREE.Color( 0x000000 ),
		//opacity: 1,
		resolution: resolution,
		//sizeAttenuation: false,
		lineWidth: .01,
		//color: 0xff0000
	});


	var mesh = new THREE.Mesh( line.geometry, material );

	return mesh;
	//var material = new THREE.LineBasicMaterial( { color : 0xff0000 } );
	// Create the final object to add to the scene
	//var curveObject = new THREE.Line( geometry, material );
	//return curveObject;
}


function label3d(text){
	var testcanvas = document.createElement('canvas');
	testcanvas.width = 2048;
	testcanvas.height = 200;
	var fontSize = 80;
	var border = 10;
	var padding = 20;
	var font = fontSize + "px Quicksand";
	var testctx = testcanvas.getContext('2d');
	testctx.font = font;
	var testmetrics = testctx.measureText(text);

	var totalwidth = testmetrics.width + (padding*2);
	console.log(text, totalwidth);

	var sizes = [64, 128, 256, 512, 1024, 2048];
	var geomsize = 32;
	var size = 2048;
	for (var i = sizes.length; i>0; i--){
		if (totalwidth<sizes[i]){
			size = sizes[i];
			geomsize = Math.pow(2, i);
		}
	}
	console.log("size", size, geomsize);
	

	
	var color = "#000000";
	var bgcolor = "#ffffff";
	
	
	var lineSpaceSize = fontSize*0.24;
	var x = padding;
	var y = padding + (fontSize - lineSpaceSize);
	var canvas = document.createElement('canvas');
	canvas.width = canvas.height = size;
	var ctx = canvas.getContext('2d');
	ctx.font = font;
	ctx.fillStyle = color;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = color;
    //ctx.textAlign = "center";
    var metrics = ctx.measureText(text);
    ctx.fillStyle = bgcolor;
    ctx.fillRect(border, border, (metrics.width + (padding*2))-(border*2), (fontSize + (padding*2))-(border*2));
    ctx.fillStyle = color;
    ctx.fillText(text, x, y);
    y += fontSize; //(metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent);
    //console.log("Y:", y);
    //console.log(metrics);
    //ctx.fillText("w:" + (Math.round(metrics.width*100))/100, x, y);


    var texture = new THREE.Texture(canvas);


    yperc = (fontSize+(padding*2))/size;
    xperc = (metrics.width+(padding*2))/size;
    texture.repeat.set(xperc,yperc);
    texture.offset.set(0,1-yperc)
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    //console.log("B: " , texture.magFilter, texture.minFilter)
    texture.magFilter = THREE.LinearFilter;
    texture.minFilter = THREE.LinearFilter;
    //console.log("A: " , texture.magFilter, texture.minFilter)
    texture.anisotropy = 16;
    
    texture.needsUpdate = true;
    var material = new THREE.MeshBasicMaterial( {map:texture,side: THREE.DoubleSide} );

    //var material = new THREE.MeshPhongMaterial({map: texture,side:THREE.DoubleSide,bumpMap: texture,bumpScale: 0.15,specularMap: texture,specular: new THREE.Color('#ffffff')})
	var geometry = new THREE.PlaneGeometry( geomsize*xperc, geomsize*yperc, 2, 2 );
	var mesh = new THREE.Mesh( geometry, material);
	return mesh;
}


