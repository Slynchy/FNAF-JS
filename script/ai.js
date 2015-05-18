//
// ai.js
// The JS for ai
//
// Last updated - 06/05/2015

function updateBunnyAI() {
	switch(animatronicStates[1].state) {
		case 0:  // unseen
		//	if(animatronicStates[1].currentRoom=="1b") return;
			bunnytimer++;
			console.log("bunnytimer = "+bunnytimer);
			if(animatronicStates[1].currentRoomArray==0) {
				if(leftlighton==true) {
					updateAIState(1,1,false);
				} else {
					updateAIState(1,3,false);
					return;
				};
			};
			if(bunnytimer>=bunnydifficultyarray[bunnydifficulty]){
			//	updateRoomState(roomname,state,timeout);
			//	animatronicStates[1].state=2;
				updateAIState(1,2);
			}
			break;
		case 1:  // seen
			if(currentRoom!=animatronicStates[1].currentRoom || feedopen == false) {
				if(animatronicStates[1].currentRoomArray==0 && leftlighton==true) {
					updateAIState(1,1,false);
					return;
				} else {
					updateAIState(1,0,false);
					return;
				};
			};
			break;
		case 2:  // moving
			console.log("bunnytimer = "+bunnytimer);
			if((animatronicStates[0].currentRoomArray)==5) return;
			if(animatronicStates[1].currentRoomArray==0) {
				updateAIState(1,3);
				return;
			};
//			if((Math.random()*100)<=bunnyChanceToMoveCloser[bunnydifficulty]){
			if(1==1){
				animatronicStates[1].currentRoomArray-=1
				console.log(roomClosenessBunny[animatronicStates[1].currentRoomArray].name);
				if((animatronicStates[1].currentRoomArray + 1)==6) {
                    if((animatronicStates[0].currentRoomArray)!=6){
						updateRoomState(roomClosenessBunny[animatronicStates[1].currentRoomArray+1].name,1);
                    } else {
						updateRoomState(roomClosenessBunny[animatronicStates[1].currentRoomArray+1].name,2);
                    };
				} else {
					updateRoomState(roomClosenessBunny[animatronicStates[1].currentRoomArray+1].name,0);
				};
				if(animatronicStates[1].currentRoomArray==4 || animatronicStates[1].currentRoomArray==5){
					if((Math.random()*100)<=20){
						updateRoomState(roomClosenessBunny[animatronicStates[1].currentRoomArray].name,2);
					} else {
						updateRoomState(roomClosenessBunny[animatronicStates[1].currentRoomArray].name,1);
					};
				} else {
					updateRoomState(roomClosenessBunny[animatronicStates[1].currentRoomArray].name,2);
				};
				animatronicStates[1].currentRoom=roomClosenessBunny[animatronicStates[1].currentRoomArray].name
				console.log("closer!");
				if(currentRoom!=animatronicStates[1].currentRoom || feedopen == false) {
					updateAIState(1,0);
				} else {
					updateAIState(1,1);
				};
				if(animatronicStates[1].currentRoom=="office") updateAIState(1,3);
			} else {
		//		updateAIPosition(1,1,roomClosenessBunny[currentBunnyRoomArray-1].name,1,0)
		//		updateRoomState(roomClosenessBunny[4].name,0);
				console.log("further!");
				if((animatronicStates[1].currentRoomArray)==6 || (animatronicStates[1].currentRoomArray)==5) {
				//	updateRoomState(roomClosenessBunny[animatronicStates[1].currentRoomArray+1].name,2);
				} else {
					animatronicStates[1].currentRoomArray+=1
					updateRoomState(roomClosenessBunny[animatronicStates[1].currentRoomArray-1].name,0);
					updateRoomState(roomClosenessBunny[animatronicStates[1].currentRoomArray].name,2);
					animatronicStates[1].currentRoom=roomClosenessBunny[animatronicStates[1].currentRoomArray].name
				};
				updateAIState(1,0);
			};
			break;
		case 3:  // at office door
			bunnytimer++;
			console.log("bunnytimer = "+bunnytimer);
			if(bunnytimer<=9 && leftlighton==true){
				updateAIState(1,1,false);
			};
			if(bunnytimer<=9 && leftdooropen==true){
			//	currentPower-=(0.775);
			} else if(bunnytimer>=9 && leftdooropen==false){
				updateAIState(1,4);
			} else if(bunnytimer>=10 && leftdooropen==true){
				updateAIState(1,0);
				updateRoomState(roomClosenessBunny[animatronicStates[1].currentRoomArray].name,2);
				animatronicStates[1].currentRoomArray=4
				updateRoomState(roomClosenessBunny[animatronicStates[1].currentRoomArray].name,2);
				animatronicStates[1].currentRoom=roomClosenessBunny[animatronicStates[1].currentRoomArray].name
				console.log("returning to room 1b");
			};
			break;
		case 4:  // dead
			playfreddygameoveranimation("bonny");
			updateAIState(1,1);
			break;
		default:
	}
};

