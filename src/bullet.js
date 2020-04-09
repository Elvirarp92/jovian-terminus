class Bullet {
  constructor(
    ctx,
    shooterPosX,
    shooterPosY,
    shooterHeight,
    shooterWidth,
    direction
  ) {
    this.ctx = ctx
    this.position = {
      x: shooterPosX + shooterWidth / 2,
      y: shooterPosY + shooterHeight / 2,
    }
    this.direction = direction
    this.radius = 5
    this.velocity = 25
    this.exists = true
  }

  draw() {
    this.ctx.beginPath()
    this.ctx.fillStyle = '#000000'
    this.ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
    this.ctx.fill()
    this.ctx.closePath()
    this.move(this.direction)
  }

  move(direction) {
    switch (direction) {
      case 'N':
        app.gameMap.isTransitable(
          this.position.x,
          (this.position.y -= this.velocity)
        )
          ? (this.position.y -= this.velocity)
          : (this.exists = false)
        break
      case 'S':
        app.gameMap.isTransitable(
          this.position.x,
          (this.position.y += this.velocity)
        )
          ? (this.position.y += this.velocity)
          : (this.exists = false)
        break
      case 'E':
        app.gameMap.isTransitable(
          (this.position.x += this.velocity),
          this.position.y
        )
          ? (this.position.x += this.velocity)
          : (this.exists = false)
        break
      case 'W':
        app.gameMap.isTransitable(
          (this.position.x -= this.velocity),
          this.position.y
        )
          ? (this.position.x -= this.velocity)
          : (this.exists = false)
        break
    }
  }

  isCharCollision(bullet, target) {
    return (
      bullet.position.x < target.position.x + target.size.width &&
      bullet.position.x > target.position.x &&
      bullet.position.y < target.position.y + target.size.height &&
      bullet.position.y > target.position.y
    )
  }
}
