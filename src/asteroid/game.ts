//  tslint:disable-next-line
/// <reference path="../phaser.d.ts"/>

import 'phaser'
import { BootScene } from './scenes/bootScene'
import { GameScene } from './scenes/gameScene'
import { MainMenuScene } from './scenes/mainMenuScene'

const config: GameConfig = {
  title: 'Asteroid',
  url: 'https://github.com/digitsensitive/phaser3-typescript',
  version: '1.0',
  width: 800,
  height: 600,
  type: Phaser.AUTO,
  parent: 'game',
  scene: [BootScene, MainMenuScene, GameScene],
  input: {
    keyboard: true,
    mouse: false,
    touch: false,
    gamepad: false,
  },
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
    },
  },
  backgroundColor: '#000000',
  pixelArt: false,
  antialias: true,
}

export class Game extends Phaser.Game {
  constructor(config: GameConfig) {
    super(config)
  }
}

window.onload = () => {
  // tslint:disable-next-line
  const game = new Game(config)
}
