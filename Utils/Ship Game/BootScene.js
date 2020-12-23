import Phaser from "phaser"

export class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: "bootGame" })
  }

  preload() {
    this.load.image("background", "Ship Game/background.png")
    // this.load.image("ship1", "Ship Game/ship1.png")
    // this.load.image("ship2", "Ship Game/ship2.png")
    // this.load.image("ship3", "Ship Game/ship3.png")

    this.load.spritesheet("ship1", "Ship Game/spritesheets/ship1.png", {
      frameWidth: 16,
      frameHeight: 16
    })
    this.load.spritesheet("ship2", "Ship Game/spritesheets/ship2.png", {
      frameWidth: 32,
      frameHeight: 16
    })
    this.load.spritesheet("ship3", "Ship Game/spritesheets/ship3.png", {
      frameWidth: 32,
      frameHeight: 32
    })
    this.load.spritesheet("explosion", "Ship Game/spritesheets/explosion.png", {
      frameWidth: 16,
      frameHeight: 16
    })
  }

  create() {
    this.background = this.add.image(0, 0, "background")
    this.background.setOrigin(0, 0)
    this.add.text(20, 20, "Loading game...", { font: "25px Arial", fill: "yellow" })
    this.scene.start("playGame")
  }
}