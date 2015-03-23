

function staticTick() {
  randomcheck++
  if(randomcheck>8) randomcheck=1;
  var elem = document.getElementById('staticimg');
  elem.src=staticanim[randomcheck].src;

  staticId = setTimeout('staticTick()', 30);
}

function updateRoomStateStatic(){
	if(animatestatic==0) {
		animatestatic=1;
		$("#static").animate({
			opacity: 2
		},0,function(){
			animatestatic=2;
			setTimeout(function(){
				animatestatic=0;
				$("#static").animate({
					opacity: 0.25
				},1000,function(){
				});
			}, 2000)
		});
	}
}

function camerapositionTick() {
	if(rooms[currentRoomID].movingcamera!==false){
		$("#room").animate({
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
		this.style.backgroundColor='#107010';
		$('#button-1b').css("backgroundColor",'#101010');
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
		this.style.backgroundColor='#101010';
	}
});
$('#button-1b').click(function(){
	if(currentRoom!=="1b"){
		this.style.backgroundColor='#107010';
		$('#button-1a').css("backgroundColor",'#101010');
		updatecurrentRoom("1b");
	}
});
// ==============================================END OF BUTTON EVENTS=======================================