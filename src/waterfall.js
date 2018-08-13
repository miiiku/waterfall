// 一个简单的瀑布流 by guanq

(function(win, factory) {
    if (typeof module === 'object' && module.export) {
        module.exports = factory
    } else {
        win.waterfall = factory
    }
}(window, function waterfall (root, options) {

    var container, images, unloadImages, col, colW, table;

    var spacing     = options.spacing   || 10
    var minWidth    = options.minWidth  || 350
    var datas       = options.datas     || null
    var bgColor     = options.bgColor   || "#CCCCCC"

    const init = () => {
        if (!root || typeof root != "string") return

        container  = document.querySelector(root)

        if (datas && datas.length > 0) {
            container.innerHTML = ""
            createImages()
        }

        images = Array.from(container.children)
        unloadImages = images.concat()
        if (!images.length) return

        container.style.position = "relative"
        window.onresize = resizeEvent
        window.onscroll = scrollEvent
        resizeEvent()
        scrollEvent()
    }

    const createImages = () => {
        var images = ""
        datas.forEach(item => {
            images += `
                <div class="fall-item" ${item.color ? "data-color='" + item.color + "'" : ""} >
                    <img data-width="${item.width}" data-height="${item.height}" data-src="${item.url}" style="display: block; width: 100%; max-width: 100%;" />
                </div>
            `
        })
        container.innerHTML = images
    }

    const px = (number) => {
        return parseInt(number) + 'px'
    }

    const getMinCol = (g) => {
        var n = 0

        for (let i in g) {
            if (g[i] < g[n]) n = i
        }

        return n
    }

    const getMaxCol = (g) => {
        var n = 0

        for (let i in g) {
            if (g[i] > g[n]) n = i
        }

        return n
    }

    const getBound = (img) => {
        var bound = img.getBoundingClientRect()
        var clientHeight = window.innerHeight
        return bound.top <= clientHeight
    }

    const loadImage = (imgItem, index) => {
        var img = imgItem.querySelector("img")
        var src = img.dataset.src
        img.src = src
        unloadImages.splice(index, 1)
    }

    const setpo = () => {
        images.forEach(item => {
            const img   = item.querySelector("img")
            var color   = item.dataset.color || bgColor
            var width   = img.dataset.width
            var height  = img.dataset.height
            var ratio   = colW / width
            var colH    = height * ratio

            if (color.indexOf('0x') >= 0) {
                color = "#" + color.substring(color.length - 6)
            }

            var minColNum = getMinCol(table)
    
            var minHeight = table[minColNum] || 0

            item.style.position = "absolute"
            item.style.top = px(minHeight)
            item.style.left = px((colW + spacing) * minColNum + spacing)
            item.style.width = px(colW)
            item.style.height = px(colH)
            item.style.backgroundColor = color
    
            table[minColNum] = minHeight + colH + spacing
        })

        var maxColNum = getMaxCol(table)
        container.style.height = px(table[maxColNum])
    }

    const resizeEvent = () => {
        // 获取列数和每个item的宽度
        col = Math.floor((container.clientWidth - spacing) / (minWidth + spacing))
        colW = Math.floor((container.clientWidth - spacing) / col - spacing)
        table = {}

        // 如果图片少于列数，平分居中
        if (images.length < col) {
            col = images.length
            colW = Math.floor((container.clientWidth - spacing) / col - spacing)
        }

        for (let i = 0; i < col; i++) { table[i] = 0 }
        setpo()
    }

    const scrollEvent = () => {
        if (unloadImages.length < 1) return
        for (let i = unloadImages.length; i--;) {
            getBound(unloadImages[i]) && loadImage(unloadImages[i], i)
        }
    }

    init()
}))