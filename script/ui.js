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

var windowwidth = $( document ).width();
window.onresize = function(event) {
    windowwidth = $( document ).width();
};

//var officeroomdiv = $("#officeroom");
var fandiv = $("#fan");
var officecamerarightdiv = $("#officecameraright");
var officecameraleftdiv = $("#officecameraleft");
var numberonediv = $("#numberone");
var numbertwodiv = $("#numbertwo");
var numberthreediv = $("#numberthree");
var timehourdiv = $("#timehour");
var timehourextradiv = $("#timehourextra");
var powerusagediv = $("#powerusage");
var camerafeedanimationdiv = $("#camerafeedanimation");
var officeX=0
var officeXInterval;
var officeXOtherInterval;
var leftdooropen=false;
var rightdooropen=false;
var leftlighton=false;
var rightlighton=false;
var yArray = ["left","right"];

var camerafeedanimationimage = [];
var doorleftanim = [];
var doorrightanim = [];
var powerusageimage = [];
var powerusagenumbersimage = [];
var timehourimage = [];
var room2aimage = [];

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
for(x=1;x<5;x++){
	buttonleftstates[x] = new Image();
	buttonleftstates[x].src = "graphics/rooms/office/buttons/buttonleft_"+x+".png";
};
for(x=1;x<5;x++){
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
for(x=0;x<10;x++){
	powerusagenumbersimage[x] = new Image();
	powerusagenumbersimage[x].src = "graphics/camera/ui/powernumbers/"+x+".png";
};
for(x=0;x<7;x++){
	timehourimage[x] = new Image();
	timehourimage[x].src = "graphics/camera/ui/time"+x+".png";
};
for(x=0;x<10;x++){
	camerafeedanimationimage[x] = new Image();
	camerafeedanimationimage[x].src = "graphics/camera/camerafeedanimation/"+x+".png";
};
for(x=0;x<2;x++){
	room2aimage[x] = new Image();
	room2aimage[x].src = "graphics/rooms/2a/"+x+".png";
};




var button1adiv = $("#button-1a");
var button1bdiv = $("#button-1b");
var button1cdiv = $("#button-1c");
var button2adiv = $("#button-2a");
var button2bdiv = $("#button-2b");
var button5div = $("#button-5");
var button7div = $("#button-7");
var buttonopenclosecameradiv = $("#openclosecamera");

function staticTick() {
  randomcheck++
  if(randomcheck>8) randomcheck=1;
//  var elem = document.getElementById('staticimg');
  staticimgdiv.src=staticanim[randomcheck].src;

  staticId = setTimeout('staticTick()', 30);
}

function OpenCloseFeed() {
	if(feedopen==false){
		setTimeout(function(){camerafeeddiv.toggle();officemaindiv.toggle();},360);
	}
	else {
		camerafeeddiv.toggle();
		officemaindiv.toggle();
	};
//	officediv.toggle();
//	officemaindiv.toggle();
//	officeroomdiv.toggle();
	fandiv.toggle();
	playcamerafeedanimation(feedopen);
    if(feedopen==false){
    	staticimgdiv.play();
    	feedopen=true;
        currentPowerUsage++;
        updatePowerUsage();
    }
    else {
    	staticimgdiv.pause();
    	feedopen=false;
        currentPowerUsage--;
        updatePowerUsage();
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

button2adiv.mouseenter(function(){
	if(this.id!==("button-"+currentRoom)){
		this.style.backgroundColor='#505050';
	}
	else this.style.backgroundColor='#107010';
});
button2adiv.mouseleave(function(){
	if(this.id!==("button-"+currentRoom)){
		this.style.backgroundColor='#101010';
	}
});
button2adiv.click(function(){
	if(currentRoom!=="2a"){
		this.style.backgroundColor='#107010';
		updatecurrentRoom("2a");
		resetCameraButtons(currentRoom);
	}
});

button2bdiv.mouseenter(function(){
	if(this.id!==("button-"+currentRoom)){
		this.style.backgroundColor='#505050';
	}
	else this.style.backgroundColor='#107010';
});
button2bdiv.mouseleave(function(){
	if(this.id!==("button-"+currentRoom)){
		this.style.backgroundColor='#101010';
	}
});
button2bdiv.click(function(){
	if(currentRoom!=="2b"){
		this.style.backgroundColor='#107010';
		updatecurrentRoom("2b");
		resetCameraButtons(currentRoom);
	}
});

button5div.mouseenter(function(){
	if(this.id!==("button-"+currentRoom)){
		this.style.backgroundColor='#505050';
	}
	else this.style.backgroundColor='#107010';
});
button5div.mouseleave(function(){
	if(this.id!==("button-"+currentRoom)){
		this.style.backgroundColor='#101010';
	}
});
button5div.click(function(){
	if(currentRoom!=="5"){
		this.style.backgroundColor='#107010';
		updatecurrentRoom("5");
		resetCameraButtons(currentRoom);
	}
});

button7div.mouseenter(function(){
	if(this.id!==("button-"+currentRoom)){
		this.style.backgroundColor='#505050';
	}
	else this.style.backgroundColor='#107010';
});
button7div.mouseleave(function(){
	if(this.id!==("button-"+currentRoom)){
		this.style.backgroundColor='#101010';
	}
});
button7div.click(function(){
	if(currentRoom!=="7"){
		this.style.backgroundColor='#107010';
		updatecurrentRoom("7");
		resetCameraButtons(currentRoom);
	}
});

buttonopenclosecameradiv.click(function(){
//	playcamerafeedanimation(feedopen);
	OpenCloseFeed();
});
officecamerarightdiv.mouseenter(function(){
	officeXInterval = setInterval(function(){//380
		if(officeX>=(windowwidth/5)) {document.getElementById("officecameraright").style.display="none";return;};
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
        currentPowerUsage++;
        updatePowerUsage();
	}
	else if(rightlighton!==true) {
		officemaindiv.css("background-image", "url('"+officestates[0].src+"')");
		doorbuttonsleftdiv.css("background-image", "url('"+buttonleftstates[1].src+"')");
		leftlighton=false;
        currentPowerUsage--;
        updatePowerUsage();
	};
});

doorbuttonsleft_doordiv.click(function(){
	if(leftdooropen==false) {
		playdooranimationleft(0);
		leftdooropen=true;
		if(leftlighton) {
			doorbuttonsleftdiv.css("background-image", "url('"+buttonleftstates[4].src+"')");
		}
		else {
			doorbuttonsleftdiv.css("background-image", "url('"+buttonleftstates[3].src+"')");
		};
        currentPowerUsage++;
        updatePowerUsage();
	}
	else {
		playdooranimationleft(1);
		leftdooropen=false;
		if(leftlighton) {
			doorbuttonsleftdiv.css("background-image", "url('"+buttonleftstates[2].src+"')");
		}
		else {
			doorbuttonsleftdiv.css("background-image", "url('"+buttonleftstates[1].src+"')");
		};
        currentPowerUsage--;
        updatePowerUsage();
	};
});

doorbuttonsright_doordiv.click(function(){
	if(rightdooropen==false) {
		playdooranimationright(0);
		rightdooropen=true;
		if(rightlighton) {
			doorbuttonsrightdiv.css("background-image", "url('"+buttonrightstates[4].src+"')");
		}
		else {
			doorbuttonsrightdiv.css("background-image", "url('"+buttonrightstates[3].src+"')");
		};
        currentPowerUsage++;
        updatePowerUsage();
	}
	else {
		playdooranimationright(1);
		rightdooropen=false;
		if(rightlighton) {
			doorbuttonsrightdiv.css("background-image", "url('"+buttonrightstates[2].src+"')");
		}
		else {
			doorbuttonsrightdiv.css("background-image", "url('"+buttonrightstates[1].src+"')");
		};
        currentPowerUsage--;
        updatePowerUsage();
	};
});

doorbuttonsright_lightdiv.click(function(){
	if(leftlighton==false && rightlighton==false) {
		officemaindiv.css("background-image", "url('"+officelightstates[0][0].src+"')");
		doorbuttonsrightdiv.css("background-image", "url('"+buttonrightstates[2].src+"')");
		rightlighton=true;
        currentPowerUsage++;
        updatePowerUsage();
	}
	else if(leftlighton!==true) {
		officemaindiv.css("background-image", "url('"+officestates[0].src+"')");
		doorbuttonsrightdiv.css("background-image", "url('"+buttonrightstates[1].src+"')");
		rightlighton=false;
        currentPowerUsage--;
        updatePowerUsage();
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

function playcamerafeedanimation(inReverse){
	if(inReverse==0) {
		camerafeedanimationdiv.css("display","block");
		for(x=0;x<(10);x++){
			eval('setTimeout(function(){camerafeedanimationdiv.attr("src",camerafeedanimationimage['+x+'].src);},(30*('+x+'+1)));')
			eval('setTimeout(function(){camerafeedanimationdiv.css("display","none");},(330));')
		}
	}
	else if(inReverse==1) {
		camerafeedanimationdiv.css("display","block");
		for(x=9;x>=(0);x--){
			eval('setTimeout(function(){camerafeedanimationdiv.attr("src",camerafeedanimationimage['+x+'].src);},(20*(Math.abs('+x+'-9))));')
			eval('setTimeout(function(){camerafeedanimationdiv.css("display","none");},(200));')
		}
	};
}

function playroomanimation(room,randomnumber){
	switch(room) {
		case "2a":
			for(x=0;x<(9);x++){
				if(randomnumber>0.5) {
					eval('setTimeout(function(){roomdiv.attr("src",room2aimage['+(x & 1)+'].src);},(45*(Math.abs('+x+'+1))));');
				}
				else {
					eval('setTimeout(function(){roomdiv.attr("src",room2aimage['+(x & 1)+'].src);},(15*(Math.abs('+x+'+1))));');
				}
			}
            break;
		default:
			alert("Invalid or no room name given!");
	}
};

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