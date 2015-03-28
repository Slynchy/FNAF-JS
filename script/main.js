//
// FNAF-JS
// Five Night's at Freddy's - JavaScript
//
// Original game by Scott Cawthon
//
// Ported by Sam 'Slynch' Lynch
//
// Last updated - 27/03/2015 @ 12:28pm

function loadgame() {
	loadroomImages();
	loadEverythingElse();
	//mainThread();
	document.getElementById("body").style.display="block";
	//camerapositionTick();
	var mainThreadID = setInterval('mainThread()', 1000);
	foxxytimeout=setTimeout(function(){
		updateAIState(3,1);
	},5000);
	var recordanimId = setInterval('recordTick()', 1000);
	var timer = $.timer(function() {
	   setDivImgFan()
	}, 180, true);
};

hours[0] = 12;
for(x=1;x<7;x++){
	hours[x] = x;
};

// roomstates: 0 = default, 1 = different, etc.
var currRoomStates=[{name:"1a",roomstate:0},
                    {name:"1b",roomstate:0},
{name:"1c",roomstate:0},
{name:"2a",roomstate:0},
{name:"2b",roomstate:0},
{name:"5",roomstate:0,AIStates:[1,2]},
{name:"7",roomstate:0}
];

var rooms=[{name:"1a",movingcamera:true,leftadjustment:0},
{name:"1b",movingcamera:false,leftadjustment:0},
{name:"1c",movingcamera:false,leftadjustment:350},
{name:"2a",movingcamera:false,leftadjustment:300},
{name:"2b",movingcamera:false,leftadjustment:150},
{name:"5",movingcamera:false,leftadjustment:150},
{name:"7",movingcamera:false,leftadjustment:250}
];

function updateAIPosition(AIID,AIstate,newroom,roomstate,oldroomstate){
    updateRoomState(animatronicStates[AIID].currentRoom,oldroomstate,1); //old room
	updateAIState(AIID,AIstate,newroom);
    console.log(animatronicStates[AIID].currentRoom);
    updateRoomState(newroom,roomstate); //new room
}

var animatronicStates = [{name:"Chica",currentRoom:"1a",state:0},
                         {name:"Bonnie",currentRoom:"1a",state:0},
                         {name:"Freddy",currentRoom:"1a",state:0},
                         {name:"Foxxy",currentRoom:"1c",state:0}
						];

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

function updateAIState(AIID,state,newroom,roomID){
	if(!AIID){
		console.log("updateAIState:\nAIID - ID of the AI to update\nstate - What state to set it to\nnewroom - What room to change to\nroomID - I don't fucking know, the ID of the room but I don't know what it is used for.");
		return;
	};
	if(state=="") state = 0;//parseInt(state);
//    console.log(typeof roomID);
//	if((typeof roomID) != "number") return console.log("Room name not an integer!");
    if(newroom!=="") console.log("No new room specified, expect errors if unintended");//animatronicStates[AIID].currentRoom = newroom;
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
            animatronicStates[AIID].currentRoom = newroom;
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
	
	return console.log("AI "+animatronicStates[AIID].name+" state updated");
};

