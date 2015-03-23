var currentRoom = "1a";
var animatestatic = 0;
// roomstates: 0 = default, 1 = different, etc.
var currRoomStates=[{name:"1a",roomstate:0},
{name:"1b",roomstate:0}
];

var animatronicStates = [{name:"Chica",currentRoom:"1a"},
{name:"Bonny",currentRoom:"1a"}
];

function searchForState(room){
    for (var i=0; i < currRoomStates.length; i++) {
        if (currRoomStates[i].name === room) {
            return currRoomStates[i].roomstate;
        }
    }
}

var updateRoomState = function(roomname,state){
	if(state=="") state = 1//parseInt(state);
	if((typeof roomname) != "string") return console.log("Room name not a string!");
	
	switch(roomname) {
		case "1a":
			currRoomStates[0].roomstate=state;
			if(currentRoom == roomname) updateRoomStateStatic() //document.getElementById('static').style.opacity="1";
			switch(state) {
				case 0: // normal
					setTimeout(function(){
						document.getElementById('room').src="graphics/rooms/1a/"+state+".png";
					}, 3000);
					break;
				case 1: // just freddy
					setTimeout(function(){
						document.getElementById('room').src="graphics/rooms/1a/"+state+".png";
					}, 3000);
					break;
				case 2: // missing bunny
					
					setTimeout(function(){
						document.getElementById('room').src="graphics/rooms/1a/"+state+".png";
					}, 3000);
					break;
				case 3: // missing chica
					setTimeout(function(){
						document.getElementById('room').src="graphics/rooms/1a/"+state+".png";
					}, 3000);
					break;
				case 4: // just freddy looking at camera
					setTimeout(function(){
						document.getElementById('room').src="graphics/rooms/1a/"+state+".png";
					}, 3000);
					break;
				case 5: // empty
					setTimeout(function(){
						document.getElementById('room').src="graphics/rooms/1a/"+state+".png";
					}, 3000);
					break;
				default:
					alert("penis");
			}
			if(leftornot==0) document.getElementById('room').style.left="0";
			break;
		case "1b":
			currRoomStates[1].roomstate=state;
			if(currentRoom == roomname) updateRoomStateStatic() //document.getElementById('static').style.opacity="1";
			switch(state) {
				case 0: // bonny
					setTimeout(function(){
						document.getElementById('room').src="graphics/rooms/1a/"+state+".png";
					}, 3000);
					break;
				default:
					alert("penis");
			}
			if(leftornot==0 && currentRoom==roomname) document.getElementById('room').style.left="0";
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
	currentroomstatetoset = searchForState(roomparameter);
	alert(currentroomstatetoset);
	if(currentroomstatetoset== -1) return console.log("updatecurrentRoom() error - Invalid parameter given");
	currentRoom=roomparameter;
	updateRoomStateStatic();
	document.getElementById('room').src="graphics/rooms/"+currentRoom+"/"+currRoomStates[currentroomstatetoset].roomstate+".png";
	if(currentRoom=="1b"){
		$("#room").stop;
		$("#room").css( "left", "0" )
	}
}

for(x=1;x<9;x++){
	staticanim[0+x] = new Image();
	staticanim[0+x].src = "graphics/camera/static_"+x+".png";
}

function tick() {
	var randomchance = Math.floor(Math.random()*10)
	if(randomchance > 7) {
		if(currRoomStates[0].roomstate==0){
//			updateRoomState("1a",2);
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
	if(currentRoom=="1b") return;
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

$('#button-1a').mouseenter(function(){
	if(this.id!==("button-"+currentRoom)){
		this.style.backgroundColor='#505050';
	}
	else this.style.backgroundColor='#107010';
});
$('#button-1a').mouseleave(function(){
	if(this.id!==("button-"+currentRoom)){
		this.style.backgroundColor='#303030';
	}
});
$('#button-1a').click(function(){
	if(currentRoom!=="1a"){
		updatecurrentRoom("1a");
	}
});

$('#button-1b').mouseenter(function(){
	if(this.id!==("button-"+currentRoom)){
		this.style.backgroundColor='#505050';
	}
	else this.style.backgroundColor='#107010';
});
$('#button-1b').mouseleave(function(){
	if(this.id!==("button-"+currentRoom)){
		this.style.backgroundColor='#303030';
	}
});
$('#button-1b').click(function(){
	if(currentRoom!=="1b"){
		this.style.backgroundColor='#107010';
		$('#button-1a').css("backgroundColor",'#101010');
		updatecurrentRoom("1b");
	}
});

var tickId = setInterval('tick()', 1000);
var animId = setInterval('camerapositionTick()', 7000);
