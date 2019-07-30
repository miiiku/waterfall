// 一个简单的瀑布流 by guanq

(function(win, factory) {
    if (typeof module === 'object' && module.export) {
        module.exports = factory
    } else {
        win.waterfall = factory
    }
}(window, function waterfall (root, options = {}) {

    var container, images, unloadImages, table;

    var direction       = options.direction     || "vertical"
    var spacing         = options.spacing       || 20
    var baseWidth       = options.baseWidth     || 350
    var baseHeight      = options.height        || 260
    var datas           = options.datas         || null
    var bgColor         = options.bgColor       || "#CCCCCC"
    var parentBox       = options.parentBox ? document.querySelector(options.parentBox) : window

    const throttle = (fn, delay) => {
        let timer = null
        return () => {
            clearTimeout(timer)
            timer = setTimeout(() => fn.bind(this)(arguments), delay)
        }
    }

    const weight = function (weight) {
        let arrs = Array.from(arguments).splice(1, arguments.length)
        let value = weight
        let minValue = weight
        arrs.forEach(item => {
            let v = Math.abs(item - weight)
            if (v < minValue) {
                minValue = v
                value = item
            }
        })
        return value
    }

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
                <div class="fall-item" ${item.color ? "data-color='" + item.color + "'" : ""} style="height: 100%;" >
                    <img data-width="${item.width}" data-height="${item.height}" data-src="${item.url}" />
                </div>
            `
        })
        container.innerHTML = images
    }

    const px = (number) => {
        return number + 'px'
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

    const horizontalRender = () => {
        // 获取一行的宽度
        let rwt = container.clientWidth
        let rwc = 0
        let row = {
            height: baseHeight,
            children: [],
        }
        table = []

        // 清空内容
        container.innerHTML = ""

        const reset = () => {
            table.push(row)
            rwc = 0
            row = {
                height: baseHeight,
                children: [],
            }
        }

        images.forEach((item, index) => {
            let image = item.querySelector('img')
            let w = (baseHeight / image.dataset.height) * image.dataset.width

            image.style.height = "100%"

            if (row.children.length > 0) {
                w += spacing
                item.style.marginLeft = spacing + 'px'
            }

            if (rwc + w > rwt) {
                let exceed = rwc + w
                let result = weight(rwt, rwc, exceed)
                let scale = rwt / result
                row.height = baseHeight * scale
                if (result === rwc) {
                    reset()
                    return
                }
            }

            rwc += w
            row.children.push(item)

            if (index >= images.length - 1) {
                reset()
            }
        })

        table.forEach((row, index) => {
            let flexRow = document.createElement("div")
            flexRow.style.display = "flex"
            flexRow.style.height = row.height + 'px'

            if (index < table.length - 1) {
                flexRow.style.justifyContent = "space-between"
                flexRow.style.marginBottom = spacing + "px"
            }

            flexRow.append(...row.children)
            container.appendChild(flexRow)
        })
    }

    const verticalRender = () => {
        console.log("====")
        let rwt = container.clientWidth
        // 获取列数
        let column = Math.floor((rwt + spacing) / (baseWidth + spacing))
        // 如果容器宽度小于了图片最小宽度，默认为1列
        if (column < 1) column = 1
        // 获取每一列的宽度
        let columnW = (rwt + spacing) / column - spacing
        // 如果图片少于列数，平分居中
        if (images.length < column) {
            column = images.length
            columnW = (rwt + spacing) / column - spacing
        }
        
        table = {}

        for (let i = 0; i < column; i++) { table[i] = 0 }

        images.forEach(item => {
            const image = item.querySelector("img")
            var color   = item.dataset.color || bgColor
            var width   = image.dataset.width
            var height  = image.dataset.height
            var ratio   = columnW / width
            var colH    = height * ratio

            if (color.indexOf('0x') >= 0) {
                color = "#" + color.substring(color.length - 6)
            }

            var minColNum = getMinCol(table)
    
            var minHeight = table[minColNum] || 0

            image.style.width = "100%"
            image.style.maxWidth = "100%"

            item.style.position = "absolute"
            item.style.top = px(minHeight)
            item.style.left = px((columnW + spacing) * minColNum)
            item.style.width = px(columnW)
            item.style.height = px(colH)
            item.style.backgroundColor = color
    
            table[minColNum] = minHeight + colH + spacing
        })

        var maxColNum = getMaxCol(table)
        container.style.height = px(table[maxColNum])

        console.log(table)
        console.log(parentBox.innerHeight || parentBox.clientHeight)

        // 取消滚动条???
        // if (table[maxColNum] > parentBox.innerHeight || parentBox.clientHeight) {
        //     setTimeout(() => { resizeEvent() }, 0)
        // }
    }

    const resizeEvent = () => {
        if (direction === "horizontal") {
            horizontalRender()
        } else {
            verticalRender()
        }
    }

    const scrollEvent = () => {
        if (unloadImages.length < 1) return parentBox.removeEventListener("scroll", scrollEvent)
        for (let i = unloadImages.length; i--;) {
            getBound(unloadImages[i]) && loadImage(unloadImages[i], i)
        }
    }

    init()
}))