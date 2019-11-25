class Collision extends Rule {
	constructor() {
		super();
		this.members = [];
	}
	applyRule(){
		for (var i = 0; i < this.members.length-1; i++) {
			for (var j = i+1; j < this.members.length; j++) {
				//console.log("Check:", i, j);
				var minimumDistance = this.members[i].softRadius + this.members[j].softRadius;
				var distance = this.members[i].position.distanceTo(this.members[j].position);
				var difference = distance-minimumDistance;
				if(difference<0){
					console.log(this.members[i].position, this.members[j].position);

					var percentShift = difference/(minimumDistance*2);
					console.log("min:", minimumDistance, "dist:", distance, "diff:", difference, "perc:", percentShift);

					var xDist = this.members[j].position.x - this.members[i].position.x;
					var yDist = this.members[j].position.y - this.members[i].position.y;
					var zDist = this.members[j].position.z - this.members[i].position.z;
					console.log("xd:", xDist, "yd:", yDist, "zd:", zDist);

					this.members[j].position.x -= (xDist*percentShift);
					this.members[i].position.x += (xDist*percentShift);
					this.members[j].position.y -= (yDist*percentShift);
					this.members[i].position.y += (yDist*percentShift);
					this.members[j].position.z -= (zDist*percentShift);
					this.members[i].position.z += (zDist*percentShift);
					console.log(this.members[i].position, this.members[j].position);
				}
			}
		}
	}

	addMember(point){
		this.members.push(point);
	}
}