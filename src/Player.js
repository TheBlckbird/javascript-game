class Player extends Sprite {
    position = {x: 50, y: 19}
    frameSize = 32
    imageFile = "../assets/player/mPlayer_ [human].png"
    controls = {
        Up: ["w", "ArrowUp"],
        Down: ["s", "ArrowDown"],
        Left: ["a", "ArrowLeft"],
        Right: ["d", "ArrowRight"]
    }

    setupEventListeners() {
        document.addEventListener("keydown", (e) => {
            if (this.controls.Down.includes(e.key)) {
                this.startMove(Direction.Down)
            
            } else if (this.controls.Up.includes(e.key)) {
                this.startMove(Direction.Up)

            } else if (this.controls.Right.includes(e.key)) {
                this.startMove(Direction.Right)

            } else if (this.controls.Left.includes(e.key)) {
                this.startMove(Direction.Left)
                
            }
        })

        document.addEventListener("keyup", (e) => {
            if (
                this.controls.Down.includes(e.key) ||
                this.controls.Up.includes(e.key) ||
                this.controls.Right.includes(e.key) ||
                this.controls.Left.includes(e.key)
            ) {
                this.stopMove()
            
            }
        })
    }
}