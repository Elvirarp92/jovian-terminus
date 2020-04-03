const app = {
  name: 'Escape from Jovian Terminus',
  author: 'Elvira Ramírez Ponce',
  version: '1.0',
  license: undefined,
  canvasDom: undefined,
  ctx: undefined,
  appSize: {
    width: undefined,
    height: undefined
  },
  fps: 60,
  interval: undefined,
  background: undefined,
  player: undefined,
  enemies: [],
  obstacles: [],
  keys: {
    W: 87,
    A: 65,
    S: 83,
    D: 68,
    SPACE: 32
  },

  init() {
    this.canvasDom = document.getElementById('game-app')
    this.ctx = this.canvasDom.getContext('2d')
    this.setDimensions()
    this.start()
  },

  setDimensions() {
    this.appSize.width = window.innerWidth
    this.appSize.height = window.innerHeight
    this.canvasDom.width = this.appSize.width
    this.canvasDom.height = this.appSize.height
  },

  start() {
    this.player = new Player(this.ctx, this.appSize.width, this.appSize.height, this.keys)
    this.player.init()
    this.interval = setInterval(() => {
      this.clear()
      this.drawAll()
    }, 1000 / this.fps)
  },

  clear() {
    this.ctx.clearRect(0, 0, this.appSize.width, this.appSize.height)
  },

  drawAll() {
    this.player.draw()
  }

}
