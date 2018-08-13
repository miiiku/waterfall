# fall
一个简易的懒加载瀑布流

![Travis (.org)](https://img.shields.io/travis/miiiku/fall.svg)
![License](https://img.shields.io/github/license/mashape/apistatus.svg)
![Language](https://img.shields.io/badge/language-JavaScript-orange.svg)


# 使用1(根据数据渲染,适用于ajax请求之类)

## HTML

``` html
<!-- 瀑布流容器 -->
<div class="fall-box"></div>

<!-- 引入JS -->
<script src="waterfall.min.js"></script>
```

## JS

``` js
    var images = [
        {
            width: "4032",
            height: "3024",
            color: "0x868c7f",
            url: "https://qiniu.miiiku.xyz/attach/5b62b3a1db54f8076bb387c7/IMG_1788.jpg",
        },
        {
            width: "3024",
            height: "4032",
            color: "0x757368",
            url: "https://qiniu.miiiku.xyz/attach/5b62b3a1db54f8076bb387c7/IMG_1795.jpg",
        },
        {
            width: "3024",
            height: "4032",
            color: "0x899685",
            url: "https://qiniu.miiiku.xyz/attach/5b62b3a1db54f8076bb387c7/IMG_1789.jpg",
        },
        {
            width: "4032",
            height: "3024",
            color: "0x74746f",
            url: "https://qiniu.miiiku.xyz/attach/5b62b3a1db54f8076bb387c7/IMG_1453.jpg",
        },
        {
            width: "3024",
            height: "4032",
            color: "0x966e3f",
            url: "https://qiniu.miiiku.xyz/attach/5b62b3a1db54f8076bb387c7/IMG_1597.jpg",
        },
        {
            width: "3024",
            height: "4032",
            color: "0x61574c",
            url: "https://qiniu.miiiku.xyz/attach/5b62b3a1db54f8076bb387c7/IMG_1206.jpg",
        },
        {
            width: "3024",
            height: "4032",
            color: "0x698b94",
            url: "https://qiniu.miiiku.xyz/attach/5b62b3a1db54f8076bb387c7/IMG_1108.jpg",
        }
    ]

    window.onload = function () {
        waterfall(".fall-box", { datas: images })
    }
```

# 使用2(根据html标签渲染,适用于服务端渲染页面)

## HTML

``` html
<!-- 瀑布流容器 -->
<div class="fall-box">
    <!-- 图片内容 -->
    <div class="fall-item" data-color="0x868c7f">
        <img data-width="4032" data-height="3024" data-src="https://qiniu.miiiku.xyz/attach/5b62b3a1db54f8076bb387c7/IMG_1788.jpg">
    </div>
    <div class="fall-item" data-color="0x757368">
        <img data-width="3024" data-height="4032" data-src="https://qiniu.miiiku.xyz/attach/5b62b3a1db54f8076bb387c7/IMG_1795.jpg">
    </div>
    <div class="fall-item" data-color="0x899685">
        <img data-width="3024" data-height="4032" data-src="https://qiniu.miiiku.xyz/attach/5b62b3a1db54f8076bb387c7/IMG_1789.jpg">
    </div>
    <div class="fall-item" data-color="0x74746f">
        <img data-width="4032" data-height="3024" data-src="https://qiniu.miiiku.xyz/attach/5b62b3a1db54f8076bb387c7/IMG_1453.jpg">
    </div>
    <div class="fall-item" data-color="0x966e3f">
        <img data-width="3024" data-height="4032" data-src="https://qiniu.miiiku.xyz/attach/5b62b3a1db54f8076bb387c7/IMG_1597.jpg">
    </div>
    <div class="fall-item" data-color="0x61574c">
        <img data-width="3024" data-height="4032" data-src="https://qiniu.miiiku.xyz/attach/5b62b3a1db54f8076bb387c7/IMG_1206.jpg">
    </div>
    <div class="fall-item" data-color="0x698b94">
        <img data-width="3024" data-height="4032" data-src="https://qiniu.miiiku.xyz/attach/5b62b3a1db54f8076bb387c7/IMG_1108.jpg">
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
        datas   : Array,        // 图片的数据 默认: null
        minWidth: Number,       // 图片的最小宽度 默认: 350
        spacing : Number,       // 间距 默认: 10
        bgColor : String,       // 图片格子的背景颜色 默认: #CCCCCC
    }
```

## datas *data format*

``` js
    {
        width   : Number,       // 图片的原始宽度
        height  : Number,       // 图片的原始高度
        url     : String,       // 图片的地址
        color   : String,       // 图片的主色调 可不填(默认为bgColor)
    }
```

### color和bgColor支持的格式: *rgb(204, 204, 204)*, *rgba(204, 204, 204, 1)*, *#CCCCCC*, *0xCCCCCC*


# LICENSE

MIT ©️ [miiiku](https://github.com/miiiku)