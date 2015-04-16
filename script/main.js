//
// FNAF-JS
// Five Night's at Freddy's - JavaScript
//
// Original game by Scott Cawthon
//
// Ported by Sam 'Slynch' Lynch
//
// Last updated - 10/04/2015 @ 01:53am 

var DEBUG_MODE = true;

// set storage
// localStorage["fnaf-js-savegame"] = "testicles";

//get storage
//console.log(localStorage["fnaf-js-savegame"]);;
var debugdiv = document.getElementById("debuginfo");
if(DEBUG_MODE==true) debugdiv.style.display="block";
assertButtons();
foxydifficulty = 19;
bunnydifficulty = 20;
var cachedbody = document.getElementById("alldahtml").innerHTML;

function debugShit(){
	debugdiv.innerHTML = "Bonnie location: CAM-"+animatronicStates[1].currentRoom+"<br>";
	debugdiv.innerHTML += "Foxxy state: "+animatronicStates[3].state;
//	debugdiv.innerHTML += "Foxxy state: "+animatronicStates[3].state+"<br>";
};

function mainThread() {
	if(currentPower>0) {
		updatePowerPercent();
		updatePowerUsage();
	}
    updateTime();
	if(currentRoom=="1c" && feedopen == true) {
		foxxytimer=0;
	};
	updateBunnyAI();
//	updateFoxxyAI();
	if(DEBUG_MODE==true) debugShit();
	if(currentRoom=="2a" && animatronicStates[3].state!==3 && play2aanimation==false && animatronicStates[1].currentRoom!="2a") {
		play2aanimation=true;
		setTimeout(function(){
			play2aanimation=false;
			},445);
		playroomanimation("2a",Math.random());
	};
};

ShowAudioChannels=function(){for(x=1;x<=4;x++){if(audiochannels[x].paused==false){console.log("Audio channel "+x+" is playing: "+audiochannels[x].src);} else {console.log("Audio channel "+x+" is not playing.");}};return;};

function playSound(src,volume,channelnumber){
	if(DEBUG_MODE) return;
	if((typeof channelnumber)=="undefined") {
	
	};
	if((typeof volume)=="undefined") {
		volume=0.2;
	};
	if((typeof src)=="undefined") {
		return console.log("playSound() error - no sound specified");
	};
	for(x=1;x<=4;x++){
		if(audiochannels[x].paused==true){
			audiochannels[x].src=("sounds/"+src);
			audiochannels[x].volume=volume;
			return console.log("Channel "+x+" now playing "+src);
		};
	};
	console.log("No channels available!");
};

function stopSound(channelnumber){
	if((typeof channelnumber)=="undefined") {
		console.log("stopSound() error - no channel number specified");
		console.log("Proceeding to stop all sound...");
		for(x=1;x<=4;x++){
			if(audiochannels[x].paused==false){
				audiochannels[x].pause();
				audiochannelambient.pause();
				return console.log("Channel "+x+" is paused/stopped");
			};
		};
		return;
	};
	return audiochannels[channelnumber].paused=true;
};

function loadgame2() {
	loadgame();
};

function loadgame() {
	stopSound();
	loadroomImages();
	loadEverythingElse();
};

hours[0] = 12;
for(x=1;x<7;x++){
	hours[x] = x;
};

function updateAIPosition(AIID,AIstate,newroom,roomstate,oldroomstate){
	if(!AIID){
		console.log("updateAIPosition(AI ID, AI new state, AI new room, new room state, old room state");
		return;
	};
	console.log("updateRoomState("+animatronicStates[AIID].currentRoom+","+oldroomstate+")");
    updateRoomState(animatronicStates[AIID].currentRoom,oldroomstate,1); //old room
	updateAIState(AIID,AIstate,newroom);
    updateRoomState(newroom,roomstate); //new room
}

function searchForState(room){
    for (var i=0; i < currRoomStates.length; i++) {
        if (currRoomStates[i].name === room) {
            return currRoomStates[i].roomstate;
        };
    };
};

