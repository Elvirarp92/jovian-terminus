class Goal {
  constructor(ctx, posX, posY) {
    this.ctx = ctx
    this.position = { x: posX, y: posY }
    this.size = { height: 48, width: 48 }

    this.image = undefined
    this.spriteSource = './img/goal-arrow.png'
  }

  init() {
    this.image = new Image()
    this.image.src = this.spriteSource
    this.image.onload = () =>
      this.ctx.drawImage(
        this.image,
        0,
        0,
        48,
        48,
        this.position.x,
        this.position.y,
        this.size.width,
        this.size.height
      )
  }

  draw() {
    this.ctx.drawImage(
      this.image,
      0,
      0,
      48,
      48,
      this.position.x,
      this.position.y,
      this.size.width,
      this.size.height
    )
  }
}
