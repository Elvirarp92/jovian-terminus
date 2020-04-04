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

  isCollision(player, wall){
    return (player.position.x < wall.position.x + wall.size.width &&
      player.position.x + player.size.width > wall.position.x &&
      player.position.y < wall.position.y + wall.size.height &&
      player.position.y + player.size.height > wall.position.y)
  }
}
