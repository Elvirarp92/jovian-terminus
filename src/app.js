let tile //not a fan of having this variable hanging around to be used on the object but what can you do

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
  map: undefined,
  walls: [],
  enemies: [],

  init() {
    this.ctx = this.canvasDom.getContext('2d')

    this.start()
  },

  setDimensions() {
    this.appSize.width = this.map.dimensions.cols * this.map.tileSize
    this.appSize.height = this.map.dimensions.rows * this.map.tileSize
    this.canvasDom.width = this.appSize.width
    this.canvasDom.height = this.appSize.height
  },

  setMap() {
    this.map = map1Layer1
    this.setDimensions()
  },

  setEnemies() {
    this.enemies.push(enemy1)
    this.enemies.push(enemy2)
  },

  start() {
    this.setMap()
    // this.setEnemies()
    this.player = new Player(this.ctx, this.appSize.width, this.appSize.height)
    this.player.init()
    this.enemies.forEach((enemy) => enemy.init())
    this.player.setEventListeners()
    this.interval = setInterval(() => {
      this.clear()
      this.enemies.forEach((enemy) => {
        enemy.actionCounter > enemy.behavior.length - 1
          ? (enemy.actionCounter = 0)
          : null
        enemy.doAction(enemy.behavior[enemy.actionCounter])
        // enemy.isCollision(this.player, enemy) ? this.gameOver() : null
        // enemy.bullets.forEach((bullet) =>
        //   bullet.isCollision(bullet, this.player) ? this.gameOver() : null
        // )
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
    this.drawMap(this.map)
    this.player.draw()
    this.drawEnemies()
    this.player.bullets.forEach((bullet) => bullet.draw())
    this.enemies.forEach((enemy) =>
      enemy.bullets.forEach((bullet) => bullet.draw())
    )
  },

  drawMap(map) {
    for (let c = 0; c < map.dimensions.cols; c++) {
      for (let r = 0; r < map.dimensions.rows; r++) {
        tile = map.getTile(c, r)
        if (tile != 0) {
          this.ctx.drawImage(
            map.tileset, // image
            Math.floor((tile - 1) % map.tilesPerRow) * map.tileSize, //SourceX
            Math.floor((tile - 1) / map.tilesPerRow) * map.tileSize, //SourceY
            map.tileSize, //Source Width
            map.tileSize, //Source Height
            c * map.tileSize, //TargetX
            r * map.tileSize, //TargetY
            map.tileSize, //Target width
            map.tileSize //Target Height
          )
        }
      }
    }
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
