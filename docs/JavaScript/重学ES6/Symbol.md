
### Symbols

生成一个独一无二的值

Symbols 在 for ... in 迭代中不可枚举

在对象中获取 Symbol 属性
Object.getOwnPropertySymbols()

typeof Symbol() // symbol
Object.prototype.toString.call(Symbol()) // [object Symbol]

#### 使用场景

- 替代字符串作标识，字符串可能冲突。
- 比如浮层类型，可以用 symbol 去定义