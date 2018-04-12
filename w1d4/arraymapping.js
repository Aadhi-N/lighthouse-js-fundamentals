//WE ARE FINDING THE SQUARE ROOT OF x and y (eg. 3^2 and 4^2)

var input = [
  { x: 3, y: 4 },
  { x: 12, y: 5 },
  { x: 8, y: 15 }
];


var result = input.map(function(currentKey) {return Math.sqrt((currentKey['x'] * currentKey['x']) + (currentKey['y'] * currentKey['y']))});
//theres a new array made. currentKey is now the new line; accessing x and y in each line. 

console.log(result[0] === 5);
console.log(result[1] === 13);
console.log(result[2] === 17);


