class Wall {
  constructor(ctx, width, height, posX, posY, gameWidth, gameHeight) {
    this.ctx = ctx
    this.size = { width: width, height: height }
    this.position = {
      x: posX,
      y: posY,
    }
    this.gameSize = { width: gameWidth, height: gameHeight }
    this.color = 'black'
  }
}
