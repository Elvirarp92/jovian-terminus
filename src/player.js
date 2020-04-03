class Player {
  constructor(ctx, gameWidth, gameHeight, keys) {
    this.ctx = ctx
    this.gameSize = { width: gameWidth, height: gameHeight }
    this.playerSize = { width: 32, height: 32 }

    this.image = undefined

    this.posX = this.gameSize.width / 2 - this.playerSize.width
    this.posY = this.gameSize.height - this.playerSize.height - 10
    this.playerOrientation = 'N' //N, S, E or W

    this.keys = keys

    this.velocity = 1

    this.bullets = []
  }

  init() {
    this.image = new Image()
    this.image.src = './img/player-provisional-sprite.png'
    this.image.onload = () =>
      this.ctx.drawImage(
        this.image,
        this.posX,
        this.posY,
        this.playerSize.width,
        this.playerSize.height
      )
  }

  draw() {
    this.ctx.drawImage(
      this.image,
      this.posX,
      this.posY,
      this.playerSize.width,
      this.playerSize.height
    )
  }
}
