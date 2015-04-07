//
// variables.js
// The JS for setting all variables prior to launch
//
// Last updated - 06/04/2015 @ 01:42am 

var mainmenuanimInterval1;
var mainmenuanimInterval2;
var timer;

// this array defines how close each room is to the office
// lower = closer
var roomClosenessBunny=[{name:"office"},
                    {name:"2b"},
                    {name:"2a"},
					{name:"5"},
					{name:"1b"},
					{name:"1a"}
					];
var bunnytimer = 0;
var freddyanimationgameover = [];
var currentBunnyRoomArray = 4;
var audiochannels = [];
for(x=1;x<=4;x++){
	audiochannels[x] = document.getElementById("channel"+x);
	audiochannels[x].volume=0.3;
};

var baseFoxyTime = 6;
var foxydifficulty;
var foxydifficultyarray = [];
var bunnydifficultyarray = [];
for(x=20;x>=1;x--){
	foxydifficultyarray[x] = (baseFoxyTime += 2)
};
for(x=20;x>=1;x--){
	bunnydifficultyarray[x] = (baseFoxyTime += 2)
};

var mainThreadID;
var play2aanimation=false;
var storedselectedroom;

// amountofimages is the amount of images, but the highest number will be 1 less than that number.
// so image 4 in an array will be amountofimages-1
var roomImagesIndex = [{name: "1a",amountofImages: 5},
{name: "1b",amountofImages: 3},
{name: "1c",amountofImages: 4},
{name: "2a",amountofImages: 2},
{name: "2b",amountofImages: 1},
{name: "5",amountofImages: 3},
{name: "7",amountofImages: 1}]

var animatronicStates = [{name:"Chica",currentRoom:"1a",state:0,currentRoomArray:0},
                         {name:"Bonnie",currentRoom:"1a",state:0,currentRoomArray:0},
                         {name:"Freddy",currentRoom:"1a",state:0,currentRoomArray:0},
                         {name:"Foxxy",currentRoom:"1c",state:0,currentRoomArray:2}
						];

var poweroutimg = [];
var MAINBODY = $("#mainbody");
var mainmenu = $("#mainmenu");
var amduatlogo = $("#amduatlogo");
var mainmenufazbearanimdiv = $("#mainmenufazbearanim");
var roomdiv = $("#room");
var staticdiv = $("#static");
var staticimgdiv = document.getElementById("staticimg");
var mainmenustaticimgdiv = document.getElementById("mainmenustaticimg");
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
var room2afoxxyanim = [];
var mainmenufazbear = [];
var foxxyofficeanim = [];
var foxxyofficeanimtimeout = [];

var officelightstates = [];
var officestates = [];
var buttonleftstates = [];
var buttonrightstates = [];

var button1adiv = $("#button-1a");
var button1bdiv = $("#button-1b");
var button1cdiv = $("#button-1c");
var button2adiv = $("#button-2a");
var button2bdiv = $("#button-2b");
var button5div = $("#button-5");
var button7div = $("#button-7");
var buttonopenclosecameradiv = $("#openclosecamera");

var currentRoom = "1a";
var currentRoomID = 0;
var animatestatic = 0;
var showrecord = false;
var feedopen = false;
var fananim =[];
var currentPower = 100;
var currentPowerUsage = 0;
var currenthour = 0;
var hours = [];
var timeCounter=0;
var foxxyrunning = false;
var foxxytimeout;
var foxxytimer=0;
var playedfoxxyrunninganimation=false;
var foxxyrunninganimationtimeout = [];

var roomImages = [];


// roomstates: 0 = default, 1 = different, etc.
var currRoomStates=[{name:"1a",roomstate:0},
                    {name:"1b",roomstate:0},
{name:"1c",roomstate:0},
{name:"2a",roomstate:0},
{name:"2b",roomstate:0},
{name:"5",roomstate:0,AIStates:[1,2]},
{name:"7",roomstate:0},
{name:"office",roomstate:0}
];

var rooms=[{name:"1a",movingcamera:true,leftadjustment:0},
{name:"1b",movingcamera:true,leftadjustment:12},
{name:"1c",movingcamera:false,leftadjustment:17},
{name:"2a",movingcamera:true,leftadjustment:22},
{name:"2b",movingcamera:true,leftadjustment:13},
{name:"5",movingcamera:true,leftadjustment:13},
{name:"7",movingcamera:true,leftadjustment:22}
];

setVariables = function(){
	for(x=0;x<currRoomStates.length;x++){
		currRoomStates[x].roomstate=0;
	};
	
	currentBunnyRoomArray = 4;
	currentRoom = "1a";
	currentRoomID = 0;
	animatestatic=0;
	showrecord = false;
	feedopen = false;
	currentPower = 100;
	currentPowerUsage = 0;
	currenthour = 0;
	timeCounter=0;
	foxxyrunning = false;
	foxxytimer=0;
	bunnytimer = 0;
	playedfoxxyrunninganimation=false;
	
	officeX=0
	document.getElementById("office").style.webkitTransform="none";
	officeXInterval;
	officeXOtherInterval;
	leftdooropen=false;
	rightdooropen=false;
	leftlighton=false;
	rightlighton=false;
	play2aanimation=false;
};