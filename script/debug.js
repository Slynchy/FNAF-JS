//
// debug.js
// The JS for debug stuff
//
// Last updated - 11/05/2015

var debugCSS = "background: #ADE1FF; color: #8E3504; border-radius: 5px;padding: 4px 4px;font-family: 'Courier New', Courier, monospace;font-weight: bold;";

debuglog("Initializing debug.js...");

var DEBUG_MODE = true;

var debugdiv = document.getElementById("debuginfo");

function debugInfo(){
	debugdiv.innerHTML = "Bonnie location: CAM-"+animatronicStates[1].currentRoom+"<br>";
	debugdiv.innerHTML += "Chica location: CAM-"+animatronicStates[0].currentRoom+"<br>";
	debugdiv.innerHTML += "Freddy location: CAM-"+animatronicStates[2].currentRoom+"<br>";
	debugdiv.innerHTML += "Foxxy state: "+animatronicStates[3].state;
};

if (DEBUG_MODE==true){
	$(document).ready(function() {
		$(document).bind('keydown',function(e){
		   if(e.keyCode == 88) {
		       playfreddygameoveranimation("freddyoffice");
		   };
		});
	});
	$(window).on("error",function(msg,url,linenumber) {
		sound.playSound("error.wav");
		alert("Error! "+msg+"\nURL: "+url+"\nAt line "+linenumber);
		return true;
	});
};

function debuglog(string,additional,additional2){
	if((typeof string) == "undefined"){
		return;
	};
	if(DEBUG_MODE==false) return;
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