function updateChicaAI() {
	switch(animatronicStates[0].state) {
		case 0:  // unseen
		//	if(animatronicStates[1].currentRoom=="1b") return;
			chicatimer++;
			console.log("chicatimer = "+chicatimer);
			if(animatronicStates[0].currentRoomArray==0) {
				if(leftlighton==true) {
					updateAIState(0,1,false);
				} else {
					updateAIState(0,3,false);
					return;
				};
			};
			if(chicatimer>=chicadifficultyarray[chicadifficulty]){
			//	updateRoomState(roomname,state,timeout);
			//	animatronicStates[1].state=2;
				updateAIState(0,2);
			}
			break;
		case 1:  // seen
			if(currentRoom!=animatronicStates[0].currentRoom || feedopen == false) {
				if(animatronicStates[0].currentRoomArray==0 && rightlighton==true) {
					updateAIState(0,1,false);
					return;
				} else {
					updateAIState(0,0,false);
					return;
				};
			};
			break;
		case 2:  // moving
			console.log("chicatimer = "+chicatimer);
		//	if((animatronicStates[1].currentRoomArray)==5) return;
			if(animatronicStates[0].currentRoomArray==0) {
				updateAIState(0,3);
				return;
			};
//			if((Math.random()*100)<=chicaChanceToMoveCloser[chicadifficulty]){
			if(1==1){
		//		updateAIPosition(1,1,roomClosenessBunny[3].name,1,0)
				animatronicStates[0].currentRoomArray-=1
				console.log(roomClosenessChica[animatronicStates[0].currentRoomArray].name);
				if((animatronicStates[0].currentRoomArray + 1)==6) {
                    if((animatronicStates[1].currentRoomArray)!=5){
						updateRoomState(roomClosenessChica[animatronicStates[0].currentRoomArray+1].name,1);
                    } else {
						updateRoomState(roomClosenessChica[animatronicStates[0].currentRoomArray+1].name,1);
						animatronicStates[0].currentRoomArray-=1
						updateRoomState(roomClosenessChica[animatronicStates[0].currentRoomArray+2].name,3);
                    };
				//} else {
				//	updateRoomState(roomClosenessChica[animatronicStates[1].currentRoomArray+1].name,0);
				};
				if(animatronicStates[0].currentRoomArray==5){
					if((Math.random()*100)<=20){
						updateRoomState(roomClosenessChica[animatronicStates[0].currentRoomArray].name,4);
                    } else {
						updateRoomState(roomClosenessChica[animatronicStates[0].currentRoomArray].name,3);
					};
				} else if(animatronicStates[0].currentRoomArray==4){
					if((Math.random()*100)<=20){
						updateRoomState(roomClosenessChica[animatronicStates[0].currentRoomArray].name,2);
                    } else {
						updateRoomState(roomClosenessChica[animatronicStates[0].currentRoomArray].name,1);
                    };   
                } else {
					updateRoomState(roomClosenessChica[animatronicStates[0].currentRoomArray].name,2);
				};
				animatronicStates[0].currentRoom=roomClosenessChica[animatronicStates[0].currentRoomArray].name
				console.log("closer!");
				if(currentRoom!=animatronicStates[0].currentRoom || feedopen == false) {
					updateAIState(0,0);
				} else {
					updateAIState(0,1);
				};
				if(animatronicStates[0].currentRoom=="office") updateAIState(0,3);
			} else {
		//		updateAIPosition(1,1,roomClosenessBunny[currentBunnyRoomArray-1].name,1,0)
		//		updateRoomState(roomClosenessBunny[4].name,0);
				console.log("further!");
				if((animatronicStates[0].currentRoomArray)==6 || (animatronicStates[0].currentRoomArray)==5) {
				//	updateRoomState(roomClosenessBunny[animatronicStates[1].currentRoomArray+1].name,2);
				} else {
					animatronicStates[0].currentRoomArray+=1
					updateRoomState(roomClosenessChica[animatronicStates[0].currentRoomArray-1].name,0);
					updateRoomState(roomClosenessChica[animatronicStates[0].currentRoomArray].name,2);
					animatronicStates[0].currentRoom=roomClosenessChica[animatronicStates[0].currentRoomArray].name
				};
				updateAIState(1,0);
			};
			break;
		case 3:  // at office door
			chicatimer++;
			console.log("chicatimer = "+chicatimer);
			if(chicatimer<=9 && leftlighton==true){
				updateAIState(1,1,false);
			};
			if(chicatimer<=9 && rightdooropen==true){
			//	currentPower-=(0.775);
			} else if(chicatimer>=9 && rightdooropen==false){
				updateAIState(0,4);
			} else if(chicatimer>=10 && rightdooropen==true){
				updateAIState(0,0);
				updateRoomState(roomClosenessChica[animatronicStates[0].currentRoomArray].name,2);
				animatronicStates[0].currentRoomArray=4
				updateRoomState(roomClosenessChica[animatronicStates[0].currentRoomArray].name,2);
				animatronicStates[0].currentRoom=roomClosenessChica[animatronicStates[0].currentRoomArray].name
				console.log("returning to room 1b");
			};
			break;
		case 4:  // dead
			playfreddygameoveranimation("bonny");
			updateAIState(0,1);
			break;
		default:
	}
};

