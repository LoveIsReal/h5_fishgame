// 吃果实会产生wave，和小鱼碰撞会产生很多wave，不过颜色不同
// 绘制wave需要用到的API： ctx.arc


var waveObj = function () {
    this.waveXArr = []
    this.waveYArr = []
    this.waveAliveArr = []
    this.waveTimerArr = []  // 本意是希望圆圈每一次扩大都有一个固定时间，但是想想还是算了，系统每次绘制都执行好了，更顺滑
    this.waveVariableArr = [] //因为wave的半径变大 alpha变小，所以我们指定一个系数,默认1
    this.waveTypeArr = []   // 大鱼吃果实是eat，小鱼被喂食是feed
}
waveObj.prototype.num = 15
waveObj.prototype.anim_perframe_time = 50
waveObj.prototype.init = function () {
    for (var index = 0; index < this.num; index++) {
        this.waveAliveArr[index] = false
        this.waveTimerArr[index] = 0
        this.waveVariableArr[index] = 1
    }
}

waveObj.prototype.draw = function () {

    ctx1.save()
    ctx1.lineWidth = 1

    for (var index = 0; index < this.num; index++) {
        if(this.waveVariableArr[index] <= 0){
            this.killOneWave(index)
        }
        if(!this.waveAliveArr[index])continue


        // 计算透明度
        var alpha = this.waveVariableArr[index]
        var positionX,positionY
        if (this.waveTypeArr[index] == 'eat') {
            ctx1.strokeStyle = 'rgba(67,110,204,' + alpha + ')'
            positionX = this.waveXArr[index]
            positionY = this.waveYArr[index]
        } else if (this.waveTypeArr[index] == 'feed') {
            ctx1.strokeStyle = 'rgba(204,86,43,' + alpha + ')'
            positionX = baby.x
            positionY = baby.y
        }
        // 半径计算，半径从20 到 100
        var radius = 20 + 60 * (1 - this.waveVariableArr[index])
        ctx1.beginPath();
        ctx1.arc(positionX, positionY, radius, 0, 2 * Math.PI)
        ctx1.stroke()

        this.waveVariableArr[index] = this.waveVariableArr[index] - 0.01
    }

    ctx1.restore()

}
waveObj.prototype.createOne = function (x, y, type) {
    for (var index = 0; index < this.num; index++) {
        if (!this.waveAliveArr[index]) {
            this.waveXArr[index] = x
            this.waveYArr[index] = y
            this.waveTypeArr[index] = type
            this.waveAliveArr[index] = true
            this.waveVariableArr[index] = 1
            return
        }
    }
}
// 清楚一个wave，即重新初始化
waveObj.prototype.killOneWave = function(index){
    this.waveAliveArr[index] = false
    this.waveTimerArr[index] = 0
    this.waveVariableArr[index] = 1
}