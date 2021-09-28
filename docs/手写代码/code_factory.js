// promise 封装

function getJSON(url) {
  let promise = new Promise(function(resolve, reject) {
    let xhr = new XMLHttpRequest()

    xhr.open('GET', url, true)

    xhr.onreadystatechange = function() {
      if (this.readyState !== 4) return 
      if (this.readyState === 200) {
        resolve(this.response)
      } else {
        reject(new Error(this.statusText))
      }
    }

    xhr.onerror =  function() {
      reject(new Error(this.statusText))
    }

    xhr.responseType = 'json'

    xhr.setRequestHeader('Accept', 'application/json')

    xhr.send(null)

    return promise
  })
}

// 构造函数的写法
//es5
 function Person(firstName, lastName, age, address) {
   this.firstName = firstName
   this.lastName = lastName
   this.age = age
   this.address = address
 }

 Person.self = function () {
   return this
 }

 Person.prototype.toString = function() {
   return '[object Person]'
 }

 Person.prototype.getFullName = function() {
   return this.firstName + '' + this.lastName
 }

 // es6
 class Person {
   constructor(firstName, lastName, age, address) {
     this.lastName = lastName
     this.firstName = firstName
     this.age = age
     this.address = address
   }

   static self () {
     return this
   }

   toString() {
     return 'object Person'
   }

   getFullName() {
     return `${this.firstName} ${this.lastName}`
   }
 }

 // 封装一个通用事件的侦听函数
 const EventUtils = {
   // 视能力分别使用dom0 || dom2 || IE方式来绑定事件
   // 添加事件

   addEvent: function(element, type, handler) {
     if (element.addEventListener) {
       element.addEventListener(type, handler, false)
     } else if (element.attachEvent) {
       element.attachEvent('on'+type, handler)
     } else {
       element['on'+ type] = handler
     }
   },

   // 移除事件
   removeEvent: function(element, type, handler) {
     if (element.removeEventListener) {
       element.removeEventListener(type, handler, false)
     } else if (element.detachEvent) {
       element.detachEvent('on' +type, handler)
     } else {
       element['on'+type] = null
     }
   },

   // 获取事件目标
   getTarget: function(event) {
     return event.target || event.srcElement
   },

   // 获取event对象的引用，获取事件的所有信息，确保随时能使用event
   getEvent: function(event) {
     return event | window.event
   },

   // 阻止事件（主要是事件冒泡，因为iE不支持事件捕获）
   stopPropagation: function(event) {
     if (event.stopPropagation) {
       event.stopPropagation()
     } else {
       event.cancelBubble = true
     }
   },

   // 取消事件的默认行为
   preventDefault: function(event) {
     if (event.preventDefault) {
       event.preventDefault()
     } else {
       event.returnValue = false
     }
   }

 }

//  Array.prototype.map 的实现
// map() 方法创建一个新数组，其结果是该数组中的每个元素都调用一个提供的函数后返回的结果。

function map(arr, mapCallback) {
  // 首先，检查传递的参数是否正确。
  if (!Array.isArray(arr) || !arr.length || typeof mapCallback !== 'function') {
    return []
  } else {
    let result = []
    // 每次调用此函数时，我们都会创建一个result数组
    // 因为不想改变原始数组
    for (let i = 0, len = arr.length;i < len; i++) {
      // 将mapCallback返回的结果push搭配result数组中
      result.push(mapCallback(arr[i], i, arr))
    }

    return result
  }
}

// Array.prototype.filter 的实现

// filter() 方法创建一个新数组, 其包含通过所提供函数实现的测试的所有元素

function filter(arr, filterCallback) {
  // 检查传递的参数是否正确

  if (!Array.isArray(arr) || !arr.length || typeof filterCallback !== 'function') {
    return []
  } else {
    let result = []
    // 每次调用此函数时，我们都会创建一个 result 数组
     // 因为我们不想改变原始数组。
     for (let i = 0, len = arr.length; i < len; i++) {
       // 检查filterCallback的返回值是否是真值
       if (filterCallback(arr[i], i, arr)) {
         // 如果条件为真，则将数组元素 push 到 result 中
         result.push(arr[i])
       }
     }
     // return the result array
     return result
  }
}

// Array.prototype.reduce的实现
// reduce() 方法对数组中的每个元素执行一个由您提供的reducer函数(升序执行)，将其结果汇总为单个返回值。

function reduce(arr, reduceCallback, initialValue) {
  // 首先，检查传递的参数是否正确。
  if (!Array.isArray(arr) || !arr.length || typeof reduceCallback !== 'function') 
  {
    return [];
  } else {
    // 如果没有将initialValue传递给该函数，我们将使用第一个数组项作为initialValue
    let hasInitialValue = initialValue !== undefined
    let value = hasInitialValue ? initialValue : arr[0] // 兼容不传第三个参数

    // 如果有传递 initialValue，则索引从 1 开始，否则从 0 开始
    for (let i = hasInitialValue ? 1 : 0, len = arr.length; i < len; i++) {
      value = reduceCallback(value, arr[i], i, arr)
    }

    return value
  }
}

// 深拷贝

