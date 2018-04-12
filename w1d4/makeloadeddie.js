//   //i want to roll random nnumbers from 1-6, but the results arent random at all. 
//   //inside inner function, have to call 'list'


function makeLoadedDie() {
  var list = [5, 4, 6, 1, 6, 4, 2, 3, 3, 5];
  var id = 0;

  return function() {
   id %= list.length; //dont go past the list, if at end, come back to [0]; that's why the list continues again at 5. 
  	//modulo operator asks what the remainder of the length of the array is. it's zero. so when the current number reaches the zero, it is going to stop. 
   return list[id++];	

  }
}

var rollLoadedDie = makeLoadedDie();

console.log(rollLoadedDie());  // 5
console.log(rollLoadedDie());  // 4
console.log(rollLoadedDie());  // 6
console.log(rollLoadedDie());  // 5
console.log(rollLoadedDie());  // 4
console.log(rollLoadedDie());  // 6
console.log(rollLoadedDie());  // 5
console.log(rollLoadedDie());  // 4
console.log(rollLoadedDie());  // 6
console.log(rollLoadedDie());  // 5
console.log(rollLoadedDie());  // 4
console.log(rollLoadedDie());  // 6




// // NOTES ON EXPLANATION!!!!!!!!!!!DONT ERASE
// //---------------------------------------------//
// function makeIdGenerator() {
//   var id = 0; //result is remembered between execution of the inside function


//   // The following is the closure function
//   return function() {
//     // This inner function accesses and assigns the value of
//     // the variable id, which was defined in the parent function
//     id += 1;
//     return id;
//   }
// }

// // makeIdGenerator returns a function which is assigned to
// // the variable nextId
// var nextId = makeIdGenerator();

// console.log(nextId()); // Logs: 1
// console.log(nextId()); // Logs: 2