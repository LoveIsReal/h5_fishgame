// 大鱼类
// 需要注意的是，我们并没有对大鱼的运动速度做固定值处理
// 是根据你鼠标移动的快慢去动态的变化的

// 实现功能：大鱼跟随鼠标移动，摇尾巴，眨眼睛


var momTailArr = []
var momEyeArr = []
var momBodyArr = []

var momObj = function () {
    this.x
    this.y
    this.angle
    this.momEye = new Image()
    this.momBody = new Image()
    this.momTail = new Image()

    this.momTail_index = 0
    this.momTail_anim_timer = 0

    this.momEye_index = 0
    this.momEye_anim_timer = 0
    this.momfirstFrameInterval = 1000 // 眼睛动画every frame 's duration

    this.momBody_index = 0  // 相当于生命值
    this.momBody_anim_timer = 0

}
momObj.prototype.init = function () {
    this.x = canWidth * 0.5
    this.y = canHeight * 0.5
    this.angle = 0
    this.momEye.src = './src/bigEye0.png'
    this.momBody.src = './src/bigSwim0.png'
    this.momTail.src = './src/bigTail0.png'

    for (var index = 0; index < 8; index++) {
        momTailArr[index] = new Image()
        momTailArr[index].src = ('./src/bigTail' + index + '.png')
    }
    for (var index = 0; index < 2; index++) {
        momEyeArr[index] = new Image()
        momEyeArr[index].src = ('./src/bigEye' + index + '.png')
    }
    for(var index = 0;index < 8; index++){
        momBodyArr[index] = new Image()
        momBodyArr[index].src = ('./src/bigSwim' + index + '.png')
    }

}
momObj.prototype.draw = function () {

    // 实现大鱼随着鼠标的移动而跟随移动
    // 怎么做跟随移动
    // 当前这个draw方法中，我们知道了大鱼目前的位置和mouse的位置,所以我们计算一个逼近值
    // 通过这个lerpdistance

    this.x = lerpDistance(mx, this.x, 0.97)
    this.y = lerpDistance(my, this.y, 0.97)

    // 实现大鱼的跟随鼠标摆动头
    // 首先计算大鱼和鼠标位置的角度，然后计算一个lerp值（逼近值）
    // 我们可以简单画个图，一目了然，最终要计算的一个反正切值
    var angelDiff = Math.atan2((my - this.y) , (mx - this.x)) + Math.PI// 得到一个弧度值
    this.angle = lerpAngle(angelDiff, this.angle, 0.6)

    doAnim_momTail()
    doAnim_momEye()


    ctx1.save()


    ctx1.translate(this.x, this.y) // 相当于把canvas的原点移动到了大鱼鱼眼的位置
    ctx1.rotate(this.angle)
    ctx1.drawImage(this.momEye, -this.momEye.width * 0.5, -this.momEye.height * 0.5)
    ctx1.drawImage(this.momBody, -this.momBody.width * 0.5, -this.momBody.height * 0.5)
    ctx1.drawImage(this.momTail, this.momBody.width * 0.28, -this.momTail.height * 0.5)
    ctx1.restore()
}

function doAnim_momTail() {
    mom.momTail_anim_timer += deleteTime
    if (mom.momTail_anim_timer > 50) {
        mom.momTail_index = (mom.momTail_index + 1) % 8
        mom.momTail = momTailArr[mom.momTail_index]
        mom.momTail_anim_timer %= 50
    }
}



/*和摆尾动画不同的是，眨眼并不是一直持续的执行的，正常来说应该每次完整的眨眼动画之间存在一段随机的时间间隔*/
// 这个功能怎么做呢？我没想出来，我只能用慕课网给出的方案：
// 我之前以为一定要加一层时间判断，就是200毫秒判断是否执行下一帧，然后随机的时间比如1000毫秒执行下次动画
// 但是这样逻辑明显是错的，两个时间是重叠的，满足了1000 你怎么知道现在就满足200呢？
// -- 正确的做法是：
// 第一行图片执行1000毫秒（这是随机值）的延迟判断，然后每一帧之间执行200毫秒（固定frame的间隔）
// 这样就可以很好地控制了
function doAnim_momEye() {

    mom.momEye_anim_timer += deleteTime

    if(mom.momEye_anim_timer > mom.momfirstFrameInterval){
        mom.momEye_index = (mom.momEye_index + 1) % 2
        mom.momEye = momEyeArr[mom.momEye_index]
        mom.momEye_anim_timer %= mom.momfirstFrameInterval

        if(mom.momEye_index == 0){
            mom.momfirstFrameInterval = Math.random() * 1000 + 1000
        }else{
            mom.momfirstFrameInterval = 200
        }
    }

}