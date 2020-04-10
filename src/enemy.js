class Enemy extends Player {
  constructor(ctx, gameWidth, gameHeight, orientation, posX, posY) {
    super(ctx, gameWidth, gameHeight)

    this.orientation = orientation
    this.position = { x: posX, y: posY }

    this.counter = 0

    this.spriteSource = './img/skeleton-baddie.png'

    this.isAlive = true
  }

  /*actionArray is an array of objects, where every object follows this format:
  {name: move/rotate/shoot/wait,
  desiredDirection: undefined/"N"/"S"/"E"/"W" - relevant only for rotations}   */

  act() {
    if (this.counter % 30 == 0) {
      if (this.orientation == 'N' || this.orientation == 'S') {
        if (Math.round(Math.random()) == 1) {
          this.rotate('E')
        } else {
          this.rotate('W')
        }
      } else {
        if (Math.round(Math.random()) == 1) {
          this.rotate('N')
        } else {
          this.rotate('S')
        }
      }

      this.shoot()
    }

    this.counter++
  }
}
