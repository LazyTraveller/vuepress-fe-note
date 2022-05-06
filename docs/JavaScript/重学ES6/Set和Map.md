### {} 和 Map

#### Map 
- 健可以是任意值，string、function、obj、any
- 健是有序的，按插入的顺序
- size
- 迭代。直接可迭代。 obj 需要获取keys才迭代。
- 性能上频繁操作表现良好


#### map 方法
- clear
- delete
- entries
- has
- keys
- set
- values

#### WeekMap

键必须是对象
对 key 的引用是弱引用
缺点：
- 没法被遍历
优点：
- 因为对key是弱引用，所以js的回收机制，可以释放内存