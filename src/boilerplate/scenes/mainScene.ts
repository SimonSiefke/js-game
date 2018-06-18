export class MainScene extends Phaser.Scene {
  private phaserSprite: Phaser.GameObjects.Sprite

  constructor() {
    super({
      key: 'MainScene',
    })
  }

  public preload(): void {
    this.load.image('logo', './assets/boilerplate/phaser.png')
  }

  public create(): void {
    this.phaserSprite = this.add.sprite(400, 300, 'logo')
  }
}
