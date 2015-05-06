//
// debug.js
// The JS for debug stuff
//
// Last updated - 06/05/2015

var debugdiv = document.getElementById("debuginfo");

function debugInfo(){
	debugdiv.innerHTML = "Bonnie location: CAM-"+animatronicStates[1].currentRoom+"<br>";
	debugdiv.innerHTML += "Chica location: CAM-"+animatronicStates[0].currentRoom+"<br>";
	debugdiv.innerHTML += "Foxxy state: "+animatronicStates[3].state;
};