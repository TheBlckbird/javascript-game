class Map {
    backgroundMapImage = "../assets/map.png"
    foregroundMapImage = "../assets/foreground_map.png"
    hitboxesImage = "../assets/hitboxes.png"

    constructor(ctx, scale) {
        /**
         * Canvas Context
         * 
         * @type CanvasRenderingContext2D
         */
        this.ctx = ctx
        this.ctx.imageSmoothingEnabled = false
        this.scale = scale
        this.width = 105
        this.height = 56
    }

    async load() {
        this.backgroundMap = new Image()
        this.backgroundMap.src = this.backgroundMapImage

        this.foregroundMap = new Image()
        this.foregroundMap.src = this.foregroundMapImage

        this.hitboxes = new Image()
        this.hitboxes.src = this.hitboxesImage
    }

    drawLowerMap(x, y) {
        this.ctx.drawImage(
            this.backgroundMap,
            -x,
            -y,
            this.backgroundMap.width * this.scale,
            this.backgroundMap.height * this.scale
        )
    }

    drawUpperMap(x, y) {
        this.ctx.drawImage(
            this.foregroundMap,
            -x,
            -y,
            this.foregroundMap.width * this.scale,
            this.foregroundMap.height * this.scale
        )
    }

    drawHitboxes(x, y) {
        // this.ctx.drawImage(
        //     this.hitboxes,
        //     -x,
        //     -y,
        //     this.hitboxes.width * this.scale,
        //     this.hitboxes.height * this.scale
        // )
        // hitboxes.forEach((hitbox, index) => {
        //     if (hitbox !== 0) {
        //         const tileX = index % 105
        //         const tileY = Math.floor(index / 105)
        //         const size = 16 * this.scale

        //         this.ctx.fillStyle = "rgba(255, 0, 0, 0.3)"
        //         this.ctx.fillRect(-x + tileX * 16 * this.scale, -y + tileY * 16 * this.scale, size, size)
        //     }
            
        // });

        for (let playerY = 0; playerY <= this.height; playerY++) {
            // console.log("hä")
            for (let playerX = 0; playerX <= this.width; playerX++) {
                const index = playerY * this.width + playerX

                if (hitboxes[index] !== 0) {
                    const tileX = index % this.width
                    const tileY = Math.floor(index / this.width)
                    const size = 16 * this.scale

                    this.ctx.fillStyle = "rgba(255, 0, 0, 0.3)"
                    this.ctx.fillRect(-x + tileX * 16 * this.scale, -y + tileY * 16 * this.scale, size, size)
                }
            }
        }
    }
}