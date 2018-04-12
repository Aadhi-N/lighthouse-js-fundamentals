//QUESTION - CAN I MAKE FUNCTION INSIDE THE STUDENTS OBJECT?

var students = [
  { id: 1, name: "bruce",    age: 40 },
  { id: 2, name: "zoidberg", age: 22 },
  { id: 3, name: "alex",     age: 22 },
  { id: 4, name: "alex",     age: 30 }

];

//alphabetically in names
//then by age if names === names

students.sort(function(a, b) {
	if (a.name === b.name) {
		return b.age - a.age
	} else {
		return a.name > b.name
	}


});
	console.log(students)
