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
}