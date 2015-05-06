//
// save.js
// The JS for saves
//
// Last updated - 06/05/2015
//
// Most save stuff is handled by the code that needs it.
// This is mainly for constants.

/* Set save for first time */ if((typeof localStorage["fnaf-js-savegame.night"])=="undefined") localStorage["fnaf-js-savegame.night"]="1";

/* The fuck even is this... */ var SAVED_GAME_NIGHT = localStorage["fnaf-js-savegame.night"];

console.log(SAVED_GAME_NIGHT);