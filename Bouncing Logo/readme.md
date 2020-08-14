### Bouncing 代码编写总结

#### 通过 canvas 画布进行字体的绘制

```html
<svg
  xmlns="http://www.w3.org/2000/svg"
  id="label"
  viewBox="0 0 138 26"
  fill="none"
  stroke="#26de81"
  stroke-width="2.3"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path
    d="M80 6h-9v14h9 M114 6h-9 v14h9 M111 13h-6 M77 13h-6 M122 20V6l11 14V6 M22 16.7L33 24l11-7.3V9.3L33 2L22 9.3V16.7z M44 16.7L33 9.3l-11 7.4 M22 9.3l11 7.3 l11-7.3 M33 2v7.3 M33 16.7V24 M88 14h6c2.2 0 4-1.8 4-4s-1.8-4-4-4h-6v14 M15 8c-1.3-1.3-3-2-5-2c-4 0-7 3-7 7s3 7 7 7 c2 0 3.7-0.8 5-2 M64 13c0 4-3 7-7 7h-5V6h5C61 6 64 9 64 13z"
  />
</svg>
```

#### 页面加载后第一步

- **获取页面元素及添加变量**

```javascript
const body = document.querySelector("body");
const label = document.querySelector("#label");
//添加元素值数组，通过改变下标来随机改变颜色
let colors = [
  "#26de81",
  "#fc5c65",
  "#fd9644",
  "#fed330",
  "#2bcbba",
  "#45aaf2",
  "#4b7bec",
  "#a55eea",
  "#ffc1f3",
  "#76ead7",
  "#ff9c71",
  "#32e0c4",
  "#d291bc",
  "#fa744f",
];
//设置元素移动的速度比值
let FPS = 60;
//页面的宽，高，对应时间内左右上下移动的距离，是否可以移动，初始颜色
let width,
  height,
  velocityX = 1,
  velocityY = 1,
  pause = true,
  previousColor = 0;
```

- **获取相对应的页面宽高**

```JavaScript
width =
  window.innerWidth ||
  document.documentElement.clientWidth ||
  document.body.clientWidth;
heigth =
  window.innerHeight ||
  document.documentElement.clientHeight ||
  document.body.clientHeight;
```

- **根据页面的宽高和元素的宽高做对比，判断元素是否够移动**

```JavaScript
pause =
  width <=label.getBouncingClientRect().width ||
  height<=label.getBouncingClientRect().height;
```

- **设置元素的居中和 canvas 字体的颜色填充**

```JavaScript
label.style.left = "calc(50vw - 150px);
label.style.top = "calc(50vh - 28px);
label.style.stroke = color[0];
```

#### 页面加载完成后执行动画

```javascript
//使用setInterval()函数来改变元素的left和top值
setInterval(() => {
  //判断动画是否可移动
  if (pause) return;
  //获取元素的位置和自身属性
  let rect = label.getBouncingClientRect();
  let left = rect.x;
  let top = rect.y;
  if (left + rect.width >= width || left <= 0) {
    velocityX = -velocityX;
    //碰触边界时改变颜色
    //·······
  }
  label.style.left = rect.x + velocityX + "px";
  if (top + rect.height >= height || top <= 0) {
    velocityY = -velocityY;
    //碰触边界时改变颜色
    //·······
  }
  label.style.top = rect.x + velocityY + "px";
}, 1000 / FPS);
```

#### 触碰边界改变颜色

```javascript
//左右
let randomColor = getRandomColor();
label.style.stroke = randomColor;
if (left + 150 <= width / 2) {
  body.style.boxShadow = `inset 4px 0px 0px 0px ${randomColor}`;
} else {
  body.style.boxShadow = `inset -4px 0px 0px 0px ${randomColor}`;
}
//上下
let randomColor = getRandomColor();
label.style.stroke = randomColor;
if (top + 28 <= height / 2) {
  body.style.boxShadow = `inset 0px 4px 0px 0px ${randomColor}`;
} else {
  body.style.boxShadow = `inset 0px -4px 0px 0px ${randomColor}`;
}
```

#### 相对应的颜色改变

```javascript
const getRandomColor = () => {
  let currentColor = -1;
  do {
    currentColor = Math.floor(Math.random() * colors.length);
  } while (previousColor == currentColor);
  previousColor = currentColor;
  return colors[currentColor];
};
```

#### 页面改变后的重置

```javascript
window.addEventListener("resize", reset, true);
```
