

var string = '123456789'
string.__proto__[Symbol.iterator] = function() {
  let index = 0
  const _t  = this
  return {
    next: function() {
      const value = _t.slice(index, index + 2)
      const  result = { value , done: index >= _t.length }
      index += 2
      return result
    }
  }
}

for (let v of string) {
  console.log(v)
}

const iterator = string[Symbol.iterator]()

iterator.next()