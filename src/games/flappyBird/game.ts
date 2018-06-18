//  tslint:disable-next-line
/// <reference path="../../phaser.d.ts"/>

import 'phaser'
import { BootScene } from './scenes/bootScene'
import { GameScene } from './scenes/gameScene'
import { MainMenuScene } from './scenes/mainMenuScene'

const config: GameConfig = {
  title: 'Flappy Bird',
  url: 'https://github.com/digitsensitive/phaser3-typescript',
  version: '1.0',
  width: 405,
  height: 600,
  zoom: 1.2,
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
      gravity: { y: 300 },
      debug: false,
    },
  },
  backgroundColor: '#8abbc1',
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
