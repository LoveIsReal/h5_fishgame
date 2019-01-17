//碰撞检测


// 大鱼和果实，如果大鱼和果实的距离达到某一个值，就判断这个果实被吃掉了
function momFruitsCollision() {
    for (var i = 0; i < fruit.num; i++) {
        if (fruit.alive[i]) {
            // 判断距离
            var l = calLength2(mom.x, mom.y, fruit.x[i], fruit.y[i])
            if (l < 900) {
                // 吃掉果实
                fruit.dead(i)
                wave.createOne(fruit.x[i],fruit.y[i], 'eat')
                data.fruitNum++
                if(fruit.fruitType[i] == 'blue'){
                    data.double = 2
                }
            }

        }
    }
}

/*大鱼和小鱼碰撞了之后呢，就将食物喂给小鱼，小鱼立刻满血
* 如果大鱼没吃到果实，就无法喂给小鱼*/
function momAndBabyCollision() {
    if(!isGameLoopRunning)return

    var l = calLength2(mom.x, mom.y, baby.x, baby.y)
    if (l < 900 && data.fruitNum > 0) {
        // 小鱼恢复初始状态
        baby.babyBody_index = 0

        // 大鱼body变为初始状态
        mom.momBody_index = 0
        data.addScore()
        wave.createOne(baby.x,baby.y, 'feed')
    }
}