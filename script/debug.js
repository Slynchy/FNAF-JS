//
// debug.js
// The JS for debug stuff
//
// Last updated - 11/05/2015

var DEBUG_MODE = true;

var debugdiv = document.getElementById("debuginfo");

function debugInfo(){
	debugdiv.innerHTML = "Bonnie location: CAM-"+animatronicStates[1].currentRoom+"<br>";
	debugdiv.innerHTML += "Chica location: CAM-"+animatronicStates[0].currentRoom+"<br>";
	debugdiv.innerHTML += "Foxxy state: "+animatronicStates[3].state;
};

if (DEBUG_MODE==true){
	$(document).ready(function() {
		$(document).bind('keydown',function(e){
		   if(e.keyCode == 88) {
		       playfreddygameoveranimation("chica");
		   };
		});
	});
	$(window).on("error",function(msg,url,linenumber) {
		playSound("error.wav");
		alert("Error! "+msg+"\nURL: "+url+"\nAt line "+linenumber);
		return true;
	});
};

function debuglog(string,additional,additional2){
	if((typeof string) == "undefined"){
		return;
	};
	if(DEBUG_MODE==false) return;
	if((typeof additional)=="undefined"){
		return console.log(string);
	} else if(((typeof additional2)=="undefined") && additional){
		return console.log(string,additional);
	};
	console.log(string,additional,additional);
};

function printSave(){
	return console.log("Player is on night %s ",localStorage["fnaf-js-savegame.night"]);
};