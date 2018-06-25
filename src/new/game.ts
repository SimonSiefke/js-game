import 'phaser'

import { BootScene } from './scenes/bootScene'

const config: GameConfig = {
  type: Phaser.WEBGL,
  backgroundColor: '#4441f2',
  parent: 'game',
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    impact: {
      setBounds: {
        x: 0,
        y: 0,
        width: 1600,
        height: 600,
      },
    },
    arcade: {
      gravity: { y: 600 },
      debug: false,
    },
  },
  scene: [BootScene],
}

const game = new Phaser.Game(config)
