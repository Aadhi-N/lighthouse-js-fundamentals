var numberlist = require('./numberlist.js');
var assert = require('assert');

describe('convertToArray()', function () {
	it('should give me a number in an array', function () {
		var result = numberlist.myList(4);
		assert.equal(result, '4');
	});

}),


describe('moreNumbers()', function() {
	it('more numbers in the array', function () {
		var result = numberlist.sortIt([8, 2, 0, 9, 4, 1]);
		assert.equal(result, [0, 1, 2, 4, 8, 9]);
	});
});