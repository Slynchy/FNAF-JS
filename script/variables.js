//
// variables.js
// The JS for setting all variables prior to launch
//
// Last updated - 27/03/2015 @ 12:29pm

var mainmenuanimInterval1;
var mainmenuanimInterval2;

var mainThreadID;

// amountofimages is the amount of images, but the highest number will be 1 less than that number.
// so image 4 in an array will be amountofimages-1
var roomImagesIndex = [{name: "1a",amountofImages: 5},
{name: "1b",amountofImages: 2},
{name: "1c",amountofImages: 4},
{name: "2a",amountofImages: 2},
{name: "2b",amountofImages: 1},
{name: "5",amountofImages: 3},
{name: "7",amountofImages: 1}]

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
{name:"7",roomstate:0}
];

var rooms=[{name:"1a",movingcamera:true,leftadjustment:0},
{name:"1b",movingcamera:false,leftadjustment:12},
{name:"1c",movingcamera:false,leftadjustment:17},
{name:"2a",movingcamera:false,leftadjustment:22},
{name:"2b",movingcamera:false,leftadjustment:13},
{name:"5",movingcamera:false,leftadjustment:13},
{name:"7",movingcamera:false,leftadjustment:22}
];