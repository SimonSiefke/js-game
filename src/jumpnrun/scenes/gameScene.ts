/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2018 Digitsensitive
 * @description  Asteroid: Game Scene
 * @license      Digitsensitive
 */

import { Ship } from '../objects/ship'

export class GameScene extends Phaser.Scene {
  private player: Ship

  constructor() {
    super({
      key: 'GameScene',
      physics: {
        system: 'impact',
        gravity: 100,
        setBounds: {
          width: 800,
          height: 600,
        },
      },
    })
  }

  public create() {
    const platforms = this.physics.add.staticGroup()

    platforms.create(400, 568, 'ground')

    platforms.create(600, 400, 'ground')
    platforms.create(50, 250, 'ground')
    platforms.create(750, 220, 'ground')
    this.player = new Ship({ scene: this, opt: {} })
    this.player.body.gravity.y = 10
    // this.physics.add.collider(player, platforms)
  }

  public update() {
    this.player.update()
  }
}
