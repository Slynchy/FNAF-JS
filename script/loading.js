//
// loading.js
// The JS for loading the game (purely to reduce clutter)
//
// Last updated - 10/04/2015 @ 01:53am 

loadroomImages = function(){
	for(x=0;x<roomImagesIndex.length;x++){
		roomImages[x] = [];
	}
	for(x=0;x<roomImagesIndex.length;x++){
		for(y=0;y<roomImagesIndex[x].amountofImages;y++){
			roomImages[x][y] = new Image();
			roomImages[x][y].src = "graphics/rooms/"+roomImagesIndex[x].name+"/"+y+".png"
		}
	}
}

function loadEverythingElse(){
		document.getElementById("mainmenustaticimg").style.display="none";
		document.getElementById("mainmenu").style.display="none";
		document.getElementById("loadingicon").style.display="block";
	for(x=0;x<1;x++){
		officestates[x] = new Image();
		officestates[x].src = "graphics/rooms/office/"+x+".png";
	};
	for(x=0;x<(3);x++){
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
	for(x=0;x<31;x++){
		room2afoxxyanim[x] = new Image();
		room2afoxxyanim[x].src = "graphics/rooms/2a/foxxy/"+x+".png";
	};
	for(x=1;x<4;x++){
		fananim[0+x] = new Image();
		fananim[0+x].src = "graphics/rooms/office/fan_"+x+".png";
	};
	for(x=0;x<21;x++){
		foxxyofficeanim[x] = new Image();
		foxxyofficeanim[x].src = "graphics/rooms/office/foxxy/"+x+".png";
	};
	for(x=0;x<2;x++){
		poweroutimg[x] = new Image();
		poweroutimg[x].src = "graphics/rooms/office/powerout"+x+".png";
	};
	for(x=0;x<20;x++){
		freddyanimationgameover[x] = new Image();
		freddyanimationgameover[x].src = "graphics/gameover/freddy/"+x+".png";
	};
	for(x=0;x<22;x++){
		bonnyanimationgameover[x] = new Image();
		bonnyanimationgameover[x].src = "graphics/gameover/bonny/"+x+".png";
	};
	setTimeout(function(){
		clearInterval(mainmenuanimInterval1);
		document.getElementById("loadingicon").style.display="none";
		document.getElementById("timekeeper").style.display="block";
		document.getElementById("openclosecamera").style.display="block";
		document.getElementById("power").style.display="block";
		document.getElementById("body").style.display="block";
		mainThreadID = setInterval('mainThread()', 1000);
		var recordanimId = setInterval('recordTick()', 1000);
		if(!DEBUG_MODE){
			audiochannelambient.src=("sounds/Buzz_Fan_Florescent2.wav");
			audiochannelambient.volume=0.1;
			audiochannelambient2.src=("sounds/ambience2.wav");
			audiochannelambient2.volume=0.3;
		};
		timer = $.timer(function() {
		   setDivImgFan()
		}, 91, true);
		//	foxxytimeout=setTimeout(function(){
		//		updateAIState(3,1);
		//	},5000);
		},3500);
};
for(x=0;x<4;x++){
	mainmenufazbear[x] = new Image();
	mainmenufazbear[x].src = "graphics/mainmenu/"+x+".png";
}