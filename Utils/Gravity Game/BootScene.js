import Phaser from "phaser"
import { PreloadScene } from "./PreloadScene"
import { Background } from "./Background"

export class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: "bootScene" })
  }

  preload() {
    this.load.image("spacebg", "Gravity Game/spacebg.png")
    this.load.bitmapFont("pixelFont", "Ship Game/font/font.png", "Ship Game/font/font.xml")

    this.scene.add("background", Background, false)
    this.scene.add("preloadScene", PreloadScene, false)
  }

  create() {
    this.scene.start("background")
    this.scene.start("preloadScene")
    this.scene.stop()

  }
}