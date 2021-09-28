### 实现一个Promise
#### 基本原理：
- Promise 是一个类，在执行这个类的时候会传入一个执行器，这个执行器会立即执行
- Promise 会有三种状态
  - Pending 等待
  - Fulfilled 完成
  - Rejected 失败
- 状态只能由 Pending --> Fulfilled 或者 Pending --> Rejected，且一但发生改变便不可二次修改；
- Promise 中使用 resolve 和 reject 两个函数来更改状态；
  - then 方法内部做但事情就是状态判断
  - 如果状态是成功，调用成功回调函数
  - 如果状态是失败，调用失败回调函数

### 定义状态

> 加强版

```js
const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

// 新建MyPromise类
class MyPromise {
  constructor(executor) {
    // executor是一个执行器， 进入会立即执行
    // 并传入resolve和reject方法
    try {
      executor(this.resolve, this.reject)
    } catch (error) {
      // 如果有错误，就直接执行 reject
      this.reject(error)
    }
  }

  // 储存状态的变量，初始值是 pending
  status = PENDING

  // 成功之后的值
  value = null;

  // 失败之后的原因
  reason = null;

  // 存储成功回调函数
  onFulfilledCallback = [];

  // 存储失败回调函数
  onRejectedCallback = [];

  // resolve和reject为什么要用箭头函数？
  // 如果直接调用的话，普通函数this指向的是window或者undefined
  // 用箭头函数就可以让this指向当前实例对象

  // 更改成功后的状态
  resolve = (value) => {
    // 只有状态是等待， 才执行状态修改
    if (this.status == PENDING) {
      // 状态修改为成功
      this.status = FULFILLED
      // 保存成功之后的值
      this.value = value

      // resolve里面将所有成功的回调拿出来执行
      while (this.onFulfilledCallback.length) {
        this.onFulfilledCallback.shift()(value)
      }
    }
  }

  // 更改失败后的状态
  resolve = (reason) => {
    // 只有状态是等待，才执行状态修改
    if (this.status === PENDING) {
      // 状态成功为失败
      this.status = REJECTED
      // 保存失败后的原因
      this.reason = reason

      // resolve里面将所有失败的回调拿出来执行
      while (this.onRejectedCallback.length) {
        this.onRejectedCallback.shift()(reason)
      }
    }
  }

  // then的实现
  then(onFulfilled, onRejected) {
    // 判断状态
    if (this.status === FULFILLED) {
      // 调用成功回调，并且把原因返回
      onFulfilled(this.value)
    } else if(this.status === REJECTED) {
      // 调用失败回调，并且把原因返回
      onRejected(this.reason)
    } else if (this.status === PENDING) { // 处理异步
      // 因为不知道后面状态的变化情况，所以将成功回调和失败回调存储起来
      // 等到执行成功失败函数的时候再传递
      this.onFulfilledCallback.push(onFulfilled)
      this.onRejectedCallback.push(onRejected)
    }

    // 为了链式调用这里直接创建一个 MyPromise，并在后面 return 出去
    const promise2 = new MyPromise((resolve, reject) => {
      // 这里的内容在执行器中，会立即执行
      if (this.status === FULFILLED) {
        // 创建一个微任务等待 promise2 完成初始化
       queueMicrotask(() => {
         try {
          // 获取成功回调函数的执行结果
          const x = onFulfilled(this.value)
          // 传入 resolvePromise 集中处理
          resolvePromise(x, resolve, reject)
         } catch(error) {
           reject(error)
         }
       })
      } else if (this.status === REJECTED) {
        queueMicrotask(() => {
          try {
            // 调用失败回调，并且把原因返回
            const x = onRejected(this.reason)
            resolvePromise(promise2, x, resolve, reject)
          } catch (error) {
            reject(error)
          }
        })
      } else if (this.status === PENDING) {
        // 等待
      // 因为不知道后面状态的变化情况，所以将成功回调和失败回调存储起来
      // 等到执行成功失败函数的时候再传递
        this.onFulfilledCallback.push(onFulfilled)
        this.onRejectedCallback.push(onRejected)
      }
    })

    return promise2
  } 
  
}

function resolvePromise(x, resolve, reject) {
  // 如果相等了，说明return的是自己，抛出类型错误并返回
  if (promise2 === x) {
    return reject(new TypeError('Chaining cycle detected for promise #<Promise>'))
  }
  // 判断x是不是 MyPromise 实例对象
  if (x instanceof MyPromise) {
    // 执行 x，调用 then 方法，目的是将其状态变为 fulfilled 或者 rejected
    // x.then(value => resolve(value), reason => reject(reason))
    // 简化之后
    x.then(resolve, reject)
  } else {
    resolve(x)
  }
}

module.exports = MyPromise

```

> 基础面试版

```js
function myPromise(constructor) {
  let self = this
  self.status = 'pending' //定义状态改变前的初始状态
  self.value = undefined // 定义状态为resolved的时候的状态
  self.reason = undefined //定义状态为rejected的时候的状态

  function resolve(value) {
    //两个==="pending"，保证了状态的改变是不可逆的
    if (self.status === 'pending') {
      self.value = value
      self.status = 'resolved'
    }
  }

  function reject(reason) {
    //两个==="pending"，保证了状态的改变是不可逆的
    if (self.status === 'pending') {
      self.reason = reason
      self.status = 'reject'
    }
  }

  // 捕获构造异常
  try {
    constructor(resolve, reject)
  } catch (e) {
    reject(e)
  }
}

myPromise.prototype.then = function(onFullFilled, onRejected) {
  let self = this
  switch(self.status) {
    case 'resolve':
      onFullFilled(self.value)
      break
    case 'rejected':
      onRejected(self.reason)
      break
    default:
  }
}
```