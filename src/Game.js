class Game {
    constructor() {
        this.canvas = document.getElementById("canvas");
        this.ctx = this.canvas.getContext("2d");

        this.scale = 3
        this.map = new Map(this.ctx, this.scale)
        this.map.load()
        console.log(this.canvas.height, this.canvas.width)
        this.player = new Player(this.ctx, this.scale, this.canvas.width / 2 - 16 * this.scale, this.canvas.height / 2 - (16 + 4) * this.scale, 105)
        this.player.load()

        this.config = {
            "show_hitboxes": false,
            "show_map": true
        }

        this.gameLoop()
    }

    gameLoop() {
        this.player.setupEventListeners()

        document.addEventListener("keydown", (e) => {
            switch (e.key) {
                case "h":
                    this.config.show_hitboxes = !this.config.show_hitboxes
                    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                    break;
        
                case "m":
                    this.config.show_map = !this.config.show_map
                    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                    break
            }
        })

        const step = () => {
            this.player.move()

            if (this.config.show_map) this.map.drawLowerMap(this.player.position.x * 16 * this.scale, this.player.position.y * 16 * this.scale)

            this.player.draw()

            if (this.config.show_map) this.map.drawUpperMap(this.player.position.x * 16 * this.scale, this.player.position.y * 16 * this.scale)

            if (this.config.show_hitboxes) {
                this.map.drawHitboxes(this.player.position.x * 16 * this.scale, this.player.position.y * 16 * this.scale)
            }

            requestAnimationFrame(step)
        }
        requestAnimationFrame(step)
    }
}