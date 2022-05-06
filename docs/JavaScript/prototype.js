// 继承
// 定义好 Person
function Person(name = 'you name') {
  this.name = name
}
Person.prototype.getName = function () {
  return this.name
}

// 只 Person.call，继承了属性
function Teacher(name, subject) {
  Person.call(this, name)

  this.subject = subject
}
// 所以把要集成的方法。
Teacher.prototype = Object.create(Person.prototype)
// 但是上面的代码把构造器指向 Person, Teacher.prototype.constroctor = Person，所以要修正
Teacher.prototype.constructor = Teacher

const t = new Teacher('xiaoming', 'yinyu')
t.getName()

// es6继承
class Person {
  constructor(name) {
    this.name = name
  }

  getName() {
    return this.name
  }
}

class Teacher extends Person {
  constructor(name, age) {
    super(name)
    this.age = age
  }
}