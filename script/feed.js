var currentRoom = "1a";
var currentRoomID = 0;
var animatestatic = 0;
var showrecord = false;
var feedopen = true;
var fananim =[];
var currentPower = 100;
var currentPowerUsage = 0;

// roomstates: 0 = default, 1 = different, etc.
var currRoomStates=[{name:"1a",roomstate:0},
{name:"1b",roomstate:0},
{name:"1c",roomstate:0}
];

var rooms=[{name:"1a",movingcamera:true,leftadjustment:0},
{name:"1b",movingcamera:false,leftadjustment:0},
{name:"1c",movingcamera:false,leftadjustment:350}
];

function updateAIPosition(AIID,AIstate,newroom,roomstate,oldroomstate){
    updateRoomState(animatronicStates[AIID].currentRoom,oldroomstate,1); //old room
	updateAIState(AIID,AIstate,newroom);
    console.log(animatronicStates[AIID].currentRoom);
    updateRoomState(newroom,roomstate); //new room
}

var animatronicStates = [{name:"Chica",currentRoom:"1a",state:0},
                         {name:"Bonnie",currentRoom:"1a",state:0},
                         {name:"Freddy",currentRoom:"1a",state:0}
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

var updateAIState = function(AIID,state,newroom,roomID){
	if(state=="") state = 1;//parseInt(state);
//    console.log(typeof roomID);
//	if((typeof roomID) != "number") return console.log("Room name not an integer!");
    if(newroom!=="") animatronicStates[AIID].currentRoom = newroom;
    if(newroom!=="") animatronicStates[AIID].state = state;
	
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
	currentRoom=roomparameter;
	currentroomstatetoset = 0
	currentroomstatetoset = searchForState(roomparameter);
	currentroomstatetoset2 = searchForRoomID(roomparameter);
	if(currentroomstatetoset== -1) return console.log("updatecurrentRoom() error - Invalid parameter given");
	currentRoomID=searchForRoomID(roomparameter)
	updateRoomStateStatic(175);
	roomdiv.attr("src","graphics/rooms/"+currentRoom+"/"+currRoomStates[currentroomstatetoset2].roomstate+".png");
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
}
/*
for(x=1;x<9;x++){
	staticanim[0+x] = new Image();
	staticanim[0+x].src = "graphics/camera/static_"+x+".png";
}*/
for(x=1;x<4;x++){
	fananim[0+x] = new Image();
	fananim[0+x].src = "graphics/rooms/office/fan_"+x+".png";
}

function mainThread() {
//	tick();
//	camerapositionTick();
//	staticTick();
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

//mainThread();
document.getElementById("body").style.display="block";
//camerapositionTick();
var mainThreadID = setInterval('mainThread()', 1000);
//var fananimThreadID = setInterval('playanimation("graphics/rooms/office/fan",900,3,"fan")', 905);
//var cameraanimId = setInterval('camerapositionTick()', 8500);
var recordanimId; //= setInterval('recordTick()', 1000);
//playanimation("graphics/rooms/office/fan",900,3,"fan");
//var fananimation = setInterval("setDivImgFan()",180);
var timer = $.timer(function() {
    setDivImgFan()
}, 180, true);
