import Phaser from "phaser"
import { Text } from "./Text"

export class MainMenu extends Phaser.Scene {
  constructor() {
    super({ key: "mainMenu" })
  }

  init() {
    this.config = this.game.config
  }

  create() {
    let graphics = this.add.graphics()
    graphics.fillStyle(0x000000, 0.8)
    graphics.fillRect(this.config.width / 4, this.config.height / 4, this.config.width / 2, this.config.height / 2)

    // let graphics2 = this.add.graphics()
    // graphics2.lineStyle(2, 0xffffff, 1)
    // graphics2.strokeRect(this.config.width / 4, this.config.height / 4, this.config.width / 2, this.config.height / 2)

    this.titleText = new Text(this, this.config.width / 2, 100, "Gravitas", 50)
    this.titleText.setCenterAlign()
    this.titleText.setLetterSpacing(4)

    this.startText = new Text(this, this.config.width / 2, this.config.height / 2, "Play", 30)
    this.startText.setCenterAlign()
    this.startText.setInteractive()
    this.startText.on("pointerdown", this.startLevel1, this)
  }

  startLevel1() {
    this.scene.launch("level1");
    this.scene.stop()
  }
}