class Wall {
  constructor(ctx, width, height, posX, posY, gameWidth, gameHeight) {
    this.ctx = ctx
    this.size = { width: width, height: height }
    this.position = {
      x: posX,
      y: posY,
    }
    this.gameSize = { width: gameWidth, height: gameHeight }
    this.color = '#000000'
  }

  draw() {
    this.ctx.fillStyle = this.color
    this.ctx.fillRect(
      this.position.x,
      this.position.y,
      this.size.width,
      this.size.height
    )
  }
}
