var letters = ["Q","W","E","R","T","Y","U","I","O","P","A","S","D","F","G","H","J","K","L","Z","X","C","V","B","N","M","SPACE"];

var freqs = [0.11,2.09,12.02,6.02,9.10,2.11,2.88,7.31,7.68,1.82,8.12,6.28,4.32,2.30,2.03,5.92,0.10,0.69,3.98,0.07,0.17,2.71,1.11,1.49,6.95,2.61,1];





var conseqs = {};
var pairs = [];
var keys = {};


function getConseqs(){
	for (var i = 0; i<words.length; i++){
		var word = words[i].toLowerCase();
		for (var j = 1; j<word.length; j++){
			var conseq = word.charAt(j-1) + word.charAt(j);
			if(conseqs[conseq]){
				conseqs[conseq]+=1;
			} else {
				conseqs[conseq]=1;
				pairs.push(conseq);
			}
			
		}
	}
	console.log(conseqs);
}




var index = 0;
var xspace = unit*2;
var yspace = xspace;
var zspace = xspace;
var i;

var remainingWords = [];
var nextLettersObject = {};
var nextLettersArray = [];
var leftLetters = [];
var wordIndex = 0;
var keyboard;

window.onload = function(){
	
	wordweaVR.init();
}

var wordweaVR = {
	init:function(){
		nodeweaVR.init();
		getConseqs();
		//keyboard = node3d(0, originY, 0, "KEYBOARD", true);
		//viewport.scene.add(keyboard);
		//nodes.push(keyboard);
		for (var i = 0; i < letters.length; i++) {
			if(i<10){
				xpos = i*xspace; ypos=0; zpos=0;
			} else if (i<19){
				xpos = ((i-10)+0.3)*xspace; ypos=-yspace; zpos=0;
			} else if (i<26){
				xpos = ((i-19)+0.8)*xspace; ypos=-yspace*2; zpos=0;
			} else {
				xpos = 2.5*xspace; ypos=-yspace*3; zpos=0;
			}
			scale = 0.5+Math.sqrt(freqs[i]);
			console.log("SCALE:", scale);
			var newNode = node3d(xpos-(xspace*5), ypos-(yspace*2), zpos+zspace, letters[i], true, scale);
			nodes.push(newNode);
			viewport.scene.add(newNode);
			keys[letters[i].toLowerCase()] = newNode;
			newNode.letter = letters[i];
			if(newNode.letter == "SPACE"){newNode.letter=" "};
			newNode.addEventListener("nodepress", wwKeyPressed)
		}
		for (i = 0; i < pairs.length; i++) {
			if(conseqs[pairs[i]]>1000){
				var newJoin = join3d(keys[pairs[i].charAt(0)], keys[pairs[i].charAt(1)], conseqs[pairs[i]]/10000);
				viewport.scene.add(newJoin);
				joins.push(newJoin);
			}
		}



	}
};

function wwKeyPressed(event){
	console.log(event.target.letter);
	//extractRemainingWords(event.target.letter);
}

function extractRemainingWords(letter){
	letter = letter.toLowerCase();
	for (var i = 0; i<words.length; i++){
		if(words[i].charAt(wordIndex)==letter){
			console.log(words[i].charAt(wordIndex+1));
			remainingWords.push(words[i]);
			//console.log(words[i]);
			if(words[i].length>(wordIndex+1)){
				if(nextLettersObject[words[i].charAt(wordIndex+1)]){
					nextLettersObject[words[i].charAt(wordIndex+1)]+=1;
				} else {
					nextLettersObject[words[i].charAt(wordIndex+1)]=1;
				}
				
			}
			
		}
	}
	console.log(nextLettersObject);
}
