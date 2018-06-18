import { CONST } from '../const/const'

export class MainMenuScene extends Phaser.Scene {
  private startKey: Phaser.Input.Keyboard.Key
  private bitmapTexts: Phaser.GameObjects.BitmapText[] = []

  constructor() {
    super({
      key: 'MainMenuScene',
    })
  }

  public init() {
    this.startKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S)

    // reset score, highscore and player lives
    if (CONST.SCORE > CONST.HIGHSCORE) {
      CONST.HIGHSCORE = CONST.SCORE
    }
    CONST.SCORE = 0
    CONST.LIVES = 3
  }

  public preload() {
    this.load.bitmapFont(
      'asteroidFont',
      './assets/games/asteroid/asteroidFont.png',
      './assets/games/asteroid/asteroidFont.fnt',
    )
  }

  public create() {
    console.log('create main')

    this.bitmapTexts.push(
      this.add.bitmapText(
        this.sys.canvas.width / 2 - 150,
        this.sys.canvas.height / 2 + 40,
        'asteroidFont',
        'PRESS S TO PLAY',
        45,
      ),
    )

    this.bitmapTexts.push(
      this.add.bitmapText(
        this.sys.canvas.width / 2 - 150,
        this.sys.canvas.height / 2 - 60,
        'asteroidFont',
        'A S T E R O I D',
        80,
      ),
    )

    this.bitmapTexts.push(
      this.add.bitmapText(
        this.sys.canvas.width / 2 - 150,
        this.sys.canvas.height / 2 + 80,
        'asteroidFont',
        'HIGHSCORE: ' + CONST.HIGHSCORE,
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
