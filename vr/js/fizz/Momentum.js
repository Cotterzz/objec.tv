class Momentum extends Rule {
	constructor() {
		super();
		this.members = [];
	}
	applyRule(){
		for (var i = 0; i < this.members.length; i++) {
			this.members[i].position.add(this.members[i].velocity);
		}
	}
	addMember(point){
		this.members.push(point);
	}
}