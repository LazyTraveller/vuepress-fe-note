### new操作符的实现

new 关键字会进行如下的操作：

- 创建一个空的简单JavaScript对象（即{}）；
- 链接该对象（即设置该对象的构造函数）到另一个对象 ；
- 将步骤1新创建的对象作为this的上下文 ；
- 如果该函数没有返回对象，则返回this。

> 例子
```js
function Dog(name, color, age) {
  this.name = name;
  this.color = color;
  this.age = age;
}

Dog.prototype={
  getName: function() {
    return this.name
  }
}

var dog = new Dog('大黄', 'yellow', 3)


```

第一步：创建一个简单空对象
```js
var obj = {}
```

第二步：链接该对象到另一个对象（原型链）
```js
// 设置原型链
obj.__proto__ = Dog.prototype
```

第三步：将步骤1新创建的对象作为 this 的上下文
```js
// this指向obj对象
Dog.apply(obj, ['大黄', 'yellow', 3])

```

第四步：如果该函数没有返回对象，则返回this
```js
// 因为 Dog() 没有返回值，所以返回obj
var dog = obj
dog.getName() // '大黄'

```

需要注意的是如果 Dog() 有 return 则返回 return的值
```js
var rtnObj = {}
function Dog(name, color, age) {
  // ...
  //返回一个对象
  return rtnObj
}

var dog = new Dog('大黄', 'yellow', 3)
console.log(dog === rtnObj) // true

```
接下来我们将以上步骤封装成一个对象实例化方法，即模拟new的操作：

```js
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


```
