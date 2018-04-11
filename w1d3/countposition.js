//NEED TO REVISIT THIS TO UNDERSTAND HOW IT WORKS BETTER



function myPosition(theString) {
	var refinedString = theString.split(' ').join('');
	var myObject = {};

	for (i = 0; i < theString.length; i++) {
		var myChar = theString.charAt(i);


		if (myObject[myChar]) {
			myObject[myChar].push(i); //reason i am pushing "i" and not [i] is because square brackets means i am pushing a new array into the object; but the object already exists as an array. I am only pushing the i from the counter, which identifies the character but also the spot where the character is (i.e. the index)
			
		} else {
			myObject[myChar] = [i]; //here, i am adding a new key value pair into myObject, because a value does not exist yet. this is the beginning of identifying the index position
		}
		console.log(myChar);
	}
	return myObject;
}




console.log(myPosition("Lighthouse in the house"));


