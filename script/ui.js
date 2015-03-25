var roomdiv = $("#room");
var staticdiv = $("#static");
var staticimgdiv = document.getElementById("staticimg");
var recorddiv = $("#record");
var doorleftdiv = $("#doorleft");
var doorrightdiv = $("#doorright");
var doorbuttonsleftdiv = $("#doorbuttonsleft");
var doorbuttonsrightdiv = $("#doorbuttonsright");
var doorbuttonsleft_lightdiv = $("#doorbuttonsleft_light");
var doorbuttonsleft_doordiv = $("#doorbuttonsleft_door");
var doorbuttonsright_doordiv = $("#doorbuttonsright_door");
var doorbuttonsright_lightdiv = $("#doorbuttonsright_light");
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
var leftdooropen=false;
var rightdooropen=false;
var leftlighton=false;
var rightlighton=false;
var yArray = ["left","right"];

var doorleftanim = [];
var doorrightanim = [];
var powerusageimage = [];

var officelightstates = [];
var officestates = [];
var buttonleftstates = [];
var buttonrightstates = [];
for(x=0;x<1;x++){
	officestates[x] = new Image();
	officestates[x].src = "graphics/rooms/office/"+x+".png";
};
for(x=0;x<(officestates.length);x++){
	for(y=0;y<2;y++){
		if(!officelightstates[x]) officelightstates[x] = [];
		officelightstates[x][y] = new Image();
		officelightstates[x][y].src = "graphics/rooms/office/"+x+"_light"+yArray[y]+".png";
	};
};
for(x=1;x<3;x++){
	buttonleftstates[x] = new Image();
	buttonleftstates[x].src = "graphics/rooms/office/buttons/buttonleft_"+x+".png";
};
for(x=1;x<3;x++){
	buttonrightstates[x] = new Image();
	buttonrightstates[x].src = "graphics/rooms/office/buttons/buttonright_"+x+".png";
};
for(x=0;x<14;x++){
	doorrightanim[x] = new Image();
	doorrightanim[x].src = "graphics/rooms/office/doors/right/"+x+".png";
	doorleftanim[x] = new Image();
	doorleftanim[x].src = "graphics/rooms/office/doors/left/"+x+".png";
};
for(x=1;x<6;x++){
	powerusageimage[x] = new Image();
	powerusageimage[x].src = "graphics/camera/power"+x+".png";
};




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
    if(staticimgdiv.paused==false){
    	staticimgdiv.play();
    }
    else {
    	staticimgdiv.pause();
    };
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
		if(officeX>=380) {document.getElementById("officecameraright").style.display="none";return;};
		document.getElementById("officecameraleft").style.display="block";
		officeX=(officeX+10);
		document.getElementById("office").style.webkitTransform="translate(-"+officeX+"px)";
	//	console.log("Translated by +"+officeX);
	},10);
});
officecamerarightdiv.mouseleave(function(){
	clearInterval(officeXInterval);
});
officecameraleftdiv.mouseenter(function(){
	officeXOtherInterval = setInterval(function(){
		if(officeX==0) {document.getElementById("officecameraleft").style.display="none";return;};
		document.getElementById("officecameraright").style.display="block";
		officeX=(officeX-10);
		document.getElementById("office").style.webkitTransform="translate(-"+officeX+"px)";
	//	console.log("Translated by -"+officeX);
	},10);
});
officecameraleftdiv.mouseleave(function(){
	clearInterval(officeXOtherInterval);
});

doorbuttonsleft_lightdiv.click(function(){
	if(leftlighton==false && rightlighton==false) {
		officemaindiv.css("background-image", "url('"+officelightstates[0][1].src+"')");
		doorbuttonsleftdiv.css("background-image", "url('"+buttonleftstates[2].src+"')");
		leftlighton=true;
	}
	else if(rightlighton!==true) {
		officemaindiv.css("background-image", "url('"+officestates[0].src+"')");
		doorbuttonsleftdiv.css("background-image", "url('"+buttonleftstates[1].src+"')");
		leftlighton=false;
	};
});

doorbuttonsleft_doordiv.click(function(){
	if(leftdooropen==false) {
		playdooranimationleft(0);
		leftdooropen=true;
	}
	else {
		playdooranimationleft(1);
		leftdooropen=false;
	};
});

doorbuttonsright_doordiv.click(function(){
	if(rightdooropen==false) {
		playdooranimationright(0);
		rightdooropen=true;
	}
	else {
		playdooranimationright(1);
		rightdooropen=false;
	};
});

doorbuttonsright_lightdiv.click(function(){
	if(leftlighton==false && rightlighton==false) {
		officemaindiv.css("background-image", "url('"+officelightstates[0][0].src+"')");
		doorbuttonsrightdiv.css("background-image", "url('"+buttonrightstates[2].src+"')");
		rightlighton=true;
	}
	else if(leftlighton!==true) {
		officemaindiv.css("background-image", "url('"+officestates[0].src+"')");
		doorbuttonsrightdiv.css("background-image", "url('"+buttonrightstates[1].src+"')");
		rightlighton=false;
	};
});
// ==============================================END OF BUTTON EVENTS=======================================
function playdooranimationright(inReverse){
	if(inReverse==0) {
		for(x=0;x<(14);x++){
			eval('setTimeout(function(){doorrightdiv.attr("src",doorrightanim['+x+'].src);},(30*('+x+'+1)));')
		}
	}
	else if(inReverse==1) {
		for(x=13;x>=(0);x--){
			eval('setTimeout(function(){doorrightdiv.attr("src",doorrightanim['+x+'].src);},(20*(Math.abs('+x+'-13))));')
		}
	}
}

function playdooranimationleft(inReverse){
	if(inReverse==0) {
		for(x=0;x<(14);x++){
			/*setTimeout(function(){
				doorleftdiv.attr("src",doorleftanim[x].src);
			},(500*(x+1)));*/
			eval('setTimeout(function(){doorleftdiv.attr("src",doorleftanim['+x+'].src);},(30*('+x+'+1)));')
		}
	}
	else if(inReverse==1) {
		for(x=13;x>=(0);x--){
			/*setTimeout(function(){
				doorleftdiv.attr("src",doorleftanim[x].src);
			},(500*(x+1)));*/
			eval('setTimeout(function(){doorleftdiv.attr("src",doorleftanim['+x+'].src);},(20*(Math.abs('+x+'-13))));')
		}
	}
}

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