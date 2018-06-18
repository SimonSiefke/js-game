/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2018 Digitsensitive
 * @description  Asteroid: Game Scene
 * @license      Digitsensitive
 */

import { CONST } from '../const/const'
import { Asteroid } from '../objects/asteroid'
import { Ship } from '../objects/ship'

export class GameScene extends Phaser.Scene {
  private player: Ship
  private asteroids: Asteroid[]
  private numberOfAsteroids: number
  private score: number
  private bitmapTexts: Phaser.GameObjects.BitmapText[]
  private gotHit: boolean

  constructor() {
    super({
      key: 'GameScene',
    })
  }

  public create() {
    this.player = new Ship({ scene: this, opt: {} })
    this.asteroids = []
    this.numberOfAsteroids = CONST.ASTEROID_COUNT
    this.spawnAsteroids(this.numberOfAsteroids, 3)
    this.score = CONST.SCORE
    this.bitmapTexts = []
    this.bitmapTexts.push(
      this.add.bitmapText(
        this.sys.canvas.width / 2,
        40,
        'asteroidFont',
        '' + this.score,
        80,
      ),
    )
    this.gotHit = false
  }

  public update() {
    this.player.update()

    // check collision between asteroids and bullets
    for (const [i, asteroid] of this.asteroids.entries()) {
      for (const bullet of this.player.getBullets()) {
        if (
          Phaser.Geom.Intersects.RectangleToRectangle(
            bullet.getBody(),
            asteroid.getBody(),
          )
        ) {
          bullet.setActive(false)
          asteroid.setActive(false)
          this.updateScore(asteroid.getSize())
        }
      }
      asteroid.update()

      if (!asteroid.active) {
        this.spawnAsteroids(3, asteroid.getSize() - 1, asteroid.x, asteroid.y)
        asteroid.destroy()
        this.asteroids.splice(i, 1)
      }
    }

    // check collision between asteroids and ship
    for (const asteroid of this.asteroids) {
      if (
        Phaser.Geom.Intersects.RectangleToRectangle(
          asteroid.getBody(),
          this.player.getBody(),
        )
      ) {
        this.player.setActive(false)
        this.gotHit = true
      }
    }

    // if player got hit
    if (this.gotHit) {
      CONST.LIVES--
      if (CONST.LIVES > 0) {
        this.scene.start('GameScene')
      } else {
        this.scene.start('MainMenuScene')
      }
    }

    if (this.asteroids.length === 0) {
      this.scene.start('MainMenuScene')
    }
  }

  private spawnAsteroids(
    aAmount: number,
    aSize: number,
    aX?: number,
    aY?: number,
  ) {
    if (aSize > 0) {
      for (let i = 0; i < aAmount; i++) {
        this.asteroids.push(
          new Asteroid({
            scene: this,
            x:
              aX === undefined
                ? this.getRandomSpawnPostion(this.sys.canvas.width)
                : aX,
            y:
              aY === undefined
                ? this.getRandomSpawnPostion(this.sys.canvas.height)
                : aY,
            size: aSize,
          }),
        )
      }
    }
  }

  private updateScore(aSizeOfAsteroid: number) {
    switch (aSizeOfAsteroid) {
      case 3:
        this.score += 20
        break
      case 2:
        this.score += 50
        break
      case 1:
        this.score += 100
        break
    }

    CONST.SCORE = this.score
    this.bitmapTexts[0].text = '' + this.score
  }

  private getRandomSpawnPostion(aScreenSize: number): number {
    let rndPos = Phaser.Math.RND.between(0, aScreenSize)

    while (rndPos > aScreenSize / 3 && rndPos < (aScreenSize * 2) / 3) {
      rndPos = Phaser.Math.RND.between(0, aScreenSize)
    }

    return rndPos
  }
}
