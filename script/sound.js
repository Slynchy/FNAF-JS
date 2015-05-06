//
// sound.js
// The JS for sound engine
// Very basic one I made
//
// Last updated - 06/05/2015

// playSound(filename, volume, loop?, channelnumber) - Play a sound
// ShowAudioChannels() - Shows audio that different channels are playing.
// loopSound() - Used by playSound to loop sounds using eventlisteners
// stopSound(channelnumber) - Stop a sound on a specific channel or all of them.
// stopAmbientSound() - Stops all the ambient sound; for gameovers.

var NUM_OF_AUDIO_CHANNELS = 4;
var DEFAULT_VOLUME = 0.3;

var audiochannels = [];
for(x=1;x<=NUM_OF_AUDIO_CHANNELS;x++){
    audiochannels[x] = new Audio();
    audiochannels[x].volume=DEFAULT_VOLUME;
};
var audiochannelambient = document.getElementById("channelambient");
var audiochannelambient2 = document.getElementById("channelambient2");

ShowAudioChannels=function(){for(x=1;x<=4;x++){if(audiochannels[x].paused==false){console.log("Audio channel "+x+" is playing: "+audiochannels[x].src);} else {console.log("Audio channel "+x+" is not playing.");}};return;};

function playSound(src,volume,loop,channelnumber){
	if(DEBUG_MODE) return;
	if((typeof loop)=="undefined" || loop==false) {
		loop=false;
	};
	if((typeof channelnumber)=="undefined") {
	
	};
	if((typeof volume)=="undefined") {
		volume=DEFAULT_VOLUME;
	};
	if((typeof src)=="undefined") {
		return console.log("playSound() error - no sound specified");
	};
	for(x=1;x<=4;x++){
		if(audiochannels[x].paused==true){
			audiochannels[x].removeEventListener("ended", loopSound);
			audiochannels[x].src=("sounds/"+src);
			audiochannels[x].volume=volume;
            audiochannels[x].loop=loop; // Doesn't fcking work on anything except Firefox...
            if(loop==true) {
				audiochannels[x].addEventListener('ended', loopSound, false); // For anything other than FF
            };
			audiochannels[x].play();
			return console.log("Channel "+x+" now playing "+src);
		};
	};
	console.log("No channels available!");
};

function loopSound(){
    this.currentTime = 0;
	this.play();
};

function stopSound(channelnumber){
	if((typeof channelnumber)=="undefined") {
		console.log("stopSound() error - no channel number specified");
		console.log("Proceeding to stop all sound...");
		for(x=1;x<=4;x++){
			if(audiochannels[x].paused==false){
				audiochannels[x].pause();
				audiochannelambient.pause();
				return console.log("Channel "+x+" is paused/stopped");
			};
		};
		return;
	};
	return audiochannels[channelnumber].paused=true;
};

function stopAmbientSound(){
	document.getElementById("channelambient").pause();
	document.getElementById("channelambient2").pause();
};