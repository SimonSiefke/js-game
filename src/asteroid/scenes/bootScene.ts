export class BootScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'BootScene',
    })
  }

  public update() {
    this.scene.start('MainMenuScene')
  }
}
