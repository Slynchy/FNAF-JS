//
// animation.js
// The JS for animation functions
//
// Last updated - 05/06/2015

function introduction(){
	$('#amduatlogo').animate({
		opacity: 1
	},1000,function(){
		setTimeout(function(){
			eval('$("#amduatlogo").animate({opacity: 0},1000,function(){setTimeout(mainmenu,2000);});')
		}, 3000);
	});
};

function playtransitiononanimation(){
	transitiondiv.style.display="block";
	for(x=0;x<8;x++){
		eval('setTimeout(function(){document.getElementById("transistionanimation").src=""+transitionimages['+x+'].src+"";},(65*'+x+'));');
	};
	setTimeout(function(){
		transitiondiv.style.display="none";
	},(500));
};

function playfreddygameoveranimation(animatronic){
	if((typeof animatronic)=="undefined") animatronic="freddy";
	switch(animatronic) {
		case "freddy":
			document.getElementById("officemain").style.backgroundImage="none";
			document.getElementById("doorbuttonsleft").style.display="none";
			document.getElementById("doorbuttonsright").style.display="none";
			document.getElementById("doorright").style.display="none";
			document.getElementById("doorleft").style.display="none";
			document.getElementById("officecameraleft").style.display="none";
			document.getElementById("officecameraright").style.display="none";
			document.getElementById("openclosecamera").style.display="none";
			playSound("XSCREAM.wav",0.05);
			for(x=0;x<20;x++){
				eval('setTimeout(function(){document.getElementById("officemain").style.backgroundImage="url("+freddyanimationgameover['+x+'].src+")";},(45*'+x+'));');
			};
			gameoverstatic();
			break;
		case "bonny":
			document.getElementById("fan").style.display="none";
			document.getElementById("doorright").style.display="none";
			document.getElementById("doorleft").style.display="none";
			playSound("XSCREAM.wav",0.05);
			for(x=0;x<22;x++){
				eval('setTimeout(function(){document.getElementById("officemain").style.backgroundImage="url("+bonnyanimationgameover['+x+'].src+")";},(45*'+x+'));');
			};
			setTimeout(function(){gameoverstatic();},275);
			break;
		default:
		case "chica":
			document.getElementById("fan").style.display="none";
			document.getElementById("doorright").style.display="none";
			document.getElementById("doorleft").style.display="none";
			playSound("XSCREAM.wav",0.05);
			for(x=0;x<16;x++){
				eval('setTimeout(function(){document.getElementById("officemain").style.backgroundImage="url("+chicaanimationgameover['+x+'].src+")";},(45*'+x+'));');
			};
			setTimeout(function(){gameoverstatic();},275);
			break;
	};
	clearInterval(mainThreadID);
};

function playfoxxyofficeanimation(){
	if(feedopen==true) {
		OpenCloseFeed();
	}; 
	document.getElementById("officecameraleft").style.display="none";
	document.getElementById("officecameraright").style.display="none";
	document.getElementById("openclosecamera").style.display="none";
	document.getElementById("doorleft").style.display="none";
	playSound("XSCREAM.wav",0.05);
	for(x=0;x<21;x++){
	//	eval('foxxyofficeanimtimeout[x] = setTimeout(function(){officemaindiv.css("background-image",foxxyofficeanim['+x+'].src);},(35*'+x+'));');
		eval('foxxyofficeanimtimeout[x] = setTimeout(function(){document.getElementById("officemain").style.backgroundImage="url("+foxxyofficeanim['+x+'].src+")";},(35*'+x+'));');
		
	};
	clearInterval(mainThreadID);
	setTimeout(function(){
		gameoverstatic();
		},(2350));
};

function recordTick() {
		recorddiv.toggle();
	if(showrecord==true) {
		showrecord=false;
	}
	else {
		showrecord=true;
	};
};

function setDivImgFan(){
//	document.getElementById(elementID).src=pathtofile+"_"+frame2+".png"
	setTimeout(function(){
		fandiv.attr("src",fananim[1].src);
	},30);
	setTimeout(function(){
		fandiv.attr("src",fananim[2].src);
	},60);
	setTimeout(function(){
		fandiv.attr("src",fananim[3].src);
	},90);
};

function playpoweroutageanimation(duration){
	if(duration=="") duration = 60;
	document.getElementById("openclosecamera").style.display="none";
	document.getElementById("fan").style.display="none";
	document.getElementById("officemain").style.backgroundImage="url("+poweroutimg[0].src+")";
	for(x=0;x<60;x++){
		eval('setTimeout(function(){document.getElementById("officemain").style.backgroundImage="url("+poweroutimg['+(x & 1)+'].src+")";},(105*'+x+'));');
	};
	clearInterval(mainThreadID);
};

function playFoxxyRunningAnimation(){
	playSound("run.wav");
	for(x=0;x<31;x++){
		eval('foxxyrunninganimationtimeout[x] = setTimeout(function(){roomdiv.attr("src",room2afoxxyanim['+x+'].src);},(35*'+x+'));');
	};
	setTimeout(function(){
		foxxyrunning=false;
		if(leftdooropen==true) playSound("knock2.wav",1);
			animatronicStates[3].state=4;
		},(3350));
};

