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

  fps: 30,
  framesCounter: 0,
  interval: undefined,

  background: undefined,
  player: undefined,

  gameMap: undefined,
  goal: undefined,
  enemies: [],

  bgMusic: undefined,

  init() {
    this.ctx = this.canvasDom.getContext('2d')
    this.bgMusic = new Audio('./audio/horror-ambiance.wav')
    this.start()
  },

  start() {
    this.bgMusic.play()
    this.setMap()

    this.goal = new Goal(this.ctx, 25 * 48, 0.5*48)
    this.goal.init()

    this.player = new Player(this.ctx, this.appSize.width, this.appSize.height)
    this.player.init()

    this.setEnemies()
    this.enemies.forEach((enemy) => enemy.init())

    this.player.setEventListeners()

    this.interval = setInterval(() => {
      this.clear()
      this.framesCounter > 5000 ? (this.framesCounter = 0) : null
      this.player.isCollision(this.player, this.goal)
        ? this.gameOver('win')
        : null

      this.enemies.forEach((enemy) => {
        enemy.act()
        enemy.isCollision(this.player, enemy) ? this.gameOver('loss') : null

        enemy.bullets.forEach((bullet) => {
          bullet.isCharCollision(bullet, this.player)
            ? this.gameOver('loss')
            : null
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
      this.player.bullets = this.player.bullets.filter(
        (bullet) => bullet.exists == true
      )
      this.enemies.forEach(
        (enemy) =>
          (enemy.bullets = enemy.bullets.filter(
            (bullet) => bullet.exists == true
          ))
      )

      this.drawAll()
    }, 1000 / this.fps)
  },

  setMap() {
    this.gameMap = map1
    this.setDimensions()
  },

  setDimensions() {
    this.appSize.width = 30 * 48
    this.appSize.height = 15 * 48
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
        3 * this.gameMap.tileSize,
        7 * this.gameMap.tileSize
      )
    )
    this.enemies.push(
      new Enemy(
        app.canvasDom.getContext('2d'),
        app.appSize.width,
        app.appSize.height,
        'S',
        12 * this.gameMap.tileSize,
        12 * this.gameMap.tileSize
      )
    )
    this.enemies.push(
      new Enemy(
        this.canvasDom.getContext('2d'),
        this.appSize.width,
        this.appSize.height,
        'S',
        10 * this.gameMap.tileSize,
        3 * this.gameMap.tileSize
      )
    )
    this.enemies.push(
      new Enemy(
        this.canvasDom.getContext('2d'),
        this.appSize.width,
        this.appSize.height,
        'S',
        19 * this.gameMap.tileSize,
        5 * this.gameMap.tileSize
      )
    )
    this.enemies.push(
      new Enemy(
        this.canvasDom.getContext('2d'),
        this.appSize.width,
        this.appSize.height,
        'S',
        15 * this.gameMap.tileSize,
        12 * this.gameMap.tileSize
      )
    )
    this.enemies.push(
      new Enemy(
        this.canvasDom.getContext('2d'),
        this.appSize.width,
        this.appSize.height,
        'S',
        27 * this.gameMap.tileSize,
        9 * this.gameMap.tileSize
      )
    )
    this.enemies.push(
      new Enemy(
        this.canvasDom.getContext('2d'),
        this.appSize.width,
        this.appSize.height,
        'S',
        24 * this.gameMap.tileSize,
        11 * this.gameMap.tileSize
      )
    )
    this.enemies.push(
      new Enemy(
        this.canvasDom.getContext('2d'),
        this.appSize.width,
        this.appSize.height,
        'S',
        26 * this.gameMap.tileSize,
        2 * this.gameMap.tileSize
      )
    )
  },

  clear() {
    this.ctx.clearRect(0, 0, this.appSize.width, this.appSize.height)
  },

  drawAll() {
    this.drawMap(this.gameMap.array) //base layer
    this.goal.draw(this.framesCounter)
    this.player.draw()
    this.drawEnemies()
    this.player.bullets.forEach((bullet) => bullet.draw())

    this.enemies.forEach((enemy) =>
      enemy.bullets.forEach((bullet) => bullet.draw())
    )
    this.drawMap(this.gameMap.upperLayer) 
  },

  drawMap(array) {
    for (let c = 0; c < this.gameMap.dimensions.cols; c++) {
      for (let r = 0; r < this.gameMap.dimensions.rows; r++) {
        tile = array[r][c]
        if (tile != 0) {
          this.ctx.drawImage(
            this.gameMap.tileset, // image
            Math.floor((tile.id - 1) % this.gameMap.tilesPerRow) * this.gameMap.tileSize, //SourceX
            Math.floor((tile.id - 1) / this.gameMap.tilesPerRow) * this.gameMap.tileSize, //SourceY
            this.gameMap.tileSize, //Source Width
            this.gameMap.tileSize, //Source Height
            c * this.gameMap.tileSize, //TargetX
            r * this.gameMap.tileSize, //TargetY
            this.gameMap.tileSize, //Target width
            this.gameMap.tileSize //Target Height
          )
        }
      }
    }
  },

  drawEnemies() {
    this.enemies.forEach((enemy) => enemy.draw(this.framesCounter))
  },

  gameOver(mode) {
    switch (mode) {
      case 'loss':
        this.bgMusic.pause()
        window.clearInterval(this.interval)
        gameOverScreen.style.display = 'block'
        gameApp.style.display = 'none'
        break
      case 'win':
        this.bgMusic.pause()
        window.clearInterval(this.interval)
        victoryScreen.style.display = 'block'
        gameApp.style.display = 'none'
        break
    }
  },
}
