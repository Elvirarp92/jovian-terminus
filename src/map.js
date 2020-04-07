class Map {
  constructor(rows, cols, tileArray) {
    this.dimensions = { rows: rows, cols: cols }
    this.tileSize = 48
    this.tileset = new Image()
    this.tileset.src = './img/scifi_space_rpg_tiles.png'
    this.tiles = tileArray
    this.tilesPerRow = 8 //number of tiles per row in our tileset pic
  }

  getTile(column, row) {
    return this.tiles[row * this.dimensions.cols + column]
  }

  isSolidTile(x, y) {
    let col = Math.floor(x / this.tileSize)
    let row = Math.floor(y / this.tileSize)

    let tile = this.getTile(col, row)

    return (tile >= 41 && tile <= 43) ||
      (tile >= 49 && tile <= 51) ||
      (tile >= 57 && tile <= 61) ||
      (tile >= 65 && tile <= 69) ||
      (tile >= 73 && tile <= 77) ||
      (tile >= 132 && tile <= 152)
      ? true
      : false
  }
}