// 基础版 （面试）
// 浅拷贝+递归 （只考虑了普通的 object和 array两种数据类型）
function cloneDeep(target, map = new WeakMap()) {
  if (typeof target === 'object') {
    let cloneTarget = Array.isArray(target) ? [] : {}

    if (map.get(target)) {
      return target
    }

    map.set(target, cloneTarget)
    
    for (const key in target) {
      cloneTarget[key] = cloneTarget(target[key], map)
    }
    return cloneTarget
  } else {
    return target
  }
}

// 终极版

const mapTag = '[object Map]';
const setTag = '[object Set]';
const arrayTag = '[object Array]';
const objectTag = '[object Object]';
const argsTag = '[object Arguments]';

const boolTag = '[object Boolean]';
const dateTag = '[object Date]';
const numberTag = '[object Number]';
const stringTag = '[object String]';
const symbolTag = '[object Symbol]';
const errorTag = '[object Error]';
const regexpTag = '[object RegExp]';
const funcTag = '[object Function]';

const deepTag = [mapTag, setTag, arrayTag, objectTag, argsTag];


function forEach(array, iteratee) {
    let index = -1;
    const length = array.length;
    while (++index < length) {
        iteratee(array[index], index);
    }
    return array;
}

function isObject(target) {
    const type = typeof target;
    return target !== null && (type === 'object' || type === 'function');
}

function getType(target) {
    return Object.prototype.toString.call(target);
}

function getInit(target) {
    const Ctor = target.constructor;
    return new Ctor();
}

function cloneSymbol(targe) {
    return Object(Symbol.prototype.valueOf.call(targe));
}

function cloneReg(targe) {
    const reFlags = /\w*$/;
    const result = new targe.constructor(targe.source, reFlags.exec(targe));
    result.lastIndex = targe.lastIndex;
    return result;
}

function cloneFunction(func) {
    const bodyReg = /(?<={)(.|\n)+(?=})/m;
    const paramReg = /(?<=\().+(?=\)\s+{)/;
    const funcString = func.toString();
    if (func.prototype) {
        const param = paramReg.exec(funcString);
        const body = bodyReg.exec(funcString);
        if (body) {
            if (param) {
                const paramArr = param[0].split(',');
                return new Function(...paramArr, body[0]);
            } else {
                return new Function(body[0]);
            }
        } else {
            return null;
        }
    } else {
        return eval(funcString);
    }
}

function cloneOtherType(targe, type) {
    const Ctor = targe.constructor;
    switch (type) {
        case boolTag:
        case numberTag:
        case stringTag:
        case errorTag:
        case dateTag:
            return new Ctor(targe);
        case regexpTag:
            return cloneReg(targe);
        case symbolTag:
            return cloneSymbol(targe);
        case funcTag:
            return cloneFunction(targe);
        default:
            return null;
    }
}

function clone(target, map = new WeakMap()) {

    // 克隆原始类型
    if (!isObject(target)) {
        return target;
    }

    // 初始化
    const type = getType(target);
    let cloneTarget;
    if (deepTag.includes(type)) {
        cloneTarget = getInit(target, type);
    } else {
        return cloneOtherType(target, type);
    }

    // 防止循环引用
    if (map.get(target)) {
        return map.get(target);
    }
    map.set(target, cloneTarget);

    // 克隆set
    if (type === setTag) {
        target.forEach(value => {
            cloneTarget.add(clone(value, map));
        });
        return cloneTarget;
    }

    // 克隆map
    if (type === mapTag) {
        target.forEach((value, key) => {
            cloneTarget.set(key, clone(value, map));
        });
        return cloneTarget;
    }

    // 克隆对象和数组
    const keys = type === arrayTag ? undefined : Object.keys(target);
    forEach(keys || target, (value, key) => {
        if (keys) {
            key = value;
        }
        cloneTarget[key] = clone(target[key], map);
    });

    return cloneTarget;
}

module.exports = {
    clone
};


// instanceof
function myInstanceof(left, right) {
  let prototype = right.prototype
  left = left.__proto__
  while(true) {
    if (left === null || left === undefined) 
      return false
  
    if (prototype == left) 
      return true
    left = left.__proto__
  }
}

// 手写promise（面试版）

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

// new 的实现

function objectFactory(){
  var obj = {};
  //取得该方法的第一个参数(并删除第一个参数)，该参数是构造函数
  var Constructor = [].shift.apply(arguments);
  //将新对象的内部属性__proto__指向构造函数的原型，这样新对象就可以访问原型中的属性和方法
  obj.__proto__ = Constructor.prototype;
  //取得构造函数的返回值
  var ret = Constructor.apply(obj, arguments);
  //如果返回值是一个对象就返回该对象，否则返回构造函数的一个实例对象
  return typeof ret === "object" ? ret : obj;
}


// 函数柯里化的实现

function curry(fn, args) {
  let length = fn.length
  args = args || []

  return function() {
    let subArgs = args.slice(0)

    for (let i = 0; i < arguments.length; i++) {
      subArgs.push(arguments[i])
    }

    if (subArgs.length >= length) {
      return fn.apply(this, subArgs)
    } else {
      return curry.call(this, fn , subArgs)
    }
  }
}