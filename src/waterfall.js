// 一个简单的瀑布流 by guanq

(function(win, factory) {
    if (typeof module === 'object' && module.export) {
        module.exports = factory
    } else {
        win.waterfall = factory
    }
}(window, function waterfall (root, options = {}) {

    var container, images, unloadImages, col, colW, table;

    var spacing     = options.spacing   || 10
    var minWidth    = options.minWidth  || 350
    var datas       = options.datas     || null
    var bgColor     = options.bgColor   || "#CCCCCC"
    var parentBox   = options.parentBox ? document.querySelector(options.parentBox) : window

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

        images.forEach(item => {
            let img = item.querySelector("img")
            img.style.display = "block"
            img.style.width = "100%"
            img.style.maxWidth = "100%"
        })

        container.style.position = "relative"

        window.addEventListener("resize", resizeEvent)
        parentBox.addEventListener("scroll", scrollEvent)
        
        resizeEvent()
        scrollEvent()
    }

    const createImages = () => {
        var images = ""
        datas.forEach(item => {
            images += `
                <div class="fall-item" ${item.color ? "data-color='" + item.color + "'" : ""} >
                    <img data-width="${item.width}" data-height="${item.height}" data-src="${item.url}" />
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
        var top = img.getBoundingClientRect().top

        if (parentBox.innerHeight) {
            return top <= parentBox.innerHeight
        } else {
            return top <= parentBox.clientHeight + parentBox.getBoundingClientRect().top
        }
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

        // 取消滚动条
        if (table[maxColNum] > parentBox.innerHeight || parentBox.clientHeight) {
            setTimeout(() => { resizeEvent() }, 0)
        }
    }

    const resizeEvent = () => {
        // 获取列数和每个item的宽度
        col = Math.floor((container.clientWidth - spacing) / (minWidth + spacing))

        // 如果容器宽度小于了图片最小宽度，默认为1列
        if (col < 1) col = 1

        colW = Math.floor((container.clientWidth - spacing) / col - spacing)

        // 如果图片少于列数，平分居中
        if (images.length < col) {
            col = images.length
            colW = Math.floor((container.clientWidth - spacing) / col - spacing)
        }
        
        table = {}

        for (let i = 0; i < col; i++) { table[i] = spacing }
        
        setpo()
    }

    const scrollEvent = () => {
        if (unloadImages.length < 1) return parentBox.removeEventListener("scroll", scrollEvent)
        for (let i = unloadImages.length; i--;) {
            getBound(unloadImages[i]) && loadImage(unloadImages[i], i)
        }
    }

    init()
}))