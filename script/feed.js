var currentRoom = "1a";
var animatestatic = 0;
// roomstates: 0 = default, 1 = different, etc.
var currRoomStates=[{name:"1a",roomstate:0}
];

var updateRoomState = function(roomname,state){
	if(state=="") state = 1//parseInt(state);
	if((typeof roomname) != "string") return console.log("Room name not a string!");
	
	switch(roomname) {
		case "1a":
			currRoomStates[0].roomstate=state;
			if(currentRoom = roomname) updateRoomStateStatic() //document.getElementById('static').style.opacity="1";
			switch(state) {
				case 1: // just freddy
					setTimeout(function(){
						document.getElementById('room').src="graphics/rooms/1a/"+state+".png";
					//	document.getElementById('static').style.opacity="0.25";
					}, 3000);
					break;
				case 2: // missing bunny
					setTimeout(function(){
						document.getElementById('room').src="graphics/rooms/1a/"+state+".png";
						document.getElementById('static').style.opacity="0.25";
					}, 3000);
					break;
				case 3: // missing chica
					setTimeout(function(){
						document.getElementById('room').src="graphics/rooms/1a/"+state+".png";
						document.getElementById('static').style.opacity="0.25";
					}, 3000);
					break;
				case 4: // just freddy looking at camera
					setTimeout(function(){
						document.getElementById('room').src="graphics/rooms/1a/"+state+".png";
						document.getElementById('static').style.opacity="0.25";
					}, 3000);
					break;
				case 5: // empty
					setTimeout(function(){
						document.getElementById('room').src="graphics/rooms/1a/"+state+".png";
						document.getElementById('static').style.opacity="0.25";
					}, 3000);
					break;
				default:
					alert("penis");
			}
			if(leftornot==0) document.getElementById('room').style.left="0";
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

for(x=1;x<9;x++){
	staticanim[0+x] = new Image();
	staticanim[0+x].src = "graphics/camera/static_"+x+".png";
}

function tick() {
	var randomchance = Math.floor(Math.random()*10)
	if(randomchance > 5) {
		if(currRoomStates[0].roomstate!==1){
			updateRoomState("1a",1);
		}
	}
}

function playanimation(path_to_file,speed,frames){
	if(path_to_file=="") return console.log("No file specified!");
	if(speed=="") speed = 50;
	if(frames=="") return console.log("No frame length specified!");
	for(x=1;x<(frames+1);x++){
		setTimeout(fuckthatimageup[x], (speed*x));
	}
}

function staticTick() {
  randomcheck++
  if(randomcheck>8) randomcheck=1;
  var elem = document.getElementById('staticimg');
  elem.src=staticanim[randomcheck].src;

  staticId = setTimeout('staticTick()', 20);
}

function updateRoomStateStatic(){
	//if((typeof opacitylevel)!=="string") opacitylevel=toString(opacitylevel);
	if(animatestatic==0) {
		animatestatic=1;
		$("#static").animate({
			opacity: 1
		},30,function(){
			animatestatic=2;
			setTimeout(function(){
				animatestatic=0;
				$("#static").animate({
					opacity: 0.25
				},1000,function(){
				});
			}, 3000)
		});
	}
}

function camerapositionTick() {
	$("#room").animate({
		left: leftpos,
	},6000,function(){
		if(leftornot==1) leftornot=0
		else leftornot=1;
		if(leftornot==0){leftpos = "-=300px"}
		else{leftpos = "+=300px"};
	});
}

var interruptId = 0;
var overlay = 0;

tick();
camerapositionTick();
staticTick();
var tickId = setInterval('tick()', 1000);
var animId = setInterval('camerapositionTick()', 7000);
