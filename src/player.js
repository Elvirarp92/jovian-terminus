class Player {
  constructor(ctx, gameWidth, gameHeight) {
    this.ctx = ctx
    this.gameSize = { width: gameWidth, height: gameHeight }
    this.size = { width: 32, height: 32 }

    this.image = undefined

    this.position = {
      x: this.gameSize.width / 2 - this.size.width,
      y: this.gameSize.height / 2 - this.size.height,
    }

    this.spriteSource = {
      n: './img/player-provisional-sprite-n.png',
      s: './img/player-provisional-sprite-s.png',
      e: './img/player-provisional-sprite-e.png',
      w: './img/player-provisional-sprite-w.png',
    }

    this.orientation = 'N' //N, S, E or W

    this.velocity = 25

    this.bullets = []
  }

  init() {
    let loadSprite
    switch (this.orientation) {
      case 'N':
        loadSprite = this.spriteSource.n
        break
      case 'S':
        loadSprite = this.spriteSource.s
        break
      case 'E':
        loadSprite = this.spriteSource.e
        break
      case 'W':
        loadSprite = this.spriteSource.w
        break
    }
    this.image = new Image()
    this.image.src = loadSprite
    this.image.onload = () =>
      this.ctx.drawImage(
        this.image,
        this.position.x,
        this.position.y,
        this.size.width,
        this.size.height
      )
  }

  setEventListeners() {
    document.onkeydown = (e) => {
      switch (e.keyCode) {
        case 87: //W
          this.move('N')
          break
        case 65: //A
          this.move('W')
          break
        case 83: //S
          this.move('S')
          break
        case 68: //D
          this.move('E')
          break

        // case 32: //SPACE

        //   break;
      }
    }
  }

  draw() {
    this.ctx.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.size.width,
      this.size.height
    )
  }

  move(direction) {
    direction != this.direction ? this.rotate(direction) : null

    switch (direction) {
      case 'N':
        this.position.y -= this.velocity
        break
      case 'S':
        this.position.y += this.velocity
        break
      case 'E':
        this.position.x += this.velocity
        break
      case 'W':
        this.position.x -= this.velocity
        break
    }
  }

  //just charge the technical debt to my credit card
  rotate(direction) {
    switch (direction) {
      case 'N':
        this.orientation = 'N'
        this.image.src = this.spriteSource.n
        break

      case 'S':
        this.orientation = 'S'
        this.image.src = this.spriteSource.s
        break

      case 'E':
        this.orientation = 'E'
        this.image.src = this.spriteSource.e
        break

      case 'W':
        this.orientation = 'W'
        this.image.src = this.spriteSource.w
        break
    }
  }

  //ISSUE: BUMP AT HIGH VELOCITIES HAS SOME WEIRD GRAPHICAL GHOSTING
  bump() {
    switch (this.orientation) {
      case 'N':
        this.position.y += this.velocity
        break
      case 'S':
        this.position.y -= this.velocity
        break
      case 'E':
        this.position.x -= this.velocity
        break
      case 'W':
        this.position.x += this.velocity
        break
    }
  }
}