function updateFoxxyAI() {
	switch(animatronicStates[3].state) {
		case 0: 
			foxxytimer++;
			if(foxxytimer>=foxydifficultyarray[foxydifficulty]){
				updateAIState(3,1);
				playSound("pirate_song2.wav",0.01);
			}
			break;
		case 1: 
			foxxytimer++;
			if(foxxytimer>=foxydifficultyarray[foxydifficulty]){
				updateAIState(3,2);
				playSound("pirate_song2.wav",0.01);
			};
			break;
		case 2: 
			foxxytimer++;
			if(foxxytimer>=foxydifficultyarray[foxydifficulty]){
				updateAIState(3,3);
				playSound("pirate_song2.wav",0.01);
			}
			break;
		case 3: 
			foxxytimer++;
			if(foxxytimer>=6 && leftdooropen==false){
				if(feedopen==true){
					OpenCloseFeed();
				};
				playfoxxyofficeanimation();
			} else if(foxxytimer<5 && leftdooropen==true){
				updateAIState(3,4);
			};
			break;
		case 4: 
			foxxytimer++;
			if(foxxytimer<=9 && leftdooropen==true){
				currentPower-=(0.775);
			} else if(foxxytimer<=9 && leftdooropen==false){
				playfoxxyofficeanimation();
			} else if(foxxytimer>=10 && leftdooropen==true){
				updateAIState(3,0);
			};
			break;
		default:
	}
};