var words = ["ground", "control", "to", "major", "tom"];

//CODE BEFORE:
// var words = ["ground", "control", "to", "major", "tom"];

// map(words, function(word) {
//   return word.length;
// });

// map(words, function(word) {
//   return word.toUpperCase();
// });

// map(words, function(word) {
//   return word.split('').reverse().join('');
// });

function getLength(word) {
  return word.length;
};

function concat(word) {
  return word.split('').reverse().join('');
};

function upperCase(word) {
  return word.toUpperCase();
};


//this is the higher order function
function doMapping(words, myResults) {
	return words.map(myResults)
}



console.log(doMapping(words, getLength));
console.log(doMapping(words, upperCase));
console.log(doMapping(words, concat));





