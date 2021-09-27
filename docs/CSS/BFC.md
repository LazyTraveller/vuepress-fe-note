### BFC

**块级格式化上下文**，是一个独立的渲染区域，让处于 BFC 内部的元素与外部的元素相互隔离，使内外元素的定位不会相互影响。

不同类型的盒子有不同格式化上下文，大概有这 4 类：

- BFC (Block Formatting Context) 块级格式化上下文；
- IFC (Inline Formatting Context) 行内格式化上下文；
- FFC (Flex Formatting Context) 弹性格式化上下文；
- GFC (Grid Formatting Context) 格栅格式化上下文；

> IE 下为 Layout，可通过 zoom:1 触发
其中 BFC 和 IFC 在 CSS 中扮演着非常重要的角色，因为它们直接影响了网页布局。

块格式化上下文，它是一个独立的渲染区域，只有块级盒子参与，它规定了内部的块级盒子如何布局，并且与这个区域外部毫不相干

- 触发条件:

   - 根元素（`html`）

   - 浮动元素（`float` 不为 `none`）

   - 绝对固定定位元素（`position` 为 `absolute` 或 `fixed`）

   - 表格的标题和单元格（`display` 为 `table-caption`，`table-cell`）

   - 匿名表格单元格元素（`display` 为 `table` 或 `inline-table`）

   - 行内块元素（`display` 为 `inline-block`）

   - `overflow` 的值不为 `visible` 的元素

     
- 规则:

  - 属于同一个 BFC 的两个相邻 Box 垂直排列

  - 属于同一个 BFC 的两个相邻 Box 的 margin 会发生重叠

  - BFC 中子元素的 margin box 的左边， 与包含块 (BFC) border box 的左边相接触 (子元素 absolute 除外)

  - BFC 的区域不会与 float 的元素区域重叠

  - 计算 BFC 的高度时，浮动子元素也参与计算 - 文字层不会被浮动层覆盖，环绕于周围

    

- 应用
  
  - 阻止`margin`重叠
  
  - 可以包含浮动元素 —— 清除内部浮动(清除浮动的原理是两个`div`都位于同一个 BFC 区域之中)
  
  - 自适应两栏布局
  
  - 可以阻止元素被浮动元素覆盖
  
    
```html
<h3>BFC 应用示例 1：两栏自适应布局</h3>
<div class="layout">
  <div class="aside">aside</div>
  <div class="main">main</div>
</div>
<div class="split"></div>
<h3>BFC 应用示例 2：清除浮动</h3>
<div class="parent">
  <div class="child">child</div>
  <div class="child">child</div>
</div>
<div class="split"></div>
<h3>BFC 应用示例 3：防止垂直 margin 合并</h3>
<div class="demo3">
  <div class="a">a</div>
  <div class="contain-b">
    <div class="b">b</div>
  </div>
</div>
```
```css
.layout {
  width: 100%;
  height: 30px;
}
.split {
  padding: 30px 0;
}
.aside {
  float: left;
  width: 80px;
  height: 100%;
  background-color: orange;
  color: #fff;
}
.main {
  overflow: hidden;
  height: 100%;
  background-color: #03a9f4;
  color: #fff;
}
.parent {
  background-color: orange;
  overflow: hidden;
}
.child {
  float: left;
  width: 100px;
  height: 30px;
  border: 1px solid #999;
}
.demo3 .a,
.demo3 .b {
  border: 1px solid #999;
  margin: 10px;
}
.contain-b {
  overflow: hidden;
}
```
  
- BFC的范围:

> A block formatting context contains everything inside of the element creating it, that is not also inside a descendant element that creates a new block formatting context.

- 直译过来就是, `BFC`包含创建它的元素的所有子元素, 但不包括创建了新`BFC`的子元素的内部元素
 - 简单来说，子元素如果又创建了一个新的 `BFC`，那么它里面的内容就不属于上一个 `BFC` 了，这体现了 `BFC` **隔离** 的思想
- 也就是所说，**一个元素不能同时存在于两个 BFC 中**。