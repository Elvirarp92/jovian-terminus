let tile //not a fan of having this variable hanging around to be used on the object but what can you do

const app = {
  name: 'Jovian Terminus',
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
  goal: undefined,
  enemies: [],

  init() {
    this.ctx = this.canvasDom.getContext('2d')
    this.start()
  },

  start() {
    this.setMap()

    this.goal = new Goal(this.ctx, 20*48, 0)
    this.goal.init()

    this.player = new Player(this.ctx, this.appSize.width, this.appSize.height)
    this.player.init()

    this.setEnemies()
    this.enemies.forEach((enemy) => enemy.init())

    this.player.setEventListeners()

    this.interval = setInterval(() => {
      this.clear()

      this.player.isCollision(this.player, this.goal) ? this.gameOver("win") : null

      this.enemies.forEach((enemy) => {
        enemy.actionCounter > enemy.behavior.length - 1
          ? (enemy.actionCounter = 0)
          : null

        enemy.doAction(enemy.behavior[enemy.actionCounter])
        enemy.isCollision(this.player, enemy) ? this.gameOver(loss) : null

        enemy.bullets.forEach((bullet) => {
          bullet.isCharCollision(bullet, this.player) ? this.gameOver(loss) : null
          enemy.removeBullet(bullet)
        })
      })

      this.player.bullets.forEach((bullet) => {
        this.enemies.forEach((enemy) => {
          if (bullet.isCharCollision(bullet, enemy)) {
            this.player.bullets.shift()
            enemy.isAlive = false
          }
        })
        this.player.removeBullet(bullet)
      })

      this.enemies = this.enemies.filter((enemy) => enemy.isAlive == true)

      this.drawAll()
    }, 1000 / this.fps)
  },

  setMap() {
    this.map = map1
    this.setDimensions()
  },

  setDimensions() {
    this.appSize.width = this.map.dimensions.cols * this.map.tileSize
    this.appSize.height = this.map.dimensions.rows * this.map.tileSize
    this.canvasDom.width = this.appSize.width
    this.canvasDom.height = this.appSize.height
  },

  setEnemies() {
    this.enemies.push(
      new Enemy(
        this.canvasDom.getContext('2d'),
        this.appSize.width,
        this.appSize.height,
        'S',
        11 * this.map.tileSize,
        4 * this.map.tileSize,
        15,
        enemyRoute1
      )
    )
    this.enemies.push(
      new Enemy(
        app.canvasDom.getContext('2d'),
        app.appSize.width,
        app.appSize.height,
        'W',
        3 * this.map.tileSize,
        3 * this.map.tileSize,
        15,
        enemyRoute2
      )
    )
  },

  clear() {
    this.ctx.clearRect(0, 0, this.appSize.width, this.appSize.height)
  },

  drawAll() {
    this.drawMap(0, this.map) //base layer
    this.goal.draw()
    this.player.draw()
    this.drawEnemies()

    this.drawMap(1, this.map) //upper layer

    this.player.bullets.forEach((bullet) => bullet.draw())

    this.enemies.forEach((enemy) =>
      enemy.bullets.forEach((bullet) => bullet.draw())
    )
  },

  drawMap(layer, map) {
    for (let c = 0; c < map.dimensions.cols; c++) {
      for (let r = 0; r < map.dimensions.rows; r++) {
        tile = map.getTile(layer, c, r)

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


  //placeholder until i figure out how to make an actual game over screen
  gameOver(mode) {
    switch (mode) {
      case "loss":
        alert(`GAME OVER`)
        break
      case "win":
        alert(`You managed to escape!`)
        break
    }
    document.location.reload()
    window.clearInterval(this.interval)
  }
}