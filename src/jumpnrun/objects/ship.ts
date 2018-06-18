import { CONST } from '../const/const'

export class Ship extends Phaser.GameObjects.Graphics {
  private currentScene: Phaser.Scene
  private velocity: Phaser.Math.Vector2
  private cursors: any

  constructor(params) {
    super(params.scene, params.opt)

    // variables
    this.currentScene = params.scene

    // init ship
    this.initShip()

    // input
    this.cursors = this.currentScene.input.keyboard.createCursorKeys()

    // physics
    this.currentScene.physics.world.enable(this)
    this.body.allowGravity = false

    this.currentScene.add.existing(this)
  }

  public getBody() {
    return this.body
  }

  public update() {
    if (this.active) {
      this.handleInput()
      // tslint:disable-next-line:no-empty
    } else {
    }
    this.applyForces()
    this.checkIfOffScreen()
  }

  private initShip() {
    // define ship properties
    this.x = this.currentScene.sys.canvas.width / 2
    this.y = this.currentScene.sys.canvas.height / 2
    this.velocity = new Phaser.Math.Vector2(0, 0)

    // define ship graphics and draw it
    this.lineStyle(1, 0x00ff44)

    this.strokeTriangle(
      -CONST.SHIP_SIZE,
      CONST.SHIP_SIZE,
      CONST.SHIP_SIZE,
      CONST.SHIP_SIZE,
      0,
      -CONST.SHIP_SIZE,
    )
    this.strokeTriangle(
      -CONST.SHIP_SIZE * 2,
      CONST.SHIP_SIZE * 1.5,
      CONST.SHIP_SIZE * 2,
      CONST.SHIP_SIZE * 1.5,
      0,
      -CONST.SHIP_SIZE * 2,
    )
    this.strokeTriangle(
      -CONST.SHIP_SIZE * 3,
      CONST.SHIP_SIZE * 2,
      CONST.SHIP_SIZE * 3,
      CONST.SHIP_SIZE * 2,
      0,
      -CONST.SHIP_SIZE * 3,
    )
  }

  private handleInput(): void {
    if (this.cursors.up.isDown) {
      this.boost()
    }

    if (this.cursors.right.isDown) {
      this.rotation += 0.05
    } else if (this.cursors.left.isDown) {
      this.rotation -= 0.05
    }
  }

  private boost(): void {
    // create the force in the correct direction
    const force = new Phaser.Math.Vector2(
      Math.cos(this.rotation - Math.PI / 2),
      Math.sin(this.rotation - Math.PI / 2),
    )

    // reduce the force and apply it to the velocity
    force.scale(0.12)
    this.velocity.add(force)
  }
  private applyForces(): void {
    // apple velocity to position
    this.x += this.velocity.x
    this.y += this.velocity.y

    // reduce the velocity
    this.velocity.scale(0.98)
  }

  private checkIfOffScreen(): void {
    // horizontal check
    if (this.x > this.currentScene.sys.canvas.width + CONST.SHIP_SIZE) {
      this.x = -CONST.SHIP_SIZE
    } else if (this.x < -CONST.SHIP_SIZE) {
      this.x = this.currentScene.sys.canvas.width + CONST.SHIP_SIZE
    }

    // vertical check
    if (this.y > this.currentScene.sys.canvas.height + CONST.SHIP_SIZE) {
      this.y = -CONST.SHIP_SIZE
    } else if (this.y < -CONST.SHIP_SIZE) {
      this.y = this.currentScene.sys.canvas.height + CONST.SHIP_SIZE
    }
  }
}
