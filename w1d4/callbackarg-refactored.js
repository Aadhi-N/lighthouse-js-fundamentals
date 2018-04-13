function findWaldo(arr, found) {

	arr.forEach(function(name, i){//name becomes each value in the array (.e.g alice, bob, waldo); i becomes the index
		//there's a specific order that these callbacks need to be listed
		if (name === "Waldo") { //now checking if index = waldo
			found(i);
		}
	});
//'arr.forEach = do this forEach method on this array 
//everything after 'function' = this is the callback. it references the array.


  // for (var i = 0; i < arr.length; i++) {
  //   if (arr[i] === "Waldo") {
  //     found(i);   // execute callback //just says he's found
  //   }
  // }
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