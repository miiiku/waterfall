# fall
一个简易的懒加载瀑布流

![Travis (.org)](https://img.shields.io/travis/miiiku/fall.svg)
![License](https://img.shields.io/github/license/mashape/apistatus.svg)
![Language](https://img.shields.io/badge/language-JavaScript-orange.svg)

# 纵向布局

![v](./img/v.png)

# 横向布局

![h](./img/h.png)


# 使用1(根据数据渲染,适用于ajax请求之类)

## HTML

``` html
<!-- 瀑布流容器 -->
<div class="fall-box"></div>

<!-- 引入JS -->
<script src="waterfall.min.js"></script>
```

## JS

``` js
    var images = [
        { url: "https://qiniu.miiiku.xyz/attach/5b62b3a1db54f8076bb387c7/IMG_1788.jpg" },
        { url: "https://qiniu.miiiku.xyz/attach/5b62b3a1db54f8076bb387c7/IMG_1795.jpg" },
        { url: "https://qiniu.miiiku.xyz/attach/5b62b3a1db54f8076bb387c7/IMG_1789.jpg" },
        { url: "https://qiniu.miiiku.xyz/attach/5b62b3a1db54f8076bb387c7/IMG_1453.jpg" },
        { url: "https://qiniu.miiiku.xyz/attach/5b62b3a1db54f8076bb387c7/IMG_1597.jpg" },
        { url: "https://qiniu.miiiku.xyz/attach/5b62b3a1db54f8076bb387c7/IMG_1206.jpg" },
        { url: "https://qiniu.miiiku.xyz/attach/5b62b3a1db54f8076bb387c7/IMG_1108.jpg" },
    ]

    var images = [
        "https://qiniu.miiiku.xyz/attach/5b62b3a1db54f8076bb387c7/IMG_1788.jpg",
        "https://qiniu.miiiku.xyz/attach/5b62b3a1db54f8076bb387c7/IMG_1795.jpg",
        "https://qiniu.miiiku.xyz/attach/5b62b3a1db54f8076bb387c7/IMG_1789.jpg",
        "https://qiniu.miiiku.xyz/attach/5b62b3a1db54f8076bb387c7/IMG_1453.jpg",
        "https://qiniu.miiiku.xyz/attach/5b62b3a1db54f8076bb387c7/IMG_1597.jpg",
        "https://qiniu.miiiku.xyz/attach/5b62b3a1db54f8076bb387c7/IMG_1206.jpg",
        "https://qiniu.miiiku.xyz/attach/5b62b3a1db54f8076bb387c7/IMG_1108.jpg",
    ]

    window.onload = function () {
        waterfall(".fall-box", { datas: images })
    }
```

# 使用2(根据html标签渲染,适用于服务端渲染页面)

## HTML

``` html
<!-- 瀑布流容器 -->
<div class="fall-box">
    <!-- 图片内容 -->
    <div class="fall-item">
        <img data-src="https://qiniu.miiiku.xyz/attach/5b62b3a1db54f8076bb387c7/IMG_1788.jpg">
    </div>
    <div class="fall-item">
        <img data-src="https://qiniu.miiiku.xyz/attach/5b62b3a1db54f8076bb387c7/IMG_1795.jpg">
    </div>
    <div class="fall-item">
        <img data-src="https://qiniu.miiiku.xyz/attach/5b62b3a1db54f8076bb387c7/IMG_1789.jpg">
    </div>
    <div class="fall-item">
        <img data-src="https://qiniu.miiiku.xyz/attach/5b62b3a1db54f8076bb387c7/IMG_1453.jpg">
    </div>
    <div class="fall-item">
        <img data-src="https://qiniu.miiiku.xyz/attach/5b62b3a1db54f8076bb387c7/IMG_1597.jpg">
    </div>
    <div class="fall-item">
        <img data-src="https://qiniu.miiiku.xyz/attach/5b62b3a1db54f8076bb387c7/IMG_1206.jpg">
    </div>
    <div class="fall-item">
        <img data-src="https://qiniu.miiiku.xyz/attach/5b62b3a1db54f8076bb387c7/IMG_1108.jpg">
    </div>
</div>

<!-- 引入JS -->
<script src="waterfall.min.js"></script>
```

## JS

``` js
    window.onload = function() {
        waterfall(".fall-box")
    }
```


# options

``` js
    {
        direction   : String,       // 布局模式（v,h）
        datas       : Array,        // 图片的数据 默认: null
        baseWidth   : Number,       // 图片的基准宽度 默认: 250（垂直布局）
        baseHeight  : Number,       // 图片的基准高度 默认: 260（水平布局）
        spacing     : Number,       // 间距 默认: 10
        accuracy    : Number,       // 精度 默认: 2
        rowClass    : String,       // 一行的className（水平布局）
        itemClass   : String,       // 单张图的className(垂直布局/水平布局)
    }
```


# LICENSE

MIT ©️ [miiiku](https://github.com/miiiku)