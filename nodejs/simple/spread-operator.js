// https://babeljs.io/learn-es2015/#ecmascript-2015-features-default-rest-spread

/*
const calc = (a, b, ...c) => c.reduce( (acc, v) => acc + v, a + b );
console.log( calc( 1, 2, 3, 4, 5, 6, 7 ) );

const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];

// 1,2,3,4,5,6
console.log( [
  ...arr1, ...arr2
] );
*/

const a = {a: 1, b: 2};
const b = {a: 2, c: 3};

console.log({
  ...a, ...b
});
