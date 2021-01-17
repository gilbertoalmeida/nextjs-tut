import Phaser from "phaser"
import { Text } from "./Text"

export class GameOver extends Phaser.Scene {
  constructor() {
    super({ key: "gameOver" })
  }

  init(data) {
    this.config = this.game.config
    this.message = data.gameOverConfig.message
    this.deathLevel = data.deathLevel
  }

  create() {
    let graphics = this.add.graphics()
    graphics.fillStyle(0x000000, 1)
    graphics.fillRect(this.config.width / 4, this.config.height / 4, this.config.width / 2, this.config.height / 2)

    let graphics2 = this.add.graphics()
    graphics2.lineStyle(2, 0xffffff, 1)
    graphics2.strokeRect(this.config.width / 4, this.config.height / 4, this.config.width / 2, this.config.height / 2)

    this.gameOverText = new Text(this, this.config.width / 2, this.config.height / 3, "Game Over", 28)
    this.gameOverText.setCenterAlign()

    this.messageText = new Text(this, this.config.width / 2, this.config.height / 3 + 30, this.message, 18)
    this.messageText.setCenterAlign()

    this.restartText = new Text(this, this.config.width / 2, this.config.height / 2, "Restart level", 24)
    this.restartText.setCenterAlign()
    this.restartText.setInteractive()
    this.restartText.on("pointerdown", this.restartLevel, this)
  }

  restartLevel() {
    this.scene.launch(this.deathLevel);
    this.scene.stop()
  }
}