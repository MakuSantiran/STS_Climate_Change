// Cassette Tape Techinique by Maku Santiran
// A technique where Maku makes a game about his quizzes



/*
	Put these inside the var test

	["",
	"" , // answer
	""], // group



*/

document.title = "Climate Change";
	
var test = [
	["Is the aggregated pattern of weather, meaning averages, extremes, timing, spatial distributing of weather phenomenons",
	"Climate" , // answer
	"ClimateChange"], // group
	["Is an altered pattern of a climate",
	"Climate Change" , // answer
	"ClimateChange"], // group
	["It is where the probability of extremes increases ",
	"Extreme event" , // answer
	"ClimateChange"], // group
	["It is the average translational kinetic energy of a molecule",
	"Temperature" , // answer
	"ClimateChange"], // group

	["It is periodic fluctuation in sea surface temperature and the air pressure of the overlying atmospher across the equatorial Pacific Ocean",
	"El Nino Southern Oscillation" , // answer
	"ENSO"], // group
	["It is one of the aspects of ENSO",
	"Sea surface temperature anomalies" , // answer
	"ENSO"], // group
	["It occurs when there are warmer water temperature in Eastern and Central Pacific",
	"El Nino" , // answer
	"ENSO"], // group
	["It occurs when there are colder water temperature in Eastern and Central Pacific",
	"La Nina" , // answer
	"ENSO"], // group
	
	["Its a pressure where moist warm air rises and cools down, aka cause of typhoon",
	"Low Pressure Area" , // answer
	"ENSO"], // group
	["Its a pressure where dry and cold air declines and warms up, aka cause of drought",
	"High Pressure Area" , // answer
	"ENSO"], // group
	
	["Are indicative of ENSO warm phase condition",
	"SST anomalies bigger than 0.5C" , // answer
	"ENSO"], // group
	["Are indicative of ENSO cool phase condition",
	"SST anomalies smaller than 0.5C" , // answer
	"ENSO"], // group
	["Nino 3.4 SST anomalies are aeveraged over 3 months and its called...?",
	"Oceanic Nino Index" , // answer
	"ENSO"], // group
	["It happens when the ONI exhibits warm or cool for atleast 5 consecutive values.",
	"ENSO event" , // answer
	"ENSO"], // group
	
	["It lasts 8-12 months and occurs every 2-7 years",
	"El Nino" , // answer
	"ENSO"], // group
	["It lasts 1-3 years and occurs every 3-4 years",
	"La Nina" , // answer
	"ENSO"], // group
	
	["Is one of the cause of global warming",
	"Industrialization" , // answer
	"GlobalTempIncrease"], // group
	["Is one of the highest contributing cause of global warming",
	"Meat industry" , // answer
	"GlobalTempIncrease"], // group	
	["The speed of sustained winds of the intense TCs in Philippines was",
	"170kph" , // answer
	"GlobalTempIncrease"], // group
	
	["It is an impact due to rising CO2 levels",
	"Ocean Acidification" , // answer
	"ENSO"], // group
	["It is an impact due to melting of glaciers",
	"Sea level Rise" , // answer
	"ENSO"], // group
];


var developermode = true;
var element = new Image;
var devtoolsOpen = false;

element.__defineGetter__("id", function() {
	if (!developermode){
		devtoolsOpen = true; // This only executes when devtools is open.
		window.location.href = '...';
	}
});

setInterval(function() {
	devtoolsOpen = false;
	if (!developermode){
		console.log(element);
	}
}, 100);

// No touching from below 
// the ids
var questionId = document.getElementById("q_id");
var trackerId = document.getElementById("title_id");
var choice1Id = document.getElementById("c1_id");
var choice2Id = document.getElementById("c2_id");
var choice3Id = document.getElementById("c3_id");
var choice4Id = document.getElementById("c4_id");
var wrongscoreid = document.getElementById("wrongscore_id");
var correctscoreid = document.getElementById("correctscore_id");
var showscoreid = document.getElementById("showscore_id");
var isplayingid = document.getElementById("isplaying_id");
var timerid = document.getElementById("timer_id");

// the classes
var question_class = document.getElementsByClassName("question");
var choice1_class = document.getElementsByClassName("choice1");
var choice2_class = document.getElementsByClassName("choice2");
var choice3_class = document.getElementsByClassName("choice3");
var choice4_class = document.getElementsByClassName("choice4");

// Audio

var crrct_audio = new Audio('files/sfx/crrct.wav');
var wrng_audio = new Audio('files/sfx/wrng.wav');
//var bg_music = new Audio('files/sfx/bgmusic.mp3');
var bg_played = false;

/*
bg_music.addEventListener('ended', function() {
    this.currentTime = 0;
    this.play();
}, false);
*/

var numbers = [];
var shuffled_question = [];
var grouped_answers = {};
var random_num = Math.floor(Math.random() * 3);
var random_1;
var random_2;
var random_3;
var random_4;
var interval;
var timer_interval;
var timer_val;

