// https://babeljs.io/learn-es2015/#ecmascript-2015-features-destructuring

const {get: _get} = require( 'lodash' );

/*
const arr = [1, 2, 3];
const [a, undefined, b] = arr;
console.log( a, b );
*/

const o = {
  a: 1,
  b: 2,
  c: {
    d: 1
  }
};

const {a, b, c, c: {d}, f = 99, c: {z}} = o;
console.log( a, b, c, d, f );

console.log( _get( o, 'a.b.c.d.e.f[100].abc', 100 ) );

/*
const o = {
  a: 1,
  b: 2,
  c: {
    d: 1
  }
};

const oo = {
  f: 23,
  g: 1234
};

const doWork = ({a = 4, b = 4, c: {d, e = 88}, f = 99}, {g}) => {
  console.log( a, b, d, e, f, g );
};

doWork( o, oo );
*/