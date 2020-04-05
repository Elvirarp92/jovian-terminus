const app = {
  name: 'Escape from Jovian Terminus',
  author: 'Elvira Ramírez Ponce',
  version: '1.0',
  license: undefined,
  canvasDom: document.getElementById('game-app'),
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

  setEnemies() {
    this.enemies.push(enemy1)
    this.enemies.push(enemy2)
  },

  start() {
    this.setWalls()
    this.setEnemies()
    this.player = new Player(this.ctx, this.appSize.width, this.appSize.height)
    this.player.init()
    this.enemies.forEach((enemy) => enemy.init())
    this.player.setEventListeners()
    this.interval = setInterval(() => {
      this.clear()
      this.walls.forEach((wall) =>
        wall.isCollision(this.player, wall) ? this.player.bump() : null
      )
      this.walls.forEach((wall) =>
        {this.enemies.forEach((enemy) =>
          wall.isCollision(enemy, wall) ? enemy.bump() : null
        )
        this.player.bullets.forEach((bullet) => bullet.isCollision(bullet, wall) ? this.player.bullets.shift() : null)}
      )
      this.enemies.forEach((enemy) => {
        enemy.actionCounter > enemy.behavior.length - 1
          ? (enemy.actionCounter = 0)
          : null
        enemy.doAction(enemy.behavior[enemy.actionCounter])
        enemy.isCollision(this.player, enemy) ? this.gameOver() : null
      })
      this.player.bullets.forEach((bullet) =>
        this.enemies.forEach((enemy) => {
          if (bullet.isCollision(bullet, enemy)) {
            this.player.bullets.shift()
            enemy.isAlive = false
          }
        })
      )
      this.enemies = this.enemies.filter((enemy) => enemy.isAlive == true)
      this.drawAll()
    }, 1000 / this.fps)
  },

  clear() {
    this.ctx.clearRect(0, 0, this.appSize.width, this.appSize.height)
  },

  drawAll() {
    this.player.draw()
    this.drawWalls()
    this.drawEnemies()
    this.player.bullets.forEach((bullet) => bullet.draw())
  },

  drawWalls() {
    this.walls.forEach((wall) => wall.draw())
  },

  drawEnemies() {
    this.enemies.forEach((enemy) => enemy.draw())
  },

  gameOver() {
    alert(`GAME OVER`)
    document.location.reload()
    window.clearInterval(this.interval)
  },
}
