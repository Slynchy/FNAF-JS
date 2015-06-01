//
// FNAF-JS
// Five Night's at Freddy's - JavaScript
//
// Original game by Scott Cawthon
//
// Ported by Sam 'Slynch' Lynch
//
// For legality's sake, it is necessary to say that you may not monetize this code
// without my express permission. This also works the other way around; I cannot 
// monetize this port without the original developer's permission.
//
// Last updated - 11/05/2015 @ 23:20

assertButtons();
var cachedbody = document.getElementById("alldahtml").innerHTML;

function mainThread() {
	if(currentPower>0) {
		updatePowerPercent();
		updatePowerUsage();
	}
    updateTime();
	if(currentRoom=="1c" && feedopen == true && animatronicStates[3].state<3) {
		foxxytimer=0;
	};
	updateBunnyAI();
	updateChicaAI();
	updateFoxxyAI();
	if(DEBUG_MODE==true) debugInfo();
	if(currentRoom=="2a" && animatronicStates[3].state!==3 && play2aanimation==false && animatronicStates[1].currentRoom!="2a") {
		play2aanimation=true;
		setTimeout(function(){
			play2aanimation=false;
			},445);
		playroomanimation("2a",Math.random());
	};
};

function loadgame2() {
	loadgame();
};

function newgame() {
	foxydifficulty = 3;
	bunnydifficulty = 9;
	chicadifficulty = 5;
	stopSound();
	localStorage["fnaf-js-savegame.night"]="1";
	document.getElementById("newgamebg").style.display="block";
	document.getElementById("newgamebg").style.opacity="0";
	$("#newgamebg").animate({
		opacity: "1"
	},1000,function(){
		eval('setTimeout(function(){loadroomImages();loadEverythingElse();},5000)');
	});
};

function loadgame() {
	night = localStorage["fnaf-js-savegame.night"];
	switch(night){
		case "1":
			foxydifficulty = 8;
			bunnydifficulty = 9;
			chicadifficulty = 6;
		break;
		case "2":
			foxydifficulty = 10;
			bunnydifficulty = 12;
			chicadifficulty = 9;
		break;
		case "3":
			foxydifficulty = 12;
			bunnydifficulty = 15;
			chicadifficulty = 12;
		break;
		case "4":
			foxydifficulty = 14;
			bunnydifficulty = 18;
			chicadifficulty = 15;
		break;
		case "5":
			foxydifficulty = 16;
			bunnydifficulty = 20;
			chicadifficulty = 18;
		break;
		case "6":
			foxydifficulty = 20;
			bunnydifficulty = 20;
			chicadifficulty = 20;
		break;
	};
	stopSound();
	loadroomImages();
	loadEverythingElse();
	if(DEBUG_MODE==true) debugdiv.style.display="block";
};

hours[0] = 12;
for(x=1;x<7;x++){
	hours[x] = x;
};

