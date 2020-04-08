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
    this.image.frames = 5
    this.image.framesIndex = 0
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

  draw(framesCounter) {
    this.ctx.drawImage(
      this.image,
      this.image.framesIndex * Math.floor(this.image.width / this.image.frames),
      0,
      Math.floor(this.image.width / this.image.frames),
      48,
      this.position.x,
      this.position.y,
      this.size.width,
      this.size.height
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
}
