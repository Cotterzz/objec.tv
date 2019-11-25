class DefaultSystem extends System{
	constructor(width, depth){

		super();

		this.width = width;
		this.depth = depth;


		// soft constraints providing force
		this.rules.push(this.gravity = new Force("y", -0.01));
		//this.rules.push(this.objectsRepel = new Repulsion());
		this.rules.push(this.objectsBounce = new Bounce());
		this.rules.push(this.groundBounce = new SoftConstraint("y", 0, "above"));

		// apply all velocities to position
		this.rules.push(this.momentum = new Momentum());

		// hard constraints on position
		this.rules.push(this.rightWall = new Constraint("x", this.width/2, "below"));
		this.rules.push(this.leftWall = new Constraint("x", this.width/-2, "above"));
		this.rules.push(this.frontWall = new Constraint("z", this.depth/-2,"above"));
		this.rules.push(this.backWall = new Constraint("z", this.depth/2,  "below"));
		//this.rules.push(this.ground = new Constraint("y", 0, "above"));
		
	}
}