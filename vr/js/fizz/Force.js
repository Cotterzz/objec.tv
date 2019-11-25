class Force extends Rule {
	constructor(cprop, cvar) {
		super();
		this.members = [];
		this.constrainedProperty = cprop;
		this.constrainedValue = cvar;
	}
	applyRule(){
		var cv=this.constrainedValue;
		var cp=this.constrainedProperty;
		for (var i = 0; i < this.members.length; i++) {
			var mv=this.members[i].velocity;
			mv[cp]+=cv;
		}
	}
	addMember(point){
		this.members.push(point);
	}
}