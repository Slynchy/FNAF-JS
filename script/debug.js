//
// debug.js
// The JS for debug stuff
//
// Last updated - 04/08/2015 @ 23:28

var debugCSS = "background: #ADE1FF; color: #8E3504; border-radius: 5px;padding: 4px 4px;font-family: 'Courier New', Courier, monospace;font-weight: bold;";

var DEBUG_MODE = false;

// OPTIONS = "HTML", "NW.JS"
var BUILD_TARGET = "HTML";

var greenworks;

if(BUILD_TARGET == "NW.JS"){
	debuglog("Initializing Greenworks...");
	greenworks = require('./greenworks');
	if(greenworks.initAPI()){
		debuglog('Steam API has been initalized.');
	} else {
		debuglog('Error on initializing Steam API.');
		Window.close();
	};
} else {
	debuglog('Skipping Steam auth...');
};


debuglog("Initializing debug.js...");

var debugdiv = document.getElementById("debuginfo");

function debugInfo(){
	debugdiv.innerHTML = "Chica location: CAM-"+roomClosenessChica[animatronicStates[0].currentRoomArray].name+"<br>";
	debugdiv.innerHTML += "Bonnie location: CAM-"+roomClosenessBunny[animatronicStates[1].currentRoomArray].name+"<br>";
	debugdiv.innerHTML += "Freddy location: CAM-"+roomClosenessFreddy[animatronicStates[2].currentRoomArray].name+"<br>";
	debugdiv.innerHTML += "Foxxy state: "+animatronicStates[3].state+"<br><br>";
	debugdiv.innerHTML += "Chica timer: "+chicatimer+" out of "+chicadifficultyarray[chicadifficulty]+"<br>";
	debugdiv.innerHTML += "Bonnie timer: "+bunnytimer+" out of "+bunnydifficultyarray[bunnydifficulty]+"<br>";
	debugdiv.innerHTML += "Freddy timer: "+freddytimer+" out of "+freddydifficultyarray[freddydifficulty]+"<br>";
	debugdiv.innerHTML += "Foxxy timer: "+foxxytimer+" out of "+foxydifficultyarray[foxydifficulty]+"<br>";
};

if (DEBUG_MODE==true){
	document.getElementById("debugmode").innerHTML = "DEBUG MODE";
	$(document).ready(function() {
		$(document).bind('keydown',function(e){
		   if(e.keyCode == 88) {
		       playfreddygameoveranimation("freddyoffice");
		   };
		});
	});
} else {
	$(window).on("error",function(msg,url,linenumber) {
		sound.playSound("error.wav");
		alert("Error! "+msg+"\nURL: "+url+"\nAt line "+linenumber);
		console.log(msg);
		console.log(msg);
		return true;
	});
};

function debuglog(string,additional,additional2){
	if(DEBUG_MODE==false) return;
	if((typeof string) == "undefined"){
		return;
	};
	cssString = "%c";
	if((typeof additional)=="undefined"){
		string = cssString.concat(string);
		return console.log(string,debugCSS);
	} else if(((typeof additional2)=="undefined") && additional){
		return console.log(string,additional);
	};
	console.log(string,additional,additional);
};

function printSave(){
	return console.log("Player is on night %s ",localStorage["fnaf-js-savegame.night"]);
};