function updateAIPosition(AIID,AIstate,newroom,roomstate,oldroomstate){
	if(!AIID){
		debuglog("updateAIPosition(AI ID, AI new state, AI new room, new room state, old room state");
		return;
	};
	if(DEBUG_MODE) debuglog("updateRoomState("+animatronicStates[AIID].currentRoom+","+oldroomstate+")");
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
	if((typeof AIID)=="undefined"){
		debuglog("updateAIState:\nAIID - ID of the AI to update\nstate - What state to set it to\nnewroom - What room to change to\nroomID - I don't fucking know, the ID of the room but I don't know what it is used for.");
		return;
	};
	if(state=="") state = 0;//parseInt(state);
	if((typeof updatetimer)=="undefined") updatetimer = true;
    if(newroom=="") debuglog("No new room specified, expect errors if unintended");
	
	switch(AIID) {
		case 0:// chica
			animatronicStates[0].state=state;
			if(updatetimer==true) chicatimer=0;
            break;
		case 1: //Bunny
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
	
	debuglog("AI "+animatronicStates[AIID].name+" state updated to "+state);
	return; 
};

var updateRoomState = function(roomname,state){
	if(state=="") state = 0//parseInt(state);
	if((typeof roomname) != "string") return debuglog("Room name not a string!");
	
	switch(roomname) {
		case "1a":
			currRoomStates[0].roomstate=state;
			if(currentRoom == roomname) {
				updateRoomStateStatic(2500);
				updatecurrentRoom("1a");
			};
			break;
		case "1b":
			currRoomStates[1].roomstate=state;
			if(currentRoom == roomname) {
				updateRoomStateStatic(2500);
				updatecurrentRoom("1b");
			};
			break;
		case "1c":
			currRoomStates[2].roomstate=state;
			if(currentRoom == roomname) {
				updateRoomStateStatic(2500);
				updatecurrentRoom("1c");
			};
			
			break;
		case "2a":
			currRoomStates[3].roomstate=state;
			if(currentRoom == roomname) {
				updateRoomStateStatic(2500); 
				updatecurrentRoom("2a");
			};
			break;
		case "2b":
			currRoomStates[4].roomstate=state;
			if(currentRoom == roomname) {
				updateRoomStateStatic(2500); 
				updatecurrentRoom("2b");
			};
			break;
		case "5":
			currRoomStates[5].roomstate=state;
			if(currentRoom == roomname) {
				updateRoomStateStatic(2500); 
				updatecurrentRoom("5");
			};
			break;
		case "3":
			currRoomStates[7].roomstate=state;
			if(currentRoom == roomname) {
				updateRoomStateStatic(2500); 
				updatecurrentRoom("3");
			};
			break;
		case "7":
			currRoomStates[6].roomstate=state;
			if(currentRoom == roomname) {
				updateRoomStateStatic(2500); 
				updatecurrentRoom("7");
			};
			break;
		case "4a":
			currRoomStates[8].roomstate=state;
			if(currentRoom == roomname) {
				updateRoomStateStatic(2500); 
				updatecurrentRoom("4a");
			};
			break;
		case "4b":
			currRoomStates[9].roomstate=state;
			if(currentRoom == roomname) {
				updateRoomStateStatic(2500); 
				updatecurrentRoom("4b");
			};
			break;
		case "6":
			currRoomStates[10].roomstate=state;
			if(currentRoom == roomname) {
				updateRoomStateStatic(2500); 
				updatecurrentRoom("6");
			};
			break;
		case "office":
			currRoomStates[7].roomstate=state;
			break;
		default:
			debuglog("Invalid or no room name given!");
			return;
	}
	
	debuglog("Camera "+roomname+" updated to state "+state);
	return ;
};

var leftornot = 0
var leftpos="-=300px"
var staticanim=[];
var randomcheck=1

function updatecurrentRoom(roomparameter) {
	if(roomparameter=="") return debuglog("updatecurrentRoom() error - No parameter given");
	
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
	document.getElementById("roomname").src=roomnameimages[currentroomstatetoset2].src
	if(currentroomstatetoset== -1) return debuglog("updatecurrentRoom() error - Invalid parameter given");
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
	if(currentRoom==animatronicStates[0].currentRoom && feedopen == true) {
		if(animatronicStates[0].state==2){
			return;
		} else {
			updateAIState(0,1,false);
		};
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
    	numberonediv.attr("src","graphics/rooms/office/cameraposition.webp");
    	numbertwodiv.attr("src","graphics/rooms/office/cameraposition.webp");
	} else if(currentPower<10) {
        numberonediv.attr("src",powerusagenumbersimage[digit1].src);
    	numbertwodiv.attr("src","graphics/rooms/office/cameraposition.webp");
	} else if (currentPower<100) {
        numberonediv.attr("src",powerusagenumbersimage[digit1].src);
		numbertwodiv.attr("src",powerusagenumbersimage[digit2].src);
    	numberthreediv.attr("src","graphics/rooms/office/cameraposition.webp");
    };
};

function updatePowerUsage() {
	powerusagediv.attr("src","graphics/camera/power"+(currentPowerUsage+1)+".png");
	if(currentPower<=0) gameoverPowerFailure();
}

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
		endnight();
    };
};

function endnight() {
	clearInterval(mainThreadID);
	timer.stop();
	document.getElementById("mainmenu").style.display="none";
	document.getElementById("timekeeper").style.display="none";
	document.getElementById("openclosecamera").style.display="none";
	document.getElementById("power").style.display="none";
	document.getElementById("body").style.display="none";
	document.getElementById("nightover").style.display="block";
	document.getElementById("nightoveram").style.top="80px";
	document.getElementById("nightover5").style.top="80px";
	document.getElementById("nightover6").style.top="20px";
	
    // Update savegame-------------------------------------------------
	parsednight = parseInt(localStorage["fnaf-js-savegame.night"]); // To int so I can add 1
	parsednight+=1;													// Add 1
	parsednight = parsednight.toString();							// Back to a string (not actually needed but meh)
	localStorage["fnaf-js-savegame.night"]=parsednight;				// Set savegame
	debuglog("Night won! Set night in saved game to: "+localStorage["fnaf-js-savegame.night"]);
    // Update savegame-------------------------------------------------
    
	playSound("chimes 2.wav");
	stopAmbientSound();
	
	setTimeout(function(){
		nightover5div.animate({top: "140px"}, 6000, "linear",function() {
		// Animation complete.
		});
		nightover6div.animate({top: "80px"}, 6000, "linear",playSound("CROWD_SMALL_CHIL_EC049202.wav"));
	},1500);
	setTimeout(function(){
		document.getElementById("nightover").style.display="none";
		document.getElementById("gameoverstaticimg").play();
		document.getElementById("mainmenustaticimg").style.display="block";
		mainmenu();
	},10000);
};

