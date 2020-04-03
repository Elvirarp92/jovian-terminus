class Player {
  constructor(ctx, gameWidth, gameHeight, keys) {
    this.ctx = ctx
    this.gameSize = { gameWidth: gameWidth, gameHeight: gameHeight }
    this.playerSize = { width: 32, height: 32 }


    this.image = new Image()
    this.image.src = './img/player-provisional-sprite.png'

    this.posX = this.gameSize.gameWidth / 2 - this.playerSize.width
    this.posY = this.gameSize.gameHeight - this.playerSize.height - 10
    this.playerOrientation = 'N' //N, S, E or W

    this.keys = keys

    this.velocity = 1

    this.bullets = []

  }
}
