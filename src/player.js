class Player {
  constructor(ctx, gameWidth, gameHeight) {
    this.ctx = ctx
    this.gameSize = { width: gameWidth, height: gameHeight }
    this.playerSize = { width: 32, height: 32 }

    this.image = undefined

    this.posX = this.gameSize.width / 2 - this.playerSize.width
    this.posY = this.gameSize.height / 2 - this.playerSize.height
    this.orientation = 'N' //N, S, E or W

    this.velocity = 1

    this.bullets = []
  }

  init() {
    this.image = new Image()
    this.image.src = './img/player-provisional-sprite-n.png'
    this.image.onload = () =>
      this.ctx.drawImage(
        this.image,
        this.posX,
        this.posY,
        this.playerSize.width,
        this.playerSize.height
      )
  }

  setEventListeners() {
    document.onkeydown = (e) => {
      switch (e.keyCode) {
        case 87: //W
          this.rotate('N')
          break
        case 65: //A
          this.rotate('W')
          break
        case 83: //S
          this.rotate('S')
          break
        case 68: //D
          this.rotate('E')
          break

        // case 32: //SPACE

        //   break;
      }
    }
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

  //just charge the technical debt to my credit card
  rotate(direction) {
    switch (direction) {
      case 'N':
        this.orientation = 'N'
        this.image.src = './img/player-provisional-sprite-n.png'
        break

      case 'S':
        this.orientation = 'S'
        this.image.src = './img/player-provisional-sprite-s.png'
        break

      case 'E':
        this.orientation = 'E'
        this.image.src = './img/player-provisional-sprite-e.png'
        break

      case 'W':
        this.orientation = 'W'
        this.image.src = './img/player-provisional-sprite-w.png'
        break
    }
  }
}