function recordTick() {
		recorddiv.toggle();
	if(showrecord==true) {
		showrecord=false;
	}
	else {
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
			playSound("XSCREAM.wav",0.05);
			for(x=0;x<22;x++){
				eval('setTimeout(function(){document.getElementById("officemain").style.backgroundImage="url("+bonnyanimationgameover['+x+'].src+")";},(45*'+x+'));');
			};
			setTimeout(function(){gameoverstatic();},275);
			break;
		default:
		case "chica":
			document.getElementById("fan").style.display="none";
			document.getElementById("doorright").style.display="none";
			document.getElementById("doorleft").style.display="none";
			playSound("XSCREAM.wav",0.05);
			for(x=0;x<16;x++){
				eval('setTimeout(function(){document.getElementById("officemain").style.backgroundImage="url("+chicaanimationgameover['+x+'].src+")";},(45*'+x+'));');
			};
			setTimeout(function(){gameoverstatic();},275);
			break;
	};
	clearInterval(mainThreadID);
};

function gameoverstatic(){
	setTimeout(function(){
		stopSound();
		stopAmbientSound();
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
    //debugdiv.style.display="none";
	document.getElementById("mainmenu").style.display="block";
	if(localStorage["fnaf-js-savegame.night"]!="1") document.getElementById("continuebutton").style.display="block";
	playSound("static2.wav",0.3,true);
	clearInterval(mainmenuanimInterval1);
	mainmenuanimInterval1 = setInterval(function(){
		rand=Math.random();
		if(rand>0.8) {
			for(x=0;x<(6);x++){
				eval('setTimeout(function(){mainmenufazbearanimdiv.attr("src",mainmenufazbear['+(x & 3)+'].src);},(65*(Math.abs('+x+'+1))));');
			};
		}
		else if(rand<0.8 && rand>0.6) {
			for(x=0;x<(7);x++){
				eval('setTimeout(function(){mainmenufazbearanimdiv.attr("src",mainmenufazbear['+(x & 2)+'].src);},(45*(Math.abs('+x+'+1))));');
			};
		} else if(rand<0.6 && rand>0.4) {
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
    stopAmbientSound();
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
	original = 'setTimeout(function(){document.getElementById("officemain").style.backgroundImage="url("+poweroutimg[1].src+")"},(450*5))'
	part1 = 'setTimeout(function(){document.getElementById("officemain").style.backgroundImage="url("+poweroutimg[';
	part2 = '].src+")"},(450*';
	part3 = '))';
	duration = ((Math.random()*100)*0.66);
	delay = (duration*0.2);
	console.log(duration);
	setTimeout(function(){
        playSound("freddy/poweroutmusic.ogg");
		for(x=1;x<duration;x++){ // The most stupid solution to a simple issue.
			eval(part1+(x & 1)+part2+x+part3); 
		};						 // Sadly the only one that worked.
    },1000*delay);
	setTimeout(function(){
		stopSound();
		stopSound("freddy/poweroutmusic.ogg");
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
	document.getElementById("officemain").style.backgroundImage="url('graphics/rooms/office/0.webp')";
	document.getElementById("doorbuttonsleft").style.display="block";
	document.getElementById("doorbuttonsright").style.display="block";
	document.getElementById("doorright").style.display="block";
	document.getElementById("doorleft").style.display="block";
	document.getElementById("officecameraleft").style.display="block";
	document.getElementById("officecameraright").style.display="block";
	document.getElementById("mainmenustaticimg").style.display="block";
	setVariables();
};

function introduction(){
	$('#amduatlogo').animate({
		opacity: 1
	},1000,function(){
		setTimeout(function(){
			eval('$("#amduatlogo").animate({opacity: 0},1000,function(){setTimeout(mainmenu,2000);});')
		}, 3000);
	});
};

if(!DEBUG_MODE) {setTimeout(introduction,1650);} else {mainmenu();};