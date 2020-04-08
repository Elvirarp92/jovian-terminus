class Player {
  constructor(ctx, gameWidth, gameHeight) {
    this.ctx = ctx
    this.gameSize = { width: gameWidth, height: gameHeight }
    this.size = { width: 64, height: 64 }

    this.image = undefined

    this.position = {
      x: 21 * app.map.tileSize,
      y: 16 * app.map.tileSize,
    }

    this.spriteSource = './img/protag.png'
    this.spritesheetY = 0

    this.orientation = 'N' //N, S, E or W

    this.velocity = 15

    this.bullets = []
  }

  init() {
    this.image = new Image()
    this.image.src = this.spriteSource
    this.image.frames = 3
    this.image.frameIndex = 0
    this.image.onload = () =>
      this.ctx.drawImage(
        this.image,
        0,
        0,
        64,
        64,
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

  draw(framesCounter) {
    this.ctx.drawImage(
      this.image,
      this.image.frameIndex * this.size.width,
      this.spritesheetY * this.size.height,
      this.size.height,
      this.size.width,
      this.position.x,
      this.position.y,
      this.size.height,
      this.size.width
    )
    
    this.animate(framesCounter)

  }

  animate(framesCounter) {
    if (framesCounter % this.image.frames == 0) {
      this.image.framesIndex++
    }
    if (this.image.framesIndex > this.image.frames - 1) {
      this.image.framesIndex = 0
    }
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
        this.spritesheetY = 0
        break

      case 'S':
        this.orientation = 'S'
        this.spritesheetY = 2
        break

      case 'E':
        this.orientation = 'E'
        this.spritesheetY = 3
        break

      case 'W':
        this.orientation = 'W'
        this.spritesheetY = 1
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

  removeBullet(bullet) {
    if (
      bullet.position.x < 0 ||
      bullet.position.x > this.gameWidth ||
      bullet.position.y < 0 ||
      bullet.position.y > this.gameHeight
    ) {
      this.bullets.shift()
    }
  }
}
