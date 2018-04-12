function findWaldo(arr, found) {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] === "Waldo") {
      found(i);   // execute callback //just says he's found
    }
  }
}

function actionWhenFound(waldoIndex) {//passing the result of found(i) into new parameter waldoIndex.
	console.log("Found him at :" + waldoIndex)

}

findWaldo(["Alice", "Bob", "Waldo", "Winston"], actionWhenFound);



// var myFn = function() {
//   console.log("I am function.");
// }

// myFn.someAttribute = 42;
// console.log(myFn.someAttribute);

// function runner(f) {
//   f();
// }

// runner(myFn);