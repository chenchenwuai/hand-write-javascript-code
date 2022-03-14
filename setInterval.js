// https://segmentfault.com/a/1190000038829248

// function interval(fn, time) {
//   let timer = null
//   let intervalFn = function () {
//     fn.call(null)
//     timer = setTimeout(intervalFn, time)
//   }
//   timer = setTimeout(intervalFn, time)
//   return timer
// }

function interval2(fn, time) {
  let timer = null
  function intervalFn() {
    fn.call()
    timer = setTimeout(intervalFn, time)
  }
  intervalFn()
  return {
    cancel: () => {
      clearTimeout(timer)
    }
  }
}

// 做一个网络轮询，每一秒查询一次数据。
let startTime = new Date().getTime();
let count = 0;
let count1 = 0
let count2 = 0


// setInterval(() => {
//   let i = 0;
//   while (i++ < 10000000); // 假设的网络延迟
//   count++;
//   console.log(
//     "old 与原设定的间隔时差了：",
//     new Date().getTime() - (startTime + count * 1000),
//     "毫秒"
//   );
// }, 1000)

// const a = interval(() => {
//   let i = 0;
//   while (i++ < 10000000); // 假设的网络延迟
//   count1++;
//   console.log(
//     "new 与原设定的间隔时差了：",
//     new Date().getTime() - (startTime + count1 * 1000),
//     "毫秒"
//   );
// }, 1000)

// console.log('a', a)

// setTimeout(() => {
//   clearTimeout(a)
// }, 5000)

const a2 = interval2(() => {
  let i = 0;
  while (i++ < 10000000); // 假设的网络延迟
  count2++;
  console.log(
    "new2 与原设定的间隔时差了：",
    new Date().getTime() - (startTime + count2 * 1000),
    "毫秒"
  );
}, 1000)

console.log('a2', a2)

setTimeout(() => {
  a2.cancel()
}, 50000)

function timeout(fn, time) {
  const timer = setInterval(() => {
    clearInterval(timer)
    fn()
  }, time)
}