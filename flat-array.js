// Recursion 递归版本
function flatter(arr) {
  if (!arr.length) return
  return arr.reduce((pre, cur) => Array.isArray(cur) ? [...pre, ...flatter(cur)] : [...pre, cur], [])
}

// Iteration 迭代
function iteration(arr) {
  if (!arr.length) return
  while (arr.some(item => Array.isArray(item))) {
    arr = [].concat(...arr)
  }
  return arr
}

console.log(flatter([1, 2, [1, [2, 3, [4, 5, [6]]]]]));
console.log(iteration([1, 2, [1, [2, 3, [4, 5, [6]]]]]));
console.log([1, 2, [1, [2, 3, [4, 5, [6]]]]].flat(Infinity));