// exports a function
// takes a number as a parameter, stores it in a list
// make this global private


// 2. export a function that returns a version of the data list sorted in ascending order; make this funciton only inside export.

// 3. script should import the data list, 



module.exports = {
	myList: function(number) {
		var string = number + '';
		return string; 
	},	

	sortIt: function(number) {
		number.sort();
		return number;	
	}

}


// function sortIt(number) {
// 	number.sort();
// 	return number;
// }

// console.log(sortIt([1, 5, 6, 3]))