const app = {
  name: 'Escape from Jovian Terminus',
  author: 'Elvira Ramírez Ponce',
  version: '1.0',
  license: undefined,
  canvasDom: undefined,
  ctx: undefined,
  appSize: {
    width: undefined,
    height: undefined,
  },
  fps: 60,
  interval: undefined,
  background: undefined,
  player: undefined,
  walls: [],
  enemies: [],

  init() {
    this.canvasDom = document.getElementById('game-app')
    this.ctx = this.canvasDom.getContext('2d')
    this.setDimensions()
    this.start()
  },

  setDimensions() {
    this.appSize.width = window.innerWidth - 10
    this.appSize.height = window.innerHeight - 10
    this.canvasDom.width = this.appSize.width
    this.canvasDom.height = this.appSize.height
  },

  //free range organic handmade primitive walls
  setWalls() {
    this.walls.push(
      new Wall(
        this.ctx,
        this.appSize.width,
        50,
        0,
        0,
        this.appSize.width,
        this.appSize.height
      )
    )
    this.walls.push(
      new Wall(
        this.ctx,
        this.appSize.width,
        50,
        0,
        this.appSize.height - 50,
        this.appSize.width,
        this.appSize.height
      )
    )
    this.walls.push(
      new Wall(
        this.ctx,
        50,
        this.appSize.height,
        0,
        0,
        this.appSize.width,
        this.appSize.height
      )
    )
    this.walls.push(
      new Wall(
        this.ctx,
        50,
        this.appSize.height,
        this.appSize.width - 50,
        0,
        this.appSize.width,
        this.appSize.height
      )
    )
  },

  start() {
    this.setWalls()
    this.drawWalls()
    this.player = new Player(this.ctx, this.appSize.width, this.appSize.height)
    this.player.init()
    this.player.setEventListeners()
    this.interval = setInterval(() => {
      this.clear()
      this.walls.forEach((wall) =>
        wall.isPlayerCollision(this.player, wall)
          ? this.player.bump()
          : null
      )
      this.drawAll()
    }, 1000 / this.fps)
  },

  clear() {
    this.ctx.clearRect(0, 0, this.appSize.width, this.appSize.height)
  },

  drawAll() {
    this.player.draw()
    this.drawWalls()
  },

  drawWalls() {
    this.walls.forEach((wall) => wall.draw())
  },
}
