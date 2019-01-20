// 绘制果实类
// 我们建立一个数组存放所有的果实，比如我们设置30个，果实两种状态【成长中，成熟了】
// 成熟了的果实就从海葵上向上浮上去，漂浮到界面外就切换它的状态为成长中
// 且每次绘制都需要判断当前果实数量是否小于池子的一半，比如15个（小于15就要生成果实）


/**
 * 果实的游戏规则：
 * 保持屏幕上有池子的一半 个果实,那如何让果实一直源源不断的生成的
 * 关键就是born方法，我们要让已经死去的果实重新调用born方法
 * 即在主循环中，我们调用一个monitor方法，不断判断当前果实是否小于池子的一半 小于池子的一半就将一个alive状态为false的果实
 * 变为alive true，这样在接下来的绘制中就会多一个果子可以绘制了
 */
var fruitObj = function () {
    this.alive = []  // 存储所有果实的状态
    this.x = []
    this.y = []
    this.speed = [] // 果实成长和上浮的速度
    this.size = []
    this.fruitType = []
    this.orange = new Image()
    this.blue = new Image()
    this.whichAneDoIBorn = []  // 由于果实长大时 跟随ane进行位移，所以要知道这个果实对应哪一个ane
}
// 这里的num表示整个果子池子数量
fruitObj.prototype.num = 0
fruitObj.prototype.init = function () {

    this.num = ane.num /2 // 一定要根据海葵的数量制定果实有多少个，让整体更协调

    for (var i = 0; i < this.num; i++) {
        this.alive[i] = false
        this.x[i] = 0
        this.y[i] = 0
        this.speed[i] = Math.random() * 0.017 + 0.005
        this.size[i] = 0
        this.born(i)
    }
    this.orange.src = './src/fruit.png'
    this.blue.src = './src/blue.png'
}

fruitObj.prototype.draw = function () {
    for (var i = 0; i < this.num; i++) {
        if (this.alive[i]) {
            var picType
            if(this.fruitType[i] == "blue"){
                picType = this.blue
            }else{
                picType = this.orange
            }

            if (this.size[i] <= 16) {
                this.size[i] += this.speed[i] * deleteTime
                this.x[i] = ane.endPointX[this.whichAneDoIBorn[i]]
                this.y[i] = ane.endPointY[this.whichAneDoIBorn[i]]
            } else {
                this.y[i] -= this.speed[i] * 7 * deleteTime
            }
            // 参数是位置和绘制大小
            ctx2.drawImage(picType, this.x[i] - this.size[i] * 0.5, this.y[i] - this.size[i] * 0.5,
                this.size[i], this.size[i])
            // 绘制结束，判断是否应该回收果实
            if (this.y[i] < 10) {
                this.alive[i] = false
            }
        }
    }
}
/**
 *  生出一个果子
 *  注意：这里没有处理海葵位置重复的情况！！
 */
fruitObj.prototype.born = function (i) {
    var aneId = Math.floor(Math.random() * ane.num)
    this.whichAneDoIBorn[i] = aneId
    this.x[i] = ane.endPointX[aneId]
    this.y[i] = ane.endPointY[aneId]
    this.alive[i] = true
    this.fruitType[i] = ""
    this.size[i] = 0
    var ran = Math.random()
    if(ran < 0.3){
        this.fruitType[i] = "blue"
    }else{
        this.fruitType[i] = "orange"
    }

}

fruitObj.prototype.dead = function(index){
    this.alive[index] = false
}

/**
 * 判断当前多少果实是活着的
 */
function fruitMonitor(){
    var num = 0
    for(var i = 0 ;i < fruit.num; i++){
        if(fruit.alive[i])num++
    }
    if(num < parseInt(fruit.num / 2)){ // 当前小于池子的一半，就要生成一个果实,
        // 这就可能出现生出一个还是小于十五个的情况，但是我们不管，少就生一个
        // 因为少于池子的一半的时候，每一帧都会生一个，直到满足池子的一半
        sendFruit()
        return
    }
}
function sendFruit(){
    for(var i = 0 ;i < fruit.num ;i++){
        if(!fruit.alive[i]){
            fruit.born(i)
            return
        }
    }
}