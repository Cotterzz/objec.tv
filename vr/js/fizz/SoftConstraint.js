class SoftConstraint extends Rule {
	constructor(cprop, cvar, cdirection) {
		super();
		this.members = [];
		this.constrainedProperty = cprop;
		this.constrainedValue = cvar;
		this.constrainedDirection = cdirection;
	}
	applyRule(){
		var damp = 1;
		var cd=this.constrainedDirection;
		var cv=this.constrainedValue;
		var cp=this.constrainedProperty;
		for (var i = 0; i < this.members.length; i++) {
			var mp=this.members[i].position; // this is good for readability,
			var mr=this.members[i].softRadius; // but not code speed
			var mv=this.members[i].velocity;
			if(cd=="above"){
				if ((mp[cp]-mr)<cv){
					mv[cp]+=(cv-(mp[cp]-mr));
					mv.x*=damp;
					mv.y*=damp;
					mv.z*=damp;
				}
			} else if (cd=="below"){
				if ((mp[cp]+mr)>cv){
					mv[cp]-=(cv-(mp[cp]-mr));
					mv.x*=damp;
					mv.y*=damp;
					mv.z*=damp;
				}
			}
		}
	}
	addMember(point){
		this.members.push(point);
	}
}