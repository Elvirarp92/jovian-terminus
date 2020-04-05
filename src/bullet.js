class Bullet {
  constructor(ctx, shooterPosX, shooterPosY, shooterHeight, shooterWidth, direction){
    this.ctx = ctx
    this.position = {x: shooterPosX + shooterWidth/2, y: shooterPosY + shooterHeight/2}
    this.direction = direction
    this.radius = 5
    this.velocity = 25
  }

  draw() {
    this.ctx.beginPath()
    this.ctx.fillStyle = "#000000"
    this.ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI*2)
    this.ctx.fill()
    this.ctx.closePath()
    this.move(this.direction)
  }

  move(direction) {
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

  isCollision(bullet, target) {
    return (
      bullet.position.x < target.position.x + target.size.width &&
      bullet.position.x > target.position.x &&
      bullet.position.y < target.position.y + target.size.height &&
      bullet.position.y > target.position.y
    )
  }

}