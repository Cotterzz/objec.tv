class Constraint extends Rule {
	constructor(cprop, cvar, cdirection) {
		super();
		this.members = [];
		this.constrainedProperty = cprop;
		this.constrainedValue = cvar;
		this.constrainedDirection = cdirection;
	}
	applyRule(){

		var cd=this.constrainedDirection;
		var cv=this.constrainedValue;
		var cp=this.constrainedProperty;
		for (var i = 0; i < this.members.length; i++) {
			var mp=this.members[i].position; // this is good for readability,
			var mr=this.members[i].radius; // but not code speed
			var mv=this.members[i].velocity;
			if(cd=="above"){
				if ((mp[cp]-mr)<cv){
					//mv[cp]=0;
					//console.log(mv[cp]);
					mp[cp]=(cv+mr);

				}
			} else if (cd=="below"){
				if ((mp[cp]+mr)>cv){
					//smv[cp]=0;
					mp[cp]=(cv-mr);
				}
			}
		}
	}
	addMember(point){
		this.members.push(point);
	}
}