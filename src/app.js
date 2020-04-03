const app = {
  name: 'Escape from Jovian Terminus',
  author: 'Elvira Ramírez Ponce',
  version: '1.0',
  license: undefined,
  canvas: undefined,
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
    this.canvas = document.getElementById('game-app')
    this.ctx = this.canvas.getContext('2d')
    this.setDimensions()
    this.start()
  },

  setDimensions() {
    this.appSize.width = window.innerWidth
    this.appSize.height = window.innerHeight
    this.canvas.width = this.appSize.width
    this.canvas.height = this.appSize.height
  },

  start() {
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
