export class MainMenuScene extends Phaser.Scene {
  private bitmapTexts: Phaser.GameObjects.BitmapText[] = []
  private startKey: Phaser.Input.Keyboard.Key

  constructor() {
    super({
      key: 'MainMenuScene',
    })
  }
  public init() {
    this.startKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S)
  }

  public preload() {
    this.load.bitmapFont(
      'asteroidFont',
      './assets/games/asteroid/asteroidFont.png',
      './assets/games/asteroid/asteroidFont.fnt',
    )
  }

  public create() {
    this.bitmapTexts.push(
      this.add.bitmapText(
        this.sys.canvas.width / 2 - 150,
        this.sys.canvas.height / 2 + 40,
        'asteroidFont',
        'Welcome...\nPRESS S TO START',
        45,
      ),
    )
  }

  public update() {
    if (this.startKey.isDown) {
      this.scene.start('GameScene')
      this.startKey.isDown = false
    }
  }
}
