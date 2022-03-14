// compose function 
function fn1(x) {
  return x + 1
}

function fn2(x) {
  return x + 2
}

function fn3(x) {
  return x + 3
}

function compose(...fn) {
  if (!fn.length) return (v) => v;
  if (fn.length === 1) return fn[0];
  return fn.reduce((acc, cur) => (...args) => acc(cur(...args)))
}

const a = compose(fn1, fn2, fn3)

console.log(a(1))
