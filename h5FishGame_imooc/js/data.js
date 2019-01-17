// 分值计算
// 规则: 大鱼和小鱼相碰才会加分，碰完之后 分数归0

var dataObj = function () {
    this.fruitNum = 0;// 吃的果实数量
    this.double = 1;//蓝色果实会使得当前果实数量翻倍,2 表示true，1 false
    this.score = 0
    this.endTxtAlpha = 0 // game over文字的Alpha动画 透明度值
    this.endTxt_timer = 0
}
dataObj.prototype.reset = function () {
    this.fruitNum = 0
    this.double = 1
}
dataObj.prototype.draw = function () { // draw the score

    // 执行gameover Alpha动画
    if(!isGameLoopRunning){
        this.endTxt_timer += deleteTime
        if(this.endTxt_timer > 100){
            if(this.endTxtAlpha == 1)return
            this.endTxtAlpha += 0.1
            this.endTxt_timer %= 100
        }
    }

    ctx1.save()
    ctx1.fillStyle = 'white'
    ctx1.shadowBlur = 30
    ctx1.shadowColor = 'white'
    ctx1.font = '25px Verdana'
    ctx1.textAlign = "center";
    ctx1.fillText('分数: ' + this.score.toString(), canWidth / 2, canHeight - 50)
    ctx1.restore()
}
dataObj.prototype.addScore = function () {
    this.score += this.fruitNum * 100 * this.double
    this.fruitNum = 0
    this.double = 1
}