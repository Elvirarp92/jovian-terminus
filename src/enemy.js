class Enemy extends Player {
  constructor(ctx, gameWidth, gameHeight, velocity, behaviorArray) {
    super(ctx, gameWidth, gameHeight)
    this.velocity = velocity

    this.actionCounter = 0
    this.behavior = behaviorArray
  }

  /*behaviorArray is an array of objects, where every object follows this format:
  {name: move/rotate/shoot,
  desiredDirection: undefined/"N"/"S"/"E"/"W" - relevant only for rotations}   */



}