function searchForRoomID(roomname){
    for (var i=0; i < currRoomStates.length; i++) {
        if (rooms[i].name === roomname) {
            return i;
        };
    };
};

function updateAIState(AIID,state,updatetimer,newroom,roomID){
	if(!AIID){
		console.log("updateAIState:\nAIID - ID of the AI to update\nstate - What state to set it to\nnewroom - What room to change to\nroomID - I don't fucking know, the ID of the room but I don't know what it is used for.");
		return;
	};
	if(state=="") state = 0;//parseInt(state);
	if((typeof updatetimer)=="undefined") updatetimer = true;//parseInt(state);
//    console.log(typeof roomID);
//	if((typeof roomID) != "number") return console.log("Room name not an integer!");
    if(newroom=="") console.log("No new room specified, expect errors if unintended");//animatronicStates[AIID].currentRoom = newroom;
   //  if(newroom!=="") animatronicStates[AIID].state = state;
	
	switch(AIID) {
		case 0:// chica
            switch(state) {
                case 0: //unseen
                    break;   
                case 1: //seen
                    break;
            }
            break;
		case 1: //Bunny
            switch(state) {
                case 0: //unseen
			//		animatronicStates[1].state = 0;
                    break;   
                case 1: //seen
			//		animatronicStates[1].state = 1;
                    break;
                case 2: //moving
			//		animatronicStates[1].state = 2;
                    break;
            }
			animatronicStates[AIID].state=state;
			if(updatetimer==true) bunnytimer=0;
            break;
		case 3: //Foxy
            switch(state) {
                case 0: // hiding
					updateRoomState("1c",0,1);
                    break;   
                case 1: // peeking round curtain
					updateRoomState("1c",1,1);
                    break;
                case 2: // visible
					updateRoomState("1c",2,1);
                    break;
                case 3: // OSHIT IT'S MISSING; IT'S ON ITS WAY
					updateRoomState("1c",3,1);
					foxxyrunning = true;
                    break;
                case 4: // damn bro you ded
                    break;
                case 5: // "Curses, foiled again! [bangs door in anger]"
                    break;
            }
			animatronicStates[AIID].state=state;
			foxxytimer=0;
			break;
		default:
			alert("Invalid or no room name given!");
	}
	
	return console.log("AI "+animatronicStates[AIID].name+" state updated to "+state);
};

