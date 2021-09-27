### 1、实现三角形

```css
div {
    border-top-color: #ffc107;
    border-right-color: #00bcd4;
    border-bottom-color: #e26b6b;
    border-left-color: #cc7cda;
    border-width: 50px;
    border-style: solid;
}

```

用 transparent 实现三角形的原理：

- 首先宽高必须是 0px，通过边框的粗细来填充内容；
- 那条边需要就要加上颜色，而不需要的边则用 transparent；
- 想要什么样姿势的三角形，完全由上下左右 4 条边的中有颜色的边和透明的边的位置决定；
- 等腰三角形：设置一条边有颜色，然后紧挨着的 2 边是透明，且宽度是有颜色边的一半；直角三角形：设置一条边有颜色，然后紧挨着的任何一边透明即可。


### 2、增大点击区域

常常在移动端的时候点击的按钮的区域特别小，但是由于现实效果又不太好把它做大，所以常用的一个手段就是通过透明的边框来增大按钮的点击区域：

```css
.btn {
    border: 5px solid transparent;
}

```

### 3、自定义属性
自定义属性必须通过 --x 的格式申明，比如：--theme-color: red; 使用自定义属性的时候，需要用 var 函数。比如：
```css
<!-- 定义自定义属性 -->
:root {
    --theme-color: red;
}

<!-- 使用变量 -->
h1 {
    color: var(--theme-color);
}

```

### 4、1px 边框解决方案
Retina 显示屏比普通的屏幕有着更高的分辨率，所以在移动端的 1px 边框就会看起来比较粗，为了美观通常需要把这个线条细化处理
[7种方法解决移动端Retina屏幕1px边框问题](https://www.jianshu.com/p/7e63f5a32636)


一种通过伪类和 transform 实现的相对完美的解决方案
只设置单条底部边框：

```css
.scale-1px-bottom {
    position: relative;
    border:none;
}
.scale-1px-bottom::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    background: #000;
    width: 100%;
    height: 1px;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
}

```
同时设置 4 条边框：

```css
.scale-1px {
    position: relative;
    margin-bottom: 20px;
    border:none;
}
.scale-1px::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    border: 1px solid #000;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 200%;
    height: 200%;
    -webkit-transform: scale(0.5);
    transform: scale(0.5);
    -webkit-transform-origin: left top;
    transform-origin: left top;
}

```



### 长文本处理

- 默认：字符太长溢出了容器

- 字符超出部分换行

```css
.wrap {
    overflow-wrap: break-word
}
```

- 字符超出位置使用连字符
```css 
.hyphens {
    hyphens: auto
}
```

- 单行文本超出省略
```css
.ellipsis {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
```

- 多行文本超出省略

```css
.line-clamp {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}
```

