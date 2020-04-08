class Player {
  constructor(ctx, gameWidth, gameHeight) {
    this.ctx = ctx
    this.gameSize = { width: gameWidth, height: gameHeight }
    this.size = { width: 48, height: 48 }

    this.image = undefined

    this.position = {
      x: 21 * app.map.tileSize,
      y: 16 * app.map.tileSize,
    }

    this.spriteSource = {
      n: './img/player-provisional-sprite-n.png',
      s: './img/player-provisional-sprite-s.png',
      e: './img/player-provisional-sprite-e.png',
      w: './img/player-provisional-sprite-w.png',
    }

    this.orientation = 'N' //N, S, E or W

    this.velocity = 15

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
    document.onkeyup = (e) => {
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

        case 32: //SPACE
          this.shoot()
          break
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
        !app.map.isSolidTile(
          0,
          this.position.x,
          (this.position.y -= this.velocity)
        ) &&
        !app.map.isSolidTile(
          1,
          this.position.x,
          (this.position.y -= this.velocity)
        )
          ? (this.position.y -= this.velocity)
          : this.bump()
        break
      case 'S':
        !app.map.isSolidTile(
          0,
          this.position.x,
          (this.position.y += this.velocity)
        ) &&
        !app.map.isSolidTile(
          1,
          this.position.x,
          (this.position.y += this.velocity)
        )
          ? (this.position.y += this.velocity)
          : this.bump()
        break
      case 'E':
        !app.map.isSolidTile(
          0,
          (this.position.x += this.velocity),
          this.position.y
        ) &&
        !app.map.isSolidTile(
          1,
          (this.position.x += this.velocity),
          this.position.y
        )
          ? (this.position.x += this.velocity)
          : this.bump()
        break
      case 'W':
        !app.map.isSolidTile(
          0,
          (this.position.x -= this.velocity),
          this.position.y
        ) &&
        !app.map.isSolidTile(
          1,
          (this.position.x -= this.velocity),
          this.position.y
        )
          ? (this.position.x -= this.velocity)
          : this.bump()
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

  shoot() {
    this.bullets.push(
      new Bullet(
        this.ctx,
        this.position.x,
        this.position.y,
        this.size.height,
        this.size.width,
        this.orientation
      )
    )
  }

  isCollision(player, target) {
    return (
      player.position.x < target.position.x + target.size.width &&
      player.position.x + player.size.width > target.position.x &&
      player.position.y < target.position.y + target.size.height &&
      player.position.y + player.size.height > target.position.y
    )
  }
}
