//
// ui.js
// The JS for handling UI changes and functions
//
// Last updated - 10/04/2015 @ 01:53am 

function staticTick() {
  randomcheck++
  if(randomcheck>8) randomcheck=1;
  staticimgdiv.src=staticanim[randomcheck].src;

  staticId = setTimeout('staticTick()', 30);
}

function updateselectedmenuitem(obj) {
	if(obj.id=="newbutton"){
		document.getElementById("selectedarrows").style.top="55.5%"
	} else if(obj.id=="continuebutton") {
		document.getElementById("selectedarrows").style.top="65.5%"
	};
}

function OpenCloseFeed() {
	if(feedopen==false){
		setTimeout(function(){camerafeeddiv.toggle();officemaindiv.toggle();playSound("CAMERA_VIDEO_LOA_60105303.wav");},360);
	}
	else {
		camerafeeddiv.toggle();
		officemaindiv.toggle();
		playSound("put_down.wav");
	};
	playcamerafeedanimation(feedopen);
	fandiv.toggle();
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
	if(currentRoom==animatronicStates[1].currentRoom) {
		updateAIState(1,1,false);
	};
}

function updateRoomStateStatic(duration){
    if(duration=="") duration = 500;
	animationduration = 250;
	animatestatic=1;
	staticdiv.animate({
		opacity: 2
	},0,function(){
		animatestatic=2;
		setTimeout(function(){
			staticdiv.animate({
				opacity: 0.25
			},animationduration,function(){
				animatestatic=0;
			});
		}, duration);
	});
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
assertButtons = function(){
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
		if(currentRoom!=="1a" && animatestatic<1){
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
		if(currentRoom!=="1b" && animatestatic<1){
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
		if(currentRoom!=="1c" && animatestatic<1){
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
		if(currentRoom!=="2a" && animatestatic<1){
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
		if(currentRoom!=="2b" && animatestatic<1){
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
		if(currentRoom!=="5" && animatestatic<1){
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
		if(currentRoom!=="7" && animatestatic<1){
			this.style.backgroundColor='#107010';
			updatecurrentRoom("7");
			resetCameraButtons(currentRoom);
		}
	});

	button3div.mouseenter(function(){
		if(this.id!==("button-"+currentRoom)){
			this.style.backgroundColor='#505050';
		}
		else this.style.backgroundColor='#107010';
	});
	button3div.mouseleave(function(){
		if(this.id!==("button-"+currentRoom)){
			this.style.backgroundColor='#101010';
		}
	});
	button3div.click(function(){
		if(currentRoom!=="3" && animatestatic<1){
			this.style.backgroundColor='#107010';
			updatecurrentRoom("3");
			resetCameraButtons(currentRoom);
		}
	});

	button4adiv.mouseenter(function(){
		if(this.id!==("button-"+currentRoom)){
			this.style.backgroundColor='#505050';
		}
		else this.style.backgroundColor='#107010';
	});
	button4adiv.mouseleave(function(){
		if(this.id!==("button-"+currentRoom)){
			this.style.backgroundColor='#101010';
		}
	});
	button4adiv.click(function(){
		if(currentRoom!=="4a" && animatestatic<1){
			this.style.backgroundColor='#107010';
			updatecurrentRoom("4a");
			resetCameraButtons(currentRoom);
		}
	});

	button4bdiv.mouseenter(function(){
		if(this.id!==("button-"+currentRoom)){
			this.style.backgroundColor='#505050';
		}
		else this.style.backgroundColor='#107010';
	});
	button4bdiv.mouseleave(function(){
		if(this.id!==("button-"+currentRoom)){
			this.style.backgroundColor='#101010';
		}
	});
	button4bdiv.click(function(){
		if(currentRoom!=="4b" && animatestatic<1){
			this.style.backgroundColor='#107010';
			updatecurrentRoom("4b");
			resetCameraButtons(currentRoom);
		}
	});

	button6div.mouseenter(function(){
		if(this.id!==("button-"+currentRoom)){
			this.style.backgroundColor='#505050';
		}
		else this.style.backgroundColor='#107010';
	});
	button6div.mouseleave(function(){
		if(this.id!==("button-"+currentRoom)){
			this.style.backgroundColor='#101010';
		}
	});
	button6div.click(function(){
		if(currentRoom!=="6" && animatestatic<1){
			this.style.backgroundColor='#107010';
			updatecurrentRoom("6");
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
			if(animatronicStates[1].currentRoom=="office"){
				officemaindiv.css("background-image","url("+officelightstates[1][0].src+")");
			} else {
				officemaindiv.css("background-image", "url('"+officelightstates[0][1].src+"')");
			};
			if(leftdooropen==false) {
				doorbuttonsleftdiv.css("background-image", "url('"+buttonleftstates[2].src+"')");
			} else {
				doorbuttonsleftdiv.css("background-image", "url('"+buttonleftstates[4].src+"')");
			};
			leftlighton=true;
			currentPowerUsage++;
			updatePowerUsage();
		}
		else if(rightlighton!==true) {
			officemaindiv.css("background-image", "url('"+officestates[0].src+"')");
			if(leftdooropen==false) {
				doorbuttonsleftdiv.css("background-image", "url('"+buttonleftstates[1].src+"')");
			} else {
				doorbuttonsleftdiv.css("background-image", "url('"+buttonleftstates[3].src+"')");
			};
			leftlighton=false;
			currentPowerUsage--;
			updatePowerUsage();
		};
	});

	doorbuttonsleft_doordiv.click(function(){
		if(leftdooropen==false) {
			playdooranimationleft(0);
			playSound("SFXBible_12478.wav",0.2);
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
			playSound("SFXBible_12478.wav",0.2);
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
			playSound("SFXBible_12478.wav",0.2);
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
			playSound("SFXBible_12478.wav",0.2);
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
			if(rightdooropen==false) {
				doorbuttonsrightdiv.css("background-image", "url('"+buttonrightstates[2].src+"')");
			} else {
				doorbuttonsrightdiv.css("background-image", "url('"+buttonrightstates[4].src+"')");
			};
			rightlighton=true;
			currentPowerUsage++;
			updatePowerUsage();
		}
		else if(leftlighton!==true) {
			officemaindiv.css("background-image", "url('"+officestates[0].src+"')");
			if(rightdooropen==false) {
				doorbuttonsrightdiv.css("background-image", "url('"+buttonrightstates[1].src+"')");
			} else {
				doorbuttonsrightdiv.css("background-image", "url('"+buttonrightstates[3].src+"')");
			};
			rightlighton=false;
			currentPowerUsage--;
			updatePowerUsage();
		};
	});
};
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