var updateRoomState = function(roomname,state,timeout){
    if(timeout=="") timeout=3000;
	if(state=="") state = 1//parseInt(state);
	if((typeof roomname) != "string") return console.log("Room name not a string!");
	
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
					alert("penis");
			}
			if(leftornot==0) roomdiv.css("left","0");
			break;
		case "1b":
			currRoomStates[1].roomstate=state;
			if(currentRoom == roomname) updateRoomStateStatic() //document.getElementById('static').style.opacity="1";
			switch(state) {
				case 0: // bonny
					setTimeout(function(){
						roomdiv.src="graphics/rooms/1a/"+state+".png";
					}, 3000);
					break;
				default:
					alert("penis");
			}
			if(leftornot==0 && currentRoom==roomname) roomdiv.css("left","0");
			break;
		case "1c":
			currRoomStates[2].roomstate=state;
			if(currentRoom == roomname) updateRoomStateStatic() //document.getElementById('static').style.opacity="1";
			if(currentRoom == roomname) roomdiv.attr("src","graphics/rooms/1c/"+currRoomStates[2].roomstate+".png");
			if(leftornot==0 && currentRoom==roomname) roomdiv.css("left","0");
			break;
		case "5":
			currRoomStates[5].roomstate=state;
			if(currentRoom == roomname) updateRoomStateStatic(4000); //document.getElementById('static').style.opacity="1";
			switch(state) {
				case 0: // empty
					setTimeout(function(){
						roomdiv.attr("src","graphics/rooms/5/"+currRoomStates[5].roomstate+".png");
					}, 3000);
					break;
				case 1: // bonny
					setTimeout(function(){
						roomdiv.attr("src","graphics/rooms/5/"+currRoomStates[5].roomstate+".png");
					}, 3000);
					break;
				default:
					alert("penis");
			}
			if(leftornot==0 && currentRoom==roomname) roomdiv.css("left","0");
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
//	if(animatestatic>0) return console.log("updatecurrentRoom() error - Playing animation, aborting");
	currentRoom=roomparameter;
	currentroomstatetoset = 0
	currentroomstatetoset = searchForState(roomparameter);
	currentroomstatetoset2 = searchForRoomID(roomparameter);
	if(currentroomstatetoset== -1) return console.log("updatecurrentRoom() error - Invalid parameter given");
	currentRoomID=searchForRoomID(roomparameter)
	updateRoomStateStatic(175);
	roomdiv.attr("src",roomImages[currentRoomID][currRoomStates[currentroomstatetoset2].roomstate].src);    //"graphics/rooms/"+currentRoom+"/"+currRoomStates[currentroomstatetoset2].roomstate+".png");
	roomdiv.css("left","0");
	if(rooms[currentRoomID].leftadjustment!==0){
		roomdiv.css("left","-="+rooms[currentRoomID].leftadjustment);
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
		setTimeout(playFoxxyRunningAnimation,800);
	};
}
for(x=1;x<4;x++){
	fananim[0+x] = new Image();
	fananim[0+x].src = "graphics/rooms/office/fan_"+x+".png";
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
}

function updateFoxxyAI() {
	switch(animatronicStates[3].state) {
		case 0: 
			break;
		case 1: 
			foxxytimer++;
			if(foxxytimer==5){
				updateAIState(3,2);
			}
			break;
		case 2: 
			foxxytimer++;
			if(foxxytimer==5){
				updateAIState(3,3);
			}
			break;
		case 3: 
			break;
		case 4: 
			break;
		default:
	}
}

function mainThread() {
    updatePowerPercent();
    updatePowerUsage();
    updateTime();
	updateFoxxyAI();
    if(currentRoom=="2a" && animatronicStates[3].state!==3) {
		playroomanimation("2a",Math.random());
	};
}

function updateTime() {
    timeCounter++;
    if(timeCounter==85) {
    	timeCounter=0;
        currenthour++;
    }
    if(currenthour>0){
		timehourextradiv.attr("src",timehourimage[currenthour].src);
        document.getElementById("timehour").style.display="none"
    }
    else {
    };
}

function recordTick() {
//	if($("#record").css("display")=="block") {
	if(showrecord==true) {
		recorddiv.css("left", '-=9999px');
		showrecord=false;
	}
	else {
		recorddiv.css("left", '+=9999px');
		showrecord=true;
	};
}

function setDivImgFan(){
//	document.getElementById(elementID).src=pathtofile+"_"+frame2+".png"
	setTimeout(function(){
		fandiv.attr("src",fananim[1].src);
	},60);
	setTimeout(function(){
		fandiv.attr("src",fananim[2].src);
	},120);
	setTimeout(function(){
		fandiv.attr("src",fananim[3].src);
	},180);
};

function playFoxxyRunningAnimation(){
	for(x=0;x<31;x++){
		eval('foxxyrunninganimationtimeout[x] = setTimeout(function(){roomdiv.attr("src",room2afoxxyanim['+x+'].src);},(35*'+x+'));');
	};
	setTimeout(function(){
		foxxyrunning=false;
		animatronicStates[3].state=4;
		},(3350));
};

loadgame();