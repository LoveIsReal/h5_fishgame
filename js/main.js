/*
之所以使用两个canvas，canvas2用来绘制深色背景和海葵和小果实
canvas1用来画小鱼和分数板

游戏canvas为全屏幕，且应该适应电脑和手机两个设备
所以我们要根据屏幕宽度计算海葵的数量和果实的数量，达到一个平衡
* */

var isGameLoopRunning = true

var can1
var can2

var ctx1
var ctx2

var bgPic = new Image()
var canWidth, canHeight
var ane
var fruit
var mom
var baby

var deleteTime
var lastTime = Date.now()

var mx, my // 鼠标位置

var data
var wave


document.body.onload = game

function game() {
    init()
    gameloop()
}

function init() {
    canWidth = window.innerWidth
    canHeight = window.innerHeight

    can1 = document.getElementById('canvas1')
    can2 = document.getElementById('canvas2')
    can1.setAttribute("width",canWidth)
    can1.setAttribute("height", canHeight)
    can2.setAttribute("width",canWidth)
    can2.setAttribute("height", canHeight)
    ctx1 = can1.getContext('2d')
    ctx2 = can2.getContext('2d')
    bgPic.src = './src/background.jpg'


    mx = canWidth * 0.5
    my = canHeight * 0.5

    ane = new aneObj()
    ane.init()
    fruit = new fruitObj()
    fruit.init()
    mom = new momObj()
    mom.init()

    baby = new babyObj()
    baby.init()

    data = new dataObj()
    wave = new waveObj()
    wave.init()


    can1.addEventListener("mousemove", onMousemove)

}

/*
* 游戏循环（让游戏动起来）  通过requestAnimFrame函数无限循环执行
* 之所以用它，而不是用setInterval，告诉浏览器您希望执行动画并请求浏览器在下一次重绘之前调用指定的函数来更新动画。
* 该方法使用一个回调函数作为参数，这个回调函数会在浏览器重绘之前调用，距离下次绘制的时间间隔是一个动态的值。
* 浏览器会在当前绘制完成后根据机器的性能决定多久后绘制下一帧，这个时间是不固定的
* */
function gameloop() {

    window.requestAnimFrame(gameloop)


    ctx1.clearRect(0, 0, canWidth, canHeight)
    ctx2.clearRect(0, 0, canWidth, canHeight)

    var now = Date.now() //
    deleteTime = now - lastTime
    lastTime = now
    // 如果当前页不被显示在屏幕上，浏览器的每一帧的时间间隔就会非常大，绘制出的果实就会很丑
    if(deleteTime > 40)deleteTime = 40

    drawBackgound()
    ane.draw()
    fruitMonitor()
    fruit.draw()
    mom.draw()
    momFruitsCollision()
    momAndBabyCollision()

    baby.draw()
    data.draw()

    wave.draw()
}


function onMousemove(e) {
    if(!isGameLoopRunning)return

    if (e.offsetX || e.layerX) {
        mx = e.offsetX == undefined ? e.layerX : e.offsetX
        my = e.offsetY == undefined ? e.layerY : e.offsetY
    }
}