export class BootScene extends Phaser.Scene {
  private player
  private cursors
  private platforms
  private movingPlatforms
  constructor() {
    super({
      key: 'BootScene',
    })
  }

  public preload() {
    this.load.image('sky', '../../../assets/games/new/sky.png')
    this.load.image('ground', '../../../assets/games/new/platform.png')
    this.load.image('dude', '../../../assets/games/new/bicycle.png')
  }

  public create() {
    this.add.image(400, 300, 'sky').setScale(5, 1)
    this.platforms = this.physics.add.staticGroup()

    this.platforms
      .create(40, 600, 'ground')
      .setScale(20, 1)
      .refreshBody()

    this.platforms.create(600, 400, 'ground')
    this.platforms.create(600, 400, 'ground')
    this.platforms.create(750, 220, 'ground')

    this.movingPlatforms = this.physics.add.group()

    const first = this.movingPlatforms.create(300, 450, 'ground')
    first.body.allowGravity = false
    first.body.velocity.x = 50
    first.body.immovable = true
    first.body.collideWorldBounds = true

    // @ts-ignore
    this.cursors = this.input.keyboard.createCursorKeys()

    this.player = this.physics.add.sprite(250, 450, 'dude').setScale(0.2)

    this.player.setBounce(0.2)

    this.player.body.collideWorldBounds = true

    // @ts-ignore
    // this.player.setCollideWorldBounds(true)
    // @ts-ignore
    this.physics.add.collider(this.player, this.platforms)
    // @ts-ignore
    this.physics.add.collider(this.player, this.movingPlatforms)
    // @ts-ignore
    this.cameras.main.setBounds(0, 0, 6200, 600)
    this.cameras.main.startFollow(this.player)
  }

  public update() {
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-160)
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(160)
    } else {
      this.player.setVelocityX(0)
    }

    if (this.cursors.up.isDown && this.player.body.touching.down) {
      this.player.setVelocityY(-330)
    }
  }
}
