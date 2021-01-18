import Phaser from "phaser"

export class Background extends Phaser.Scene {
  constructor() {
    super({ key: "background" })
  }

  init() {
    this.config = this.game.config
  }

  create() {
    this.background = this.add.tileSprite(0, 0, this.config.width, this.config.height, "spacebg")
    this.background.setOrigin(0, 0)
  }

  update() {
    this.background.tilePositionY -= 0.005
    this.background.tilePositionX -= 0.005
  }
}