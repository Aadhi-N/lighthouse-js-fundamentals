var raining = true;
var cold = true;

if (raining) {
	console.log("Don't forget your umbrella!");
}

if (cold) {
	console.log("Make sure you pick out a scarf!");
}

console.log("Now you're ready to go outside!");


var cold1 = false;

if (cold1) {
	console.log("Make sure you pick out a scarf!");
} else {
	console.log("Short sleeves are fine.");
}


var temperature = 20;

if (temperature < 0) {
	console.log("Make sure you pick out a scarf!");
} else if (temperature < 15) {
	console.log("Short sleeves won't cut it!");
} else {
	console.log("Short sleeves are fine.");
}

console.log("Now you're ready to go outside!");


var isCitizen = true;
var age = 20;

if (isCitizen && age > 18) {
	console.log("You are eligible to vote.");
} else {
	console.log("Not eligible");
}


if (!raining) {
	console.log("Leave your umbrella");
}


function whichSchool(age) {
	if (age < 13) 
	{return "Elementary school";
} else if (age > 13 && age < 18)
	{return "Secondary School";
} else {
	return "Lighthouse Labs";
}
}

console.log(whichSchool(5));
console.log(whichSchool(15));
console.log(whichSchool(26));





































