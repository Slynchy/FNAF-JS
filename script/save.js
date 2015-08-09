//
// save.js
// The JS for saves
//
// Last updated - 05/08/2015
//
// Most save stuff is handled by the code that needs it.
// This is mainly for constants.

debuglog("Initializing save.js...");

/* Comment this out if neeeded */ // if(DEBUG_MODE) localStorage["fnaf-js-savegame.night"] = "7";

/* Set save for first time */ 
if((typeof localStorage["fnaf-js-savegame.night"])=="undefined") localStorage["fnaf-js-savegame.night"]="1";
if((typeof localStorage["fnaf-js-savegame.stars"])=="undefined") localStorage["fnaf-js-savegame.stars"]="0";

/* The fuck even is this...
I figured it out! It is an unused constant <3 */ var SAVED_GAME_NIGHT = localStorage["fnaf-js-savegame.night"];

debuglog("Saved game loaded successfully! Night is #"+SAVED_GAME_NIGHT);