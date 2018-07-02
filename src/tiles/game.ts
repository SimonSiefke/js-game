import 'phaser'
var config = {
  type: Phaser.WEBGL,
  width: 800,
  height: 600,
  backgroundColor: '#2d2d2d',
  parent: 'phaser-example',
  pixelArt: true,
  scene: {
    preload: preload,
    create: create,
  },
}

var controls

var game = new Phaser.Game(config)

function preload() {
  this.load.image(
    'tiles',
    '../../assets/games/tiles/Screenshot from 2018-06-17 19-33-06.png',
  )
  this.load.tilemapTiledJSON('map', '../../assets/games/tiles/map.json')
}

function create() {
  var map = this.make.tilemap()

  var tiles = map.addTilesetImage('Tile Layer 1', 'tiles')

  var layer = map.createStaticLayer(0, tiles, 0, 0)

  this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels)

  var cursors = this.input.keyboard.createCursorKeys()

  this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels)

  var cursors = this.input.keyboard.createCursorKeys()

  var controlConfig = {
    camera: this.cameras.main,
    left: cursors.left,
    right: cursors.right,
    up: cursors.up,
    down: cursors.down,
    speed: 0.5,
  }

  controls = new Phaser.Cameras.Controls.FixedKeyControl(controlConfig)
}
