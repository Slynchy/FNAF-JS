//
// sound.js
// The JS for sound engine
// Very basic one I made
//
// Last updated - 11/05/2015

// playSound(filename, volume, loop?, channelnumber) - Play a sound
// ShowAudioChannels() - Shows audio that different channels are playing.
// loopSound() - Used by playSound to loop sounds using eventlisteners
// stopSound(channelnumber) - Stop a sound on a specific channel or all of them.
// stopAmbientSound() - Stops all the ambient sound; for gameovers.

debuglog("Initializing sound.js...");

var DEFAULT_VOLUME = 0.3;

var ambiance1 = new SeamlessLoop();
var ambiance2 = new SeamlessLoop();
ambiance1.addUri("sounds/Buzz_Fan_Florescent2.wav", 9600, "ambiancetrack1");
ambiance2.addUri("sounds/ambience2.wav", 60000, "ambiancetrack2");

var sound=new function(){
	
	this.playSound=function(src, volume, loop) {
		if (DEBUG_MODE) return debuglog("Suppressing playSound() due to debug mode");
		if ((typeof loop) == "undefined" || loop == false) {
			loop = false;
		};
		if ((typeof volume) == "undefined") {
			volume = DEFAULT_VOLUME;
		};
		if ((typeof src) == "undefined") {
			return debuglog("playSound() error - no sound specified");
		};
		for (x = 0; x < sounds.length; x++) {
			if (sounds[x].name == src) {
				sounds[x].file.removeEventListener("ended", sound.loopSound);
				if(sounds[x].file.paused==false){
					sounds[x].file.pause();
					sounds[x].file.currentTime = 0;
				};
				sounds[x].file.volume = volume;
				sounds[x].file.loop = loop;
				if (loop == true) {
					sounds[x].file.addEventListener('ended', sound.loopSound, false);
				};
				sounds[x].file.play();
				return debuglog("Sound " + sounds[x].name + " now playing at " + (volume * 100) + "% volume.");
			};
		};
		return debuglog("Sound " + src + " not found, is it under sounds[]?");
	};

	this.loopSound=function(){this.currentTime = 0;this.play();};

	this.stopSound=function(src){if((typeof src)=="undefined") {console.log("stopSound() error - no sound specified");console.log("Proceeding to stop all sound..."); for(x=0;x<sounds.length;x++){ if(sounds[x].file.paused==false){ sounds[x].file.pause(); return console.log("Channel "+x+" is paused/stopped"); }; }; return; } else { for(x=0;x<sounds.length;x++){ if(sounds[x].name==src){ sounds[x].file.pause(); return; }; }; return console.log("stopSound() error - invalid sound specified."); }; };

	this.stopAmbientSound=function(){
		if(DEBUG_MODE==false){
			ambiance1.stop();
			ambiance2.stop();
		};
	};
};