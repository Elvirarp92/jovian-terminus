class Map {
  constructor(rows, cols, tileArray, upperArray) {
    this.dimensions = { rows: rows, cols: cols }
    this.tileSize = 48
    this.tileset = new Image()
    this.tileset.src = './img/scifi_space_rpg_tiles.png'
    this.array = tileArray
    this.upperLayer = upperArray
    this.tilesPerRow = 8 //number of tiles per row in our tileset pic
  }

  isTransitable(x, y) {
    if (!this.validatePosition(x, y)) {return false}
    let column = Math.round(x / this.tileSize)
    let row = Math.round(y / this.tileSize)

    let tile = this.array[row][column]

    return tile.isTransitable
  }

  validatePosition(x, y) {
    if (x < 48 || x > app.appSize.width - 48 || y < 48 || y > app.appSize.height - 48) {
      return false
    } else {return true}
  }
}

class Tile {
  constructor(id, transitability) {
    this.id = id

    switch (transitability) {
      case true:
        this.isTransitable = true
        break
      case false:
        this.isTransitable = false
        break
      default:
        if (
          id == 62 ||
          id == 63 ||
          id == 64 ||
          id == 70 ||
          id == 71 ||
          id == 72 ||
          id == 78 ||
          id == 79 ||
          id == 80 ||
          id == 83 ||
          id == 84 ||
          id == 85 ||
          id == 86 ||
          id == 87 ||
          id == 88 ||
          id == 94 ||
          id == 95 ||
          id == 96 ||
          id == 101
        ) {
          this.isTransitable = true
        } else {
          this.isTransitable = false
        }
        break
    }
  }
}
