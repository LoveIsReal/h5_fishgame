// 小鱼完全跟着大鱼走，但是却保持一定的距离
// 实现功能：小鱼跟随大鱼，眨眼，摆尾巴，生命值减少

var babyTailArr = []
var babyEyeArr = []
var babyBodyArr = []

var babyObj = function () {
    this.x
    this.y
    this.angle
    this.babyEye = new Image()
    this.babyBody = new Image()
    this.babyTail = new Image()

    this.babyTail_index = 0
    this.babyTail_anim_timer = 0

    this.babyEye_index = 0
    this.babyEye_anim_timer = 0
    this.firstFrameInterval = 1000 // 眼睛动画every frame 's duration

    this.babyBody_index = 0  // 相当于生命值
    this.babyBody_anim_timer = 0

}
babyObj.prototype.init = function () {
    this.x = canWidth * 0.5 - 40
    this.y = canHeight * 0.5 + 40
    this.angle = 0
    this.babyEye.src = './src/babyEye0.png'
    this.babyBody.src = './src/babyFade0.png'
    this.babyTail.src = './src/babyTail0.png'

    for (var index = 0; index < 8; index++) {
        babyTailArr[index] = new Image()
        babyTailArr[index].src = ('./src/babyTail' + index + '.png')
    }
    for (var index = 0; index < 2; index++) {
        babyEyeArr[index] = new Image()
        babyEyeArr[index].src = ('./src/babyEye' + index + '.png')
    }
    for(var index = 0;index < 20; index++){
        babyBodyArr[index] = new Image()
        babyBodyArr[index].src = ('./src/babyFade' + index + '.png')
    }

}
babyObj.prototype.draw = function () {
    // 小鱼跟随大鱼的坐标运动


    this.x = lerpDistance(mom.x - 40, this.x, 0.97)
    this.y = lerpDistance(mom.y + 40, this.y, 0.97)

    var angelDiff = Math.atan2((mom.y - this.y), (mom.x - this.x)) + Math.PI// 得到一个弧度值
    this.angle = lerpAngle(angelDiff, this.angle, 0.1)

    // 绘制小鱼尾巴摆动的帧动画
    doAnim_babyTail()
    doAnim_babyEye()


    ctx1.save()
    ctx1.translate(this.x, this.y)
    ctx1.rotate(this.angle)

    ctx1.drawImage(this.babyBody, -this.babyBody.width * 0.5, -this.babyBody.height * 0.5)
    ctx1.drawImage(this.babyEye, -this.babyEye.width * 0.5, -this.babyEye.height * 0.5)
    ctx1.drawImage(this.babyTail, this.babyTail.width * 0.36, -this.babyTail.height * 0.5)

    ctx1.restore()

    //之所以放在最后是因为绘制顺序的问题，我们希望game over！处在canvas最上层
    doBabyLifeValueJudge()

}


function doAnim_babyTail() {
    baby.babyTail_anim_timer += deleteTime
    if (baby.babyTail_anim_timer > 50) {
        baby.babyTail_index = (baby.babyTail_index + 1) % 8
        baby.babyTail = babyTailArr[baby.babyTail_index]
        baby.babyTail_anim_timer %= 50
    }
}



/*和摆尾动画不同的是，眨眼并不是一直持续的执行的，正常来说应该每次完整的眨眼动画之间存在一段随机的时间间隔*/
// 这个功能怎么做呢？我没想出来，我只能用慕课网给出的方案：
// 我之前以为一定要加一层时间判断，就是200毫秒判断是否执行下一帧，然后随机的时间比如1000毫秒执行下次动画
// 但是这样逻辑明显是错的，两个时间是重叠的，满足了1000 你怎么知道现在就满足200呢？
// -- 正确的做法是：
// 第一行图片执行1000毫秒（这是随机值）的延迟判断，然后每一帧之间执行200毫秒（固定frame的间隔）
// 这样就可以很好地控制了
function doAnim_babyEye() {

    baby.babyEye_anim_timer += deleteTime

    if(baby.babyEye_anim_timer > baby.firstFrameInterval){
        baby.babyEye_index = (baby.babyEye_index + 1) % 2
        baby.babyEye = babyEyeArr[baby.babyEye_index]
        baby.babyEye_anim_timer %= baby.firstFrameInterval

        if(baby.babyEye_index == 0){
            baby.firstFrameInterval = Math.random() * 1000 + 1000
        }else{
            baby.firstFrameInterval = 200
        }
    }

}

// 小鱼的生命值是定时减少的，对应的就是小鱼背景图片的变化
// 当执行到最后一张小鱼图片时，小鱼死亡
function doBabyLifeValueJudge(){
    if(baby.babyBody_index == 19){
        isGameLoopRunning = false
        ctx1.save()
        ctx1.fillStyle = "rgba(255,255,255," + data.endTxtAlpha + ')'
        ctx1.font = '48px Airal'
        ctx1.shadowBlur = 30
        ctx1.shadowColor = 'white'
        ctx1.textAlign = "center";
        ctx1.textBaseline = "middle";
        ctx1.fillText('game over ！', canWidth/2, canHeight/2)
        ctx1.restore()
        return
    }

    baby.babyBody_anim_timer += deleteTime
    if(baby.babyBody_anim_timer > 300){
        baby.babyBody_index++
        baby.babyBody = babyBodyArr[baby.babyBody_index]
        baby.babyBody_anim_timer %= 300
    }
}