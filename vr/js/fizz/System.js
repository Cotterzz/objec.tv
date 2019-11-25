class System {

	constructor() {
		this.rules = [];
	}

	applyRules(){

		for (var i = 0; i < this.rules.length; i++) {
			if( this.rules[i] ){ this.rules[i].applyRule() };
		}
	}

	addMember(point){
		for (var i = 0; i < this.rules.length; i++) {
			this.rules[i].addMember(point);
		}
	}
}