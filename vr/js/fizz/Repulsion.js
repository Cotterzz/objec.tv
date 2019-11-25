class Repulsion extends Rule {
	constructor() {
		super();
		this.members = [];
		this.repulsion = 0.1;
	}
	applyRule(){
		for (var i = 0; i < this.members.length-1; i++) {
			for (var j = i+1; j < this.members.length; j++) {
				//console.log("Check:", i, j);
				var minimumDistance = this.members[i].radius + this.members[j].radius;
				var distance = this.members[i].position.distanceTo(this.members[j].position);
				var difference = distance-minimumDistance;
				if(difference<0){
					console.log(this.members[i].velocity, this.members[j].velocity);

					var percentShift = difference/(minimumDistance*2);
					console.log("min:", minimumDistance, "dist:", distance, "diff:", difference, "perc:", percentShift);

					var xDist = this.members[j].position.x - this.members[i].position.x;
					var yDist = this.members[j].position.y - this.members[i].position.y;
					var zDist = this.members[j].position.z - this.members[i].position.z;
					console.log("xd:", xDist, "yd:", yDist, "zd:", zDist);

					this.members[j].velocity.x -= (xDist*percentShift*this.repulsion);
					this.members[i].velocity.x += (xDist*percentShift*this.repulsion);
					this.members[j].velocity.y -= (yDist*percentShift*this.repulsion);
					this.members[i].velocity.y += (yDist*percentShift*this.repulsion);
					this.members[j].velocity.z -= (zDist*percentShift*this.repulsion);
					this.members[i].velocity.z += (zDist*percentShift*this.repulsion);
					console.log(this.members[i].velocity, this.members[j].velocity);
				}
			}
		}
	}
	addMember(point){
		this.members.push(point);
	}
}