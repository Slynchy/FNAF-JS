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

var DEFAULT_VOLUME = 0.3;/* 
function playSound(src, volume, loop) {
    if (DEBUG_MODE) return console.log("Suppressing playSound() due to debug mode");
    if ((typeof loop) == "undefined" || loop == false) {
        loop = false;
    };
    if ((typeof volume) == "undefined") {
        volume = DEFAULT_VOLUME;
    };
    if ((typeof src) == "undefined") {
        return console.log("playSound() error - no sound specified");
    };
    for (x = 0; x < sounds.length; x++) {
        if (sounds[x].name == src) {
            sounds[x].file.removeEventListener("ended", loopSound);
			if(sounds[x].file.paused==false){
				sounds[x].file.pause();
				sounds[x].file.currentTime = 0;
			};
            sounds[x].file.volume = volume;
            sounds[x].file.loop = loop;
            if (loop == true) {
                sounds[x].file.addEventListener('ended', loopSound, false);
            };
            sounds[x].file.play();
            return console.log("Sound " + sounds[x].name + " now playing at " + (volume * 100) + "% volume.");
        };
    };
    return console.log("Sound " + src + " not found, is it under sounds[]?");
}; */

function playSound(src, volume, loop) {
    if (DEBUG_MODE) return console.log("Suppressing playSound() due to debug mode");
    if ((typeof loop) == "undefined" || loop == false) {
        loop = false;
    };
    if ((typeof volume) == "undefined") {
        volume = DEFAULT_VOLUME;
    };
    if ((typeof src) == "undefined") {
        return console.log("playSound() error - no sound specified");
    };
    for (x = 0; x < sounds.length; x++) {
        if (sounds[x].name == src) {
            sounds[x].file.removeEventListener("ended", loopSound);
			if(sounds[x].file.paused==false){
				sounds[x].file.pause();
				sounds[x].file.currentTime = 0;
			};
            sounds[x].file.volume = volume;
            sounds[x].file.loop = loop;
            if (loop == true) {
                sounds[x].file.addEventListener('ended', loopSound, false);
            };
            sounds[x].file.play();
            return console.log("Sound " + sounds[x].name + " now playing at " + (volume * 100) + "% volume.");
        };
    };
    return console.log("Sound " + src + " not found, is it under sounds[]?");
};

function loopSound(){this.currentTime = 0;this.play();};

function stopSound(src){if((typeof src)=="undefined") {console.log("stopSound() error - no sound specified");console.log("Proceeding to stop all sound..."); for(x=0;x<sounds.length;x++){ if(sounds[x].file.paused==false){ sounds[x].file.pause(); return console.log("Channel "+x+" is paused/stopped"); }; }; return; } else { for(x=0;x<sounds.length;x++){ if(sounds[x].name==src){ sounds[x].file.pause(); return; }; }; return console.log("stopSound() error - invalid sound specified."); }; };

var ambiance1 = new SeamlessLoop();
var ambiance2 = new SeamlessLoop();
ambiance1.addUri("sounds/Buzz_Fan_Florescent2.wav", 9600, "ambiancetrack1");
ambiance2.addUri("sounds/ambience2.wav", 60000, "ambiancetrack2");

function stopAmbientSound(){
	document.getElementById("channelambient").pause();
	document.getElementById("channelambient2").pause();
};