//  tslint:disable-next-line
/// <reference path="../../phaser.d.ts"/>

import 'phaser'
import { BootScene } from './scenes/bootScene'
import { GameScene } from './scenes/gameScene'
import { MainMenuScene } from './scenes/mainMenuScene'

const config: GameConfig = {
  title: 'Snake',
  url: 'https://github.com/digitsensitive/phaser3-typescript',
  version: '1.1',
  width: 256,
  height: 224,
  zoom: 3,
  type: Phaser.AUTO,
  parent: 'game',
  scene: [BootScene, MainMenuScene, GameScene],
  input: {
    keyboard: true,
    mouse: false,
    touch: false,
    gamepad: false,
  },
  backgroundColor: '#000000',
  pixelArt: true,
  antialias: false,
}

export class Game extends Phaser.Game {
  constructor(config: GameConfig) {
    super(config)
  }
}

window.onload = () => {
  const game = new Game(config)
}
