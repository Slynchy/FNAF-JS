var roomdiv = $("#room");
var staticdiv = $("#static");
var staticimgdiv = $("#staticimg");
var recorddiv = $("#record");
var camerafeeddiv = $("#camerafeed");
//var officediv = $("#office");
var officemaindiv = $("#officemain");
//var officeroomdiv = $("#officeroom");
var fandiv = $("#fan");
var officecamerarightdiv = $("#officecameraright");
var officecameraleftdiv = $("#officecameraleft");
var officeX=0
var officeXInterval;
var officeXOtherInterval;

var button1adiv = $("#button-1a");
var button1bdiv = $("#button-1b");
var button1cdiv = $("#button-1c");
var buttonopenclosecameradiv = $("#openclosecamera");

function staticTick() {
  randomcheck++
  if(randomcheck>8) randomcheck=1;
//  var elem = document.getElementById('staticimg');
  staticimgdiv.src=staticanim[randomcheck].src;

  staticId = setTimeout('staticTick()', 30);
}

function OpenCloseFeed() {
	camerafeeddiv.toggle();
//	officediv.toggle();
	officemaindiv.toggle();
//	officeroomdiv.toggle();
	fandiv.toggle();
}

function updateRoomStateStatic(duration){
    if(duration=="") duration = 2000;
	if(animatestatic==0) {
		animatestatic=1;
		staticdiv.animate({
			opacity: 2
		},0,function(){
			animatestatic=2;
			setTimeout(function(){
				animatestatic=0;
				staticdiv.animate({
					opacity: 0.25
				},1000,function(){
				});
			}, duration)
		});
	}
}

function camerapositionTick() {
	//element.style.webkitTransform = "rotate(-2deg)";
	if(rooms[currentRoomID].movingcamera!==false){
		roomdiv.animate({
			left: leftpos,
		},6000,function(){
			if(leftornot==1) leftornot=0
			else leftornot=1;
			if(leftornot==0){leftpos = "-=300px"}
			else{leftpos = "+=300px"};
		});
	}
}

// ==============================================BUTTON EVENTS==============================================
button1adiv.mouseenter(function(){
	if(this.id!==("button-"+currentRoom)){
		this.style.backgroundColor='#505050';
	}
	else this.style.backgroundColor='#107010';
});
button1adiv.mouseleave(function(){
	if(this.id!==("button-"+currentRoom)){
		this.style.backgroundColor='#101010';
	}
});
button1adiv.click(function(){
	if(currentRoom!=="1a"){
		this.style.backgroundColor='#107010';
		updatecurrentRoom("1a");
		resetCameraButtons(currentRoom);
	}
});

button1bdiv.mouseenter(function(){
	if(this.id!==("button-"+currentRoom)){
		this.style.backgroundColor='#505050';
	}
	else this.style.backgroundColor='#107010';
});
button1bdiv.mouseleave(function(){
	if(this.id!==("button-"+currentRoom)){
		this.style.backgroundColor='#101010';
	}
});
button1bdiv.click(function(){
	if(currentRoom!=="1b"){
		this.style.backgroundColor='#107010';
		updatecurrentRoom("1b");
		resetCameraButtons(currentRoom);
	}
});

button1cdiv.mouseenter(function(){
	if(this.id!==("button-"+currentRoom)){
		this.style.backgroundColor='#505050';
	}
	else this.style.backgroundColor='#107010';
});
button1cdiv.mouseleave(function(){
	if(this.id!==("button-"+currentRoom)){
		this.style.backgroundColor='#101010';
	}
});
button1cdiv.click(function(){
	if(currentRoom!=="1c"){
		this.style.backgroundColor='#107010';
		updatecurrentRoom("1c");
		resetCameraButtons(currentRoom);
	}
});

buttonopenclosecameradiv.click(function(){
	OpenCloseFeed();
});
officecamerarightdiv.mouseenter(function(){
	officeXInterval = setInterval(function(){
		if(officeX>=420) return;
		officeX=(officeX+20);
		document.getElementById("office").style.webkitTransform="translate(-"+officeX+"px)";
		console.log("Translated by +"+officeX);
	},10);
});
officecamerarightdiv.mouseleave(function(){
	clearInterval(officeXInterval);
});
officecameraleftdiv.mouseenter(function(){
	officeXOtherInterval = setInterval(function(){
		if(officeX==0) return;
		officeX=(officeX-20);
		document.getElementById("office").style.webkitTransform="translate(-"+officeX+"px)";
		console.log("Translated by -"+officeX);
	},10);
});
officecameraleftdiv.mouseleave(function(){
	clearInterval(officeXOtherInterval);
});
// ==============================================END OF BUTTON EVENTS=======================================

function resetCameraButtons(current){
	for(x=0;x<rooms.length;x++){
		if(rooms[x].name!==current){
			eval("button"+rooms[x].name+"div.css('backgroundColor','#101010');");
		}
	}
}
/*
function readMouseMove(e){
	mousePosition = [];
	mousePosition[0] = e.clientX;
	mousePosition[1] = e.clientY;
	return mousePosition;
}
document.onmousemove = readMouseMove;
window.screen.availHeight
*/