var atquestion = 0;
var qamnt = 0;
var correctval = 0;
var wrongval = 0;

var timestarted = false;
var clickable = true;

function nextquestion(){
		choice1Id.className = " choice1";
		choice2Id.className = " choice2";
		choice3Id.className = " choice3";		
		choice4Id.className = " choice4";
		trackerId.innerHTML = "Question "+(atquestion+1)+" out of "+qamnt+"";
		atquestion += 1;
		if (qamnt < atquestion){
			showscoreid.className += " ygd";
			isplayingid.className += " isover";
			clickable = false;
			clearInterval(interval);
			clearInterval(timer_interval)
			//bg_music.pause();
			return;	
		};
		clearInterval(interval);		
		randomize_choice(qamnt);
		questionId.innerHTML = test[shuffled_question[atquestion]][0];
		clickable = true;		
			
};

function deduct_Timer(){
	timer_val = timer_val - 1;
	timerid.innerHTML = ""+(timer_val)+" seconds left";
	
	if (timer_val <= 0){
			showscoreid.className += " ygd";
			isplayingid.className += " isover";
			clickable = false;
			clearInterval(interval);
			clearInterval(timer_interval)
			//bg_music.pause();
			return;	
	}
}


function chckanswer(v){
	if (clickable){
		if (v.innerHTML == test[shuffled_question[atquestion]][1]){
			crrct_audio.currentTime = 0
			v.className += " correct";
			clickable = false;
			correctval += 1;
			correctscoreid.innerHTML = correctval;
			crrct_audio.play();
			
			interval = setInterval(nextquestion ,1000);
			if (bg_played == false) {
				timestarted = true
				bg_played = true;
				timer_val = 30 * qamnt;
				//timer_interval = setInterval(deduct_Timer ,1000);
				//bg_music.play();
			}
		}else{
			if (v.classList.contains("wrong") == false){
				wrng_audio.currentTime = 0
				wrongval += 1;
				wrongscoreid.innerHTML = wrongval;
				v.className += " wrong";
				wrng_audio.play();
			}
		};
	};
};


function counthowmany(){
	numbers[qamnt] = qamnt;
	qamnt += 1;
	
	if (test[qamnt]!=null){
		counthowmany();
	};
};

function shuffleArray(array) { 
   for (var i = array.length - 1; i > 0; i--){  
    
       // Generate random number  
       var j = Math.floor(Math.random() * (i + 1)); 
                    
       var temp = array[i]; 
       array[i] = array[j]; 
       array[j] = temp; 
   };
        
   return array; 
};


function get_Grouped_Ans(name){
	
	for(var i = grouped_answers[name].amnt - 1; i >= 0; --i){
		console.log(i)
		console.log(grouped_answers[name][i], grouped_answers[name].amnt);
		console.log("")
	}
}

function group_Array(array){

	for(var i = array.length - 1; i >= 0; i--){
		var existed = true;

		if (grouped_answers[array[i][2]] == null){
			grouped_answers[array[i][2]] = new Array([array[i][0], array[i][1]]);
			grouped_answers[array[i][2]].amnt = 1;
			existed = false;
		};

		if (existed){
			grouped_answers[array[i][2]].push([array[i][0], array[i][1]]) 
			grouped_answers[array[i][2]].amnt++;
		};
	};	
	//get_Grouped_Ans("B");
};

function randomize_choice(){


	var current_ans = test[shuffled_question[atquestion]];	
	var groupdata = grouped_answers[group];
	var group = current_ans[2]
	var amnt = grouped_answers[group].amnt;
	var random_array = Math.floor(Math.random() * amnt);

	var random_1 = grouped_answers[group][random_array][1];
	random_array = Math.floor(Math.random() * amnt);
	
	var random_2 = grouped_answers[group][random_array][1];
	random_array = Math.floor(Math.random() * amnt);
	
	var random_3 = grouped_answers[group][random_array][1];
	random_array = Math.floor(Math.random() * amnt);
	
	var random_4 = grouped_answers[group][random_array][1];
	var random_num = Math.floor(Math.random() * 3);
	
	if (random_num == 0){
		random_1 = current_ans[1];
	}else if(random_num == 1){
		random_2 = current_ans[1];
	}else if(random_num == 2){
		random_3 = current_ans[1];
	}else if(random_num == 3){
		random_4 = current_ans[1];
	}
	
	choice1Id.innerHTML = random_1;
	choice2Id.innerHTML = random_2;
	choice3Id.innerHTML = random_3;
	choice4Id.innerHTML = random_4;
}

//bg_music.volume = 0.2;

counthowmany();
shuffled_question = shuffleArray(numbers);
group_Array(test);
randomize_choice(qamnt);
qamnt -= 1;

trackerId.innerHTML = "Choose the correct answer";
timerid.innerHTML = "Practice mode :)";


correctscoreid.innerHTML = correctval;
wrongscoreid.innerHTML = wrongval;
questionId.innerHTML = test[shuffled_question[atquestion]][0];
