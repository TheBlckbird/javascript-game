const Direction = {
    Up: "Up",
    Down: "Down",
    Left: "Left",
    Right: "Right"
}

class Sprite {
    imageFile = ""
    frameSize = 0
    position = {x: 0.0, y: 0.0}

    constructor(ctx, scale, x, y, mapWidth) {
        this.x = x
        this.y = y
        /**
         * Canvas Context
         * 
         * @type CanvasRenderingContext2D
         */
        this.ctx = ctx
        this.scale = scale
        this.mapWidth = mapWidth

        this.animations = {
            "spawn": {
                "frames": [[0,0], [0,1], [0,2], [0,3]],
                "frameDuration": 7
            },
            "idle": {
                "frames": [[1,0], [1,1], [1,2], [1,3]],
                "frameDuration": 20
            },
            "run": {
                "frames": [[2,0], [2,1], [2,2], [2,3], [2,4], [2,5], [2,6], [2,7]],
                "frameDuration": 8
            },
            "jump_idle": {
                "frames": [[3,0]],
                "frameDuration": 20
            },
            "jump_run": {
                "frames": [[4,0]],
                "frameDuration": 20
            },
            "land": {
                "frames": [[5,0], [5,1],[5,2]],
                "frameDuration": 20
            },
            "roll": {
                "frames": [[6,0], [6,1], [6,2], [6,3], [6,4], [6,5], [6,6], [6,7]],
                "frameDuration": 6
            },
            "turn": {
                "frames": [[7,0], [7,1], [7,2], [7,3]],
                "frameDuration": 20
            },
            "hit": {
                "frames": [[8,0], [8,1], [8,2], [8,3]],
                "frameDuration": 20
            },
            "death": {
                "frames": [[9,0], [9,1], [9,2], [9,3]],
                "frameDuration": 20
            },
        }
        this.currentAnimation = this.animations.spawn
        this.currentFrame = 0
        this.animationTick = this.currentAnimation.frameDuration
        this.movingFrames = 0
        this.currentDirections = []
        console.log(hitboxes[2037])
    }

    startMove(direction) {
        if (this.movingFrames === 0) {
            this.currentDirection = direction
            this.moving = true
            // this.movingFrames = 10
            this.currentAnimation = this.animations.run
            this.animationTick = this.currentAnimation.frameDuration
        }
    }

    checkCollision(direction) {
        let newPosition = {x: this.position.x, y: this.position.y}

        switch (direction) {
            case Direction.Down:
                newPosition.y += 1
                break
        
            case Direction.Up:
                newPosition.y -= 1
                break

            case Direction.Left:
                newPosition.x -= 1
                break

            case Direction.Right:
                newPosition.x += 1
                break
        }

        const positionIndex = newPosition.y * this.mapWidth + newPosition.x

        // const size = 16 * this.scale
        // const tileX = positionIndex % 105
        // const tileY = Math.floor(positionIndex / 105)
        // const x = this.position.x * 16 * this.scale
        // const y = this.position.y * 16 * this.scale
        // this.ctx.fillStyle = "red"
        // this.ctx.fillRect(-x + tileX * 16 * this.scale, -y + tileY * 16 * this.scale, size, size)
        // this.ctx.fillRect(10, 10, size, size)
        console.log(hitboxes[positionIndex], positionIndex)

        return hitboxes[positionIndex] !== 0
    }

    stopMove() {
        // this.currentDirections.pop()
        this.currentAnimation = this.animations.idle
        this.animationTick = this.currentAnimation.frameDuration
        this.currentFrame = 1
        this.moving = false
    }

    move() {
        if (this.movingFrames > 0) {

            this.movingFrames -= 1

            //switch (this.currentDirections[this.currentDirections.length - 1]) {
            switch (this.currentDirection) {
                case Direction.Up:
                    this.position.y -= .1
                    break

                case Direction.Down:
                    this.position.y += .1
                    break
                        
                case Direction.Left:
                    this.position.x -= .1
                    break

                case Direction.Right:
                    this.position.x += .1
                    break
            }
        } else if (this.moving && this.movingFrames === 0) {
            this.position.x = Math.round(this.position.x)
            this.position.y = Math.round(this.position.y)

            // if (this.checkCollision(this.currentDirection)) {
            //     this.stopMove()
            //     return
            // }
            // this.checkCollision(this.currentDirection)

            this.movingFrames = 10
        }
    }

    load() {
        this.spriteImage = new Image()
        this.spriteImage.src = this.imageFile
    }

    getNextFrame() {
        this.currentFrame += 1

        if (this.currentFrame >= this.currentAnimation.frames.length) {
            if (this.currentAnimation === this.animations.spawn) {
                this.currentAnimation = this.animations.idle
            }

            this.currentFrame = 0
        }
    }

    tickAnimationDown() {
        this.animationTick -= 1


        if (this.animationTick === 0) {
            this.getNextFrame()
            this.animationTick = this.currentAnimation.frameDuration
        }
    }

    draw() {
        // this.move()
        this.tickAnimationDown()

        this.ctx.drawImage(
            this.spriteImage,
            this.currentAnimation.frames[this.currentFrame][1] * this.frameSize,
            this.currentAnimation.frames[this.currentFrame][0] * this.frameSize,
            this.frameSize,
            this.frameSize,
            this.x,
            this.y,
            this.frameSize * this.scale,
            this.frameSize * this.scale
        )
    }
}