class Map {
  constructor(rows, cols, tileArray) {
    this.dimensions = { rows: rows, cols: cols }
    this.tileSize = 48
    this.tileset = new Image()
    this.tileset.src = './img/scifi_space_rpg_tiles.png'
    this.array = tileArray
    this.tilesPerRow = 8 //number of tiles per row in our tileset pic
  }

  isTransitable(x, y) {
    let c = Math.round(x / this.tileSize)
    let r = Math.round(y / this.tileSize)
    
    let tile = this.array[r][c]

    return tile.isTransitable
  }
}

class Tile {
  constructor(id) {
    this.id = id
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
  }
}
