const _ = require('lodash');

console.log('Example project using lodash');
console.log('Lodash version:', _.VERSION);

const numbers = [1, 2, 3, 4, 5];
const doubled = _.map(numbers, n => n * 2);

console.log('Original numbers:', numbers);
console.log('Doubled numbers:', doubled);
