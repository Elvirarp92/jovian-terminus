class Enemy extends Player {
  constructor(
    ctx,
    gameWidth,
    gameHeight,
    orientation,
    posX,
    posY,
    velocity,
    actionArray
  ) {
    super(ctx, gameWidth, gameHeight)
    this.velocity = velocity

    this.orientation = orientation
    this.position = { x: posX, y: posY }

    this.spriteSource = "./img/skeleton-baddie.png"

    this.actionCounter = 0
    this.behavior = actionArray

    this.isAlive = true
  }

  /*actionArray is an array of objects, where every object follows this format:
  {name: move/rotate/shoot/wait,
  desiredDirection: undefined/"N"/"S"/"E"/"W" - relevant only for rotations}   */

  doAction(action) {
    switch (action.name) {
      case 'move':
        this.move(this.orientation)
        break
      case 'rotate':
        this.rotate(action.desiredDirection)
        break
      case 'shoot':
        this.shoot()
        break
      case 'wait':
        break
    }
    this.actionCounter++
  }
}
