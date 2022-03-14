// 实现有并行限制的 Promise 调度器
class scheduler {
  constructor(limit) {
    this.queue = [] // 队列
    this.maxCount = limit // 最大同时运行数
    this.count = 0 // 正在运行数量
  }

  add(time, fn) {
    // 创建promise 方便执行完函数后进行回调then方法
    const promisecreator = () => {
      return new Promise(resolve => {
        setTimeout(() => {
          fn() // 执行方法
          resolve() // 一定要resolve，resolve后，才表示这个任务已完成，可以进行下一个任务
        }, time)
      })
    }
    // 向队列里面添加 promise
    this.queue.push(promisecreator)
  }

  //开启调度器
  start() {
    // 首先遍历队列中前 maxCount 个 promise
    for (let i = 0; i < this.maxCount; i++) {
      this.request()
    }
  }

  // 执行任务
  request() {
    if (!this.queue || !this.queue.length || this.count >= this.maxCount) {
      return
    }
    // 遍历队列中前 maxCount 次 request，每次都count+1
    this.count++

    // 推出第一个任务并执行任务，回调后count-1，然后在调用request，继续推出第一个任务，以此类推
    this.queue.shift()().then(() => {
      this.count--
      this.request()
    })
  }
}

const s = new scheduler(2)

let fn = function (n) {
  console.log('n', n)
}

s.add(2000, fn.bind(null, 1))
s.add(1000, fn.bind(null, 2))
s.add(1000, fn.bind(null, 3))
s.add(800, fn.bind(null, 4))

s.start()