var updateRoomState = function(roomname,state,timeout){
    if(timeout=="") timeout=1;
	if(state=="") state = 0//parseInt(state);
	if((typeof roomname) != "string") return console.log("Room name not a string!");
	
	console.log("Updating room state of "+roomname+" to state "+state);
	
	switch(roomname) {
		case "1a":
			currRoomStates[0].roomstate=state;
			if(currentRoom == roomname && state == currRoomStates[0].roomstate) updateRoomStateStatic(); //document.getElementById('static').style.opacity="1";
			switch(state) {
				case 0: // normal
                    if(currentRoom == roomname){
                        setTimeout(function(){
                            roomdiv.attr("src","graphics/rooms/1a/"+state+".png");
                        }, timeout);
                    };
					break;
				case 1: // just freddy
                    if(currentRoom == roomname){
                        setTimeout(function(){
                            roomdiv.attr("src","graphics/rooms/1a/"+state+".png");
                        }, timeout);
                    }
					break;
				case 2: // missing bunny
                    if(currentRoom == roomname){
                        setTimeout(function(){
                            roomdiv.attr("src","graphics/rooms/1a/"+state+".png");
                        }, timeout);
                    };
					break;
				case 3: // missing chica
                    if(currentRoom == roomname){
                        setTimeout(function(){
                            roomdiv.attr("src","graphics/rooms/1a/"+state+".png");
                        }, timeout);
                    };
					break;
				case 4: // just freddy looking at camera
                    if(currentRoom == roomname){
                        setTimeout(function(){
                            roomdiv.attr("src","graphics/rooms/1a/"+state+".png");
                        }, timeout);
                    }
					break;
				case 5: // empty
                    if(currentRoom == roomname){
                        setTimeout(function(){
                            roomdiv.attr("src","graphics/rooms/1a/"+state+".png");
                        }, timeout);
                    }
					break;
				default:
					console.log("Not updating room 1a; not a valid state!");
			}
			if(leftornot==0) roomdiv.css("left","0");
			break;
		case "1b":
			currRoomStates[1].roomstate=state;
			if(currentRoom == roomname) {
				updateRoomStateStatic(2500) //document.getElementById('static').style.opacity="1";
			};
			switch(state) {
				case 0: // bonny
					setTimeout(function(){
					//	roomdiv.src="graphics/rooms/1b/"+state+".png";
//						roomdiv.attr("src",roomImages[1][0].src);
					}, 1);
					break;
				case 1: // bonny
					setTimeout(function(){
					//	roomdiv.src="graphics/rooms/1b/"+state+".png";
	//					roomdiv.attr("src",roomImages[1][1].src);
					}, 1);
					break;
				default:
					console.log("Not updating room 1b; not a valid state!");
			}
			if(currentRoom == roomname) {
				updatecurrentRoom("1b");
			};
			if(leftornot==0 && currentRoom==roomname) roomdiv.css("left","0");
			break;
		case "1c":
			currRoomStates[2].roomstate=state;
			if(currentRoom == roomname) updateRoomStateStatic() //document.getElementById('static').style.opacity="1";
			if(currentRoom == roomname) roomdiv.attr("src","graphics/rooms/1c/"+currRoomStates[2].roomstate+".png");
			if(leftornot==0 && currentRoom==roomname) roomdiv.css("left","0");
			if(rooms[currentRoomID].leftadjustment!==0){
				roomdiv.css("left","0%");
				roomdiv.css("left","-"+rooms[currentRoomID].leftadjustment+"%");
			};
			break;
		case "2a":
			currRoomStates[3].roomstate=state;
			if(currentRoom == roomname) {
				updateRoomStateStatic(3000); //document.getElementById('static').style.opacity="1";
		//		return;
			};
			switch(state) {
				case 0: // empty
			//		setTimeout(function(){
				//		roomdiv.attr("src","graphics/rooms/5/0.png");
		//		}, 1);
					break;
				case 2: // bonny
					setTimeout(function(){
			//			roomdiv.attr("src","graphics/rooms/5/2.png");
					}, 1);
					break;
				default:
					console.log("Not updating room 5; not a valid state!");
			}
			if(currentRoom == "2a") {
				updatecurrentRoom("2a");
			};
			if(leftornot==0 && currentRoom==roomname) roomdiv.css("left","0");
			break;
		case "2b":
			currRoomStates[4].roomstate=state;
			if(currentRoom == roomname) {
				updateRoomStateStatic(3000); //document.getElementById('static').style.opacity="1";
	//			return;
			};
			switch(state) {
				case 0: // normal
					break;
				case 1: // bonny
					setTimeout(function(){
			//			roomdiv.attr("src",roomImages[4][1].src);
					}, 1);
					break;
				default:
					console.log("Not updating room 2b; not a valid state!");
			}
			if(currentRoom == "2b") {
				updatecurrentRoom("2b");
			};
			if(leftornot==0 && currentRoom==roomname) roomdiv.css("left","0");
			break;
		case "5":
			currRoomStates[5].roomstate=state;
			if(currentRoom == roomname) {
				updateRoomStateStatic(3000); //document.getElementById('static').style.opacity="1";
		//		return;
			};
			switch(state) {
				case 0: // empty
					setTimeout(function(){
			//			roomdiv.attr("src","graphics/rooms/5/"+currRoomStates[5].roomstate+".png");
					}, 1);
					break;
				case 2: // bonny
					setTimeout(function(){
		//				roomdiv.attr("src","graphics/rooms/5/"+currRoomStates[5].roomstate+".png");
					}, 1);
					break;
				default:
					console.log("Not updating room 5; not a valid state!");
			}
			if(currentRoom == "5") {
				updatecurrentRoom("5");
			};
			if(leftornot==0 && currentRoom==roomname) roomdiv.css("left","0");
			break;
		case "3":
			currRoomStates[7].roomstate=state;
			if(currentRoom == roomname) {
				updateRoomStateStatic(2500); //document.getElementById('static').style.opacity="1";
	//			return;
			};
			switch(state) {
				case 0: // normal
					break;
				case 1: // bonny
					setTimeout(function(){
			//			roomdiv.attr("src",roomImages[4][1].src);
					}, 1);
					break;
				default:
					console.log("Not updating room 3; not a valid state!");
			}
			if(currentRoom == "3") {
				updatecurrentRoom("3");
			};
			break;
		case "office":
			currRoomStates[7].roomstate=state;
//			if(currentRoom == roomname) updateRoomStateStatic(4000); //document.getElementById('static').style.opacity="1";
			switch(state) {
				case 0: // normal
					setTimeout(function(){
		//				officemaindiv.css("background-image","url("+officestates[0].src+")");
					}, timeout);
					break;
				case 1: // bonny
					setTimeout(function(){
			//			officemaindiv.css("background-image","url("+officelightstates[1][0].src+")");
					}, timeout);
					break;
				case 2: // chica
					setTimeout(function(){
			//			officemaindiv.css("background-image","url("+officelightstates[2][1].src+")");
					}, timeout);
					break;
				default:
					console.log("Not updating room office; not a valid state!");
			}
			break;
		default:
			alert("Invalid or no room name given!");
	}
	
	return console.log("Camera "+roomname+" updated");
};

var leftornot = 0
var leftpos="-=300px"
var staticanim=[];
var randomcheck=1

function updatecurrentRoom(roomparameter) {
	if(roomparameter=="") return console.log("updatecurrentRoom() error - No parameter given");
	
	// COMMENCE HACKY FIX FOR ROOM ANIMATION LEAKING TO NEXT ROOM, WILL NEED TO REUSE LATER
	if(play2aanimation==true){
		setTimeout(function(){
			eval("button"+roomparameter+"div.click();");
			},450);
		return;
	};
	// END 
	
	playSound("blip3.wav",0.5);
	currentRoom=roomparameter;
	currentroomstatetoset = 0
	currentroomstatetoset = searchForState(roomparameter);
	currentroomstatetoset2 = searchForRoomID(roomparameter);
	if(currentroomstatetoset== -1) return console.log("updatecurrentRoom() error - Invalid parameter given");
	currentRoomID=searchForRoomID(roomparameter)
	if(roomparameter!="6"){
		updateRoomStateStatic(175);
		roomdiv.attr("src",roomImages[currentRoomID][currRoomStates[currentroomstatetoset2].roomstate].src);    //"graphics/rooms/"+currentRoom+"/"+currRoomStates[currentroomstatetoset2].roomstate+".png");
		document.getElementById("cameradisabled").style.display = "none";
	} else {
		document.getElementById("static").style.opacity = "2";
		document.getElementById("cameradisabled").style.display = "block";
	};
	roomdiv.css("left","0");
	if(rooms[currentRoomID].leftadjustment!==0){
//		roomdiv.css("left","-"+rooms[currentRoomID].leftadjustment+"%");
	};
	if(rooms[currentRoomID].movingcamera==false){
		roomdiv.removeClass("roomtest");
	}
	else {
		roomdiv.addClass("roomtest");
	};
	if(currentRoom!=="2a") {
		for(x=0;x<31;x++){
			clearTimeout(foxxyrunninganimationtimeout[x]);
		};
	}
	else if(foxxyrunning==true && currentRoom=="2a"){
		setTimeout(playFoxxyRunningAnimation,600);
	};
	if(currentRoom==animatronicStates[1].currentRoom && feedopen == true) {
		updateAIState(1,1,false);
	};
}

function updatePowerPercent() {
	switch(currentPowerUsage) {
				case 0: 
					currentPower-=(0.141);
					break;
				case 1: 
					currentPower-=(0.235);
					break;
				case 2: 
					currentPower-=(0.341);
					break;
				case 3: 
					currentPower-=(0.447);
					break;
				case 4: 
					currentPower-=(0.553);
					break;
				default:
	};
    var digit1 = currentPower.toString()[0];
    var digit2 = currentPower.toString()[1];
    var digit3 = currentPower.toString()[2];
    digit1 = parseInt(digit1);
    digit2 = parseInt(digit2);
    digit3 = parseInt(digit3);
	if (currentPower<=0){
    	numberonediv.attr("src","graphics/rooms/office/cameraposition.png");
    	numbertwodiv.attr("src","graphics/rooms/office/cameraposition.png");
	} else if(currentPower<10) {
        numberonediv.attr("src",powerusagenumbersimage[digit1].src);
    	numbertwodiv.attr("src","graphics/rooms/office/cameraposition.png");
	} else if (currentPower<100) {
        numberonediv.attr("src",powerusagenumbersimage[digit1].src);
		numbertwodiv.attr("src",powerusagenumbersimage[digit2].src);
    	numberthreediv.attr("src","graphics/rooms/office/cameraposition.png");
    };
}

function updatePowerUsage() {
	powerusagediv.attr("src","graphics/camera/power"+(currentPowerUsage+1)+".png");
	if(currentPower<=0) gameoverPowerFailure();
}

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
			if(animatronicStates[1].currentRoomArray==0) {
				updateAIState(1,3);
				return;
			};
			if((Math.random()*100)<=bunnyChanceToMoveCloser[bunnydifficulty]){
		//		updateAIPosition(1,1,roomClosenessBunny[3].name,1,0)
				animatronicStates[1].currentRoomArray-=1
				console.log(roomClosenessBunny[animatronicStates[1].currentRoomArray].name);
				if((animatronicStates[1].currentRoomArray + 1)==6) {
					updateRoomState(roomClosenessBunny[animatronicStates[1].currentRoomArray+1].name,2);
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
			}
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
			if(foxxytimer>=5 && leftdooropen==false){
				if(feedopen=false){
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

function updateTime() {
    timeCounter++;
    if(timeCounter==85) {
    	timeCounter=0;
        currenthour++;
    }
    if(currenthour>0 && currenthour<6){
		timehourextradiv.attr("src",timehourimage[currenthour].src);
        document.getElementById("timehour").style.display="none"
    }
    else if(currenthour==6){
		
    };
}

function recordTick() {
//	if($("#record").css("display")=="block") {9px');
		recorddiv.toggle();
	if(showrecord==true) {
//		recorddiv.css("left", '-=999
		showrecord=false;
	}
	else {
//		recorddiv.css("left", '+=9999px');
		showrecord=true;
	};
}

function setDivImgFan(){
//	document.getElementById(elementID).src=pathtofile+"_"+frame2+".png"
	setTimeout(function(){
		fandiv.attr("src",fananim[1].src);
	},30);
	setTimeout(function(){
		fandiv.attr("src",fananim[2].src);
	},60);
	setTimeout(function(){
		fandiv.attr("src",fananim[3].src);
	},90);
};

function playfoxxyofficeanimation(){
	if(feedopen==true) {
		OpenCloseFeed();
	};
	document.getElementById("officecameraleft").style.display="none";
	document.getElementById("officecameraright").style.display="none";
	document.getElementById("openclosecamera").style.display="none";
	document.getElementById("doorleft").style.display="none";
	playSound("XSCREAM.wav",0.05);
	for(x=0;x<21;x++){
	//	eval('foxxyofficeanimtimeout[x] = setTimeout(function(){officemaindiv.css("background-image",foxxyofficeanim['+x+'].src);},(35*'+x+'));');
		eval('foxxyofficeanimtimeout[x] = setTimeout(function(){document.getElementById("officemain").style.backgroundImage="url("+foxxyofficeanim['+x+'].src+")";},(35*'+x+'));');
		
	};
	clearInterval(mainThreadID);
	setTimeout(function(){
		gameoverstatic();
		},(2350));
};

function playfreddygameoveranimation(animatronic){
	if((typeof animatronic)=="undefined") animatronic="freddy";
	switch(animatronic) {
		case "freddy":
			document.getElementById("officemain").style.backgroundImage="none";
			document.getElementById("doorbuttonsleft").style.display="none";
			document.getElementById("doorbuttonsright").style.display="none";
			document.getElementById("doorright").style.display="none";
			document.getElementById("doorleft").style.display="none";
			document.getElementById("officecameraleft").style.display="none";
			document.getElementById("officecameraright").style.display="none";
			document.getElementById("openclosecamera").style.display="none";
			playSound("XSCREAM.wav",0.05);
			for(x=0;x<20;x++){
				eval('setTimeout(function(){document.getElementById("officemain").style.backgroundImage="url("+freddyanimationgameover['+x+'].src+")";},(45*'+x+'));');
			};
			gameoverstatic();
			break;
		case "bonny":
			document.getElementById("fan").style.display="none";
			document.getElementById("doorright").style.display="none";
			document.getElementById("doorleft").style.display="none";
			for(x=0;x<22;x++){
				eval('setTimeout(function(){document.getElementById("officemain").style.backgroundImage="url("+bonnyanimationgameover['+x+'].src+")";},(45*'+x+'));');
			};
			setTimeout(function(){gameoverstatic();},275);
			break;
		default:
	};
	clearInterval(mainThreadID);
};

function gameoverstatic(){
	setTimeout(function(){
		stopSound();
		document.getElementById("gameoverstaticimg").style.display="block";
		document.getElementById("gameoverstaticimg").play();
		gameover();
	},900);
};

function playpoweroutageanimation(duration){
	if(duration=="") duration = 60;
	document.getElementById("openclosecamera").style.display="none";
	document.getElementById("fan").style.display="none";
	document.getElementById("officemain").style.backgroundImage="url("+poweroutimg[0].src+")";
	for(x=0;x<60;x++){
		eval('setTimeout(function(){document.getElementById("officemain").style.backgroundImage="url("+poweroutimg['+(x & 1)+'].src+")";},(105*'+x+'));');
	};
	clearInterval(mainThreadID);
};

function playFoxxyRunningAnimation(){
	playSound("run.wav");
	for(x=0;x<31;x++){
		eval('foxxyrunninganimationtimeout[x] = setTimeout(function(){roomdiv.attr("src",room2afoxxyanim['+x+'].src);},(35*'+x+'));');
	};
	setTimeout(function(){
		foxxyrunning=false;
		if(leftdooropen==true) playSound("knock2.wav",1);
			animatronicStates[3].state=4;
		},(3350));
};

function mainmenu(){
	document.getElementById("amduatlogo").style.display="none";
	document.getElementById("mainmenu").style.display="block";
	if(typeof localStorage["fnaf-js-savegame"]!="undefined") document.getElementById("continuebutton").style.display="block";
	playSound("static2.wav");
	clearInterval(mainmenuanimInterval1);
	mainmenuanimInterval1 = setInterval(function(){
		penis=Math.random();
		if(penis>0.8) {
			for(x=0;x<(6);x++){
				eval('setTimeout(function(){mainmenufazbearanimdiv.attr("src",mainmenufazbear['+(x & 3)+'].src);},(65*(Math.abs('+x+'+1))));');
			};
		}
		else if(penis<0.8 && penis>0.6) {
			for(x=0;x<(7);x++){
				eval('setTimeout(function(){mainmenufazbearanimdiv.attr("src",mainmenufazbear['+(x & 2)+'].src);},(45*(Math.abs('+x+'+1))));');
			};
		} else if(penis<0.6 && penis>0.4) {
			for(x=0;x<(7);x++){
				eval('setTimeout(function(){mainmenufazbearanimdiv.attr("src",mainmenufazbear['+(x & 1)+'].src);},(25*(Math.abs('+x+'+1))));');
			};
		} else {
			mainmenufazbearanimdiv.attr("src",mainmenufazbear[0].src)
		};
	},1000);
};

function gameoverPowerFailure(){
	clearInterval(mainThreadID);
	playSound("powerdown.wav");
	if(feedopen==true) {
		OpenCloseFeed();
	};
	if(rightdooropen==true) {
		playdooranimationright(1);
	};
	if(leftdooropen==true) {
		playdooranimationleft(1);
	};
	timer.stop();
	document.getElementById("fan").style.display="none";
	document.getElementById("timekeeper").style.display="none";
	document.getElementById("power").style.display="none";
	document.getElementById("doorbuttonsleft").style.display="none";
	document.getElementById("doorbuttonsright").style.display="none";
	document.getElementById("openclosecamera").style.display="none";
	document.getElementById("officemain").style.backgroundImage="url("+poweroutimg[0].src+")";
	testpenisdick = 'setTimeout(function(){document.getElementById("officemain").style.backgroundImage="url("+poweroutimg[1].src+")"},(450*5))'
	testpenisdick1 = 'setTimeout(function(){document.getElementById("officemain").style.backgroundImage="url("+poweroutimg[';
	testpenisdick2 = '].src+")"},(450*';
	testpenisdick3 = '))';
	console.log(testpenisdick1+testpenisdick2+testpenisdick3);
	duration = ((Math.random()*100)*0.66);
	console.log(duration);
	for(x=1;x<duration;x++){
		eval(testpenisdick1+(x & 1)+testpenisdick2+x+testpenisdick3);
	};
	setTimeout(function(){
//		gameover();
		stopSound();
		playfreddygameoveranimation();
	},470*duration);
};

function gameover(){
	setTimeout(function(){
		document.getElementById("gameoverstaticimg").pause();
		document.getElementById("mainmenustaticimg").style.display="none";
		document.getElementById("mainmenu").style.display="none";
		document.getElementById("timekeeper").style.display="none";
		document.getElementById("openclosecamera").style.display="none";
		document.getElementById("power").style.display="none";
		document.getElementById("body").style.display="none";
		document.getElementById("gameover").style.display="block";
		document.getElementById("gameover").style.opacity="0";
		$("#gameover").animate({
			opacity: "1"
		},2000,function(){
//			eval('setTimeout(function(){location.reload();},5000)');
			eval('setTimeout(function(){resetgame();mainmenu();},5000)');
		});
		$("#gameoverstaticimg").animate({
			opacity: "0"
		},2000);
	},8000);
};

function resetgame(){
	document.getElementById("gameoverstaticimg").style.display="none";
	document.getElementById("gameoverstaticimg").style.opacity="2";
	document.getElementById("gameover").style.display="none";
	document.getElementById("mainmenu").style.display="none";
	document.getElementById("officemain").style.backgroundImage="url('graphics/rooms/office/0.png')";
	document.getElementById("doorbuttonsleft").style.display="block";
	document.getElementById("doorbuttonsright").style.display="block";
	document.getElementById("doorright").style.display="block";
	document.getElementById("doorleft").style.display="block";
	document.getElementById("officecameraleft").style.display="block";
	document.getElementById("officecameraright").style.display="block";
	document.getElementById("mainmenustaticimg").style.display="block";
/*	currentPower = 100;
	currentPowerUsage = 0;
	currenthour = 0;*/
	setVariables();
};

function introduction(){
	$('#amduatlogo').animate({
		opacity: 1
	},1000,function(){
		setTimeout(function(){
			eval('$("#amduatlogo").animate({opacity: 0},1000,function(){setTimeout(mainmenu,2000);});')
		}, 2000);
	});
};

if(!DEBUG_MODE) {setTimeout(introduction,1650);} else {mainmenu();};