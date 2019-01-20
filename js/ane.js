//海葵绘制类
// 实现功能：海葵共同呈二次贝塞尔曲线运动
// 慕课网提供的做法是用正弦函数的特性去做
// 先制造一个值随着时间变化一直在 -1,1 之间波动
// 然后为了使海葵摆动每个都不一样，定义不同的振幅



var aneObj = function () {
    this.x = []  //存放海葵触手的X坐标
    this.len = [] // 触手长度
    this.alpha = 0
    this.amp = [] // 振幅
    this.endPointX = []
    this.endPointY = []
}
aneObj.prototype.num = 0
aneObj.prototype.init = function () {

    this.num = parseInt(canWidth / 16)

    for (var index = 0; index < this.num; index++) {
        this.x[index] = index * 16 + Math.random() * 20
        this.len[index] = 200 + Math.random() * 50
        this.amp[index] = Math.random() * 30 + 20
        this.endPointX[index] = this.x[index]
        this.endPointY[index] = canHeight - this.len[index]
    }
}
aneObj.prototype.draw = function () {
    this.alpha += deleteTime * 0.002
    var l = Math.sin(this.alpha)  // [-1, 1]



    ctx2.save()
    ctx2.globalAlpha = 0.6
    ctx2.strokeStyle = "#3b154e"
    ctx2.lineWidth = 20
    ctx2.lineCap = "round"

    // 绘制每一条海葵的触手
    for (var i = 0; i < this.num; i++) {
        ctx2.beginPath()
        ctx2.moveTo(this.x[i], canHeight)
        this.endPointX[i] = this.x[i] + l * this.amp[i]
        this.endPointY[i] = canHeight - this.len[i]
        ctx2.quadraticCurveTo(this.x[i], canHeight - 150,
            this.endPointX[i], this.endPointY[i])
        ctx2.stroke()
    }
    ctx2.restore() // 给ctx2设置的样式只在在save和restore之间有效果
}