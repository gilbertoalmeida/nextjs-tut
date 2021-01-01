import Phaser from "phaser"

export class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: "bootScene" })
  }

  preload() {
    this.load.image("spacebg", "Gravity Game/spacebg.png")
    this.load.bitmapFont("pixelFont", "Ship Game/font/font.png", "Ship Game/font/font.xml")
  }

  create() {
    this.scene.start("preloadScene")
  }
}