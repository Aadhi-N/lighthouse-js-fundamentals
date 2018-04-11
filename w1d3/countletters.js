//STEPS
//- declare variable, the value will be the string
//- read through all the characters in the string, but count how many times the character occurs. store in the object.
	//-
//when letters are unique, i want to store them into keys
//when letters are repated, i want to store the numbers into the keys of unique chars
//print the final object 




function countingChars(countString) {
	var myString = countString.split(' ').join('');
	var myUniqueChars = {};

	for (i = 0; i < myString.length; i++) {
		var char = myString.charAt(i);


		if 	(myUniqueChars[char] == undefined)  {
			myUniqueChars[char] = 1;
		} else {
			myUniqueChars[char] += 1;
		} 

		console.log(myString.charAt(i));
	}
	return myUniqueChars;
	

}

console.log(countingChars("Lighthouse in the house"));

