import Phaser from "phaser"
import { Text } from "./Text"
import EventHub from './EventHub'

export class GameOver extends Phaser.Scene {
  constructor() {
    super({ key: "gameOver" })
  }

  init(data) {
    const { reason, message, level, numberOfDeaths, timeOfRun } = data.gameOverConfig
    this.config = this.game.config
    this.reason = reason || "mistery"
    this.message = message || "why did you die?"
    this.gameOverLevel = level || "level1"
    this.numberOfDeaths = numberOfDeaths
    this.timeOfRun = timeOfRun
  }

  create() {
    let graphics = this.add.graphics()
    graphics.fillStyle(0x000000, 0.8)
    graphics.fillRect(this.config.width / 4, this.config.height / 4, this.config.width / 2, this.config.height / 2)

    // let graphics2 = this.add.graphics()
    // graphics2.lineStyle(2, 0xffffff, 1)
    // graphics2.strokeRect(this.config.width / 4, this.config.height / 4, this.config.width / 2, this.config.height / 2)

    this.gameOverText = new Text(this, this.config.width / 2, this.config.height / 3, this.numberOfDeaths ? "Done" : "Game Over", 28)
    this.gameOverText.setCenterAlign()

    if (this.timeOfRun) {
      this.numberOfDeathsText = new Text(this, this.config.width / 2, this.config.height / 3 + 60, "Deaths: " + this.numberOfDeaths, 24)
      this.numberOfDeathsText.setCenterAlign()

      this.timeOfRunText = new Text(this, this.config.width / 2, this.config.height / 3 + 80, this.timeOfRun, 24)
      this.timeOfRunText.setCenterAlign()

    } else {
      this.messageText = new Text(this, this.config.width / 2, this.config.height / 3 + 30, this.message, 18)
      this.messageText.setCenterAlign()

      this.restartText = new Text(this, this.config.width / 2, this.config.height / 1.9, "Restart level", 24)
      this.restartText.setCenterAlign()
      this.restartText.setInteractive()
      this.restartText.on("pointerdown", this.restartLevel, this)
    }

    this.mainMenuText = new Text(this, this.config.width / 2, this.config.height / 1.9 + 40, "Main Menu", 24)
    this.mainMenuText.setCenterAlign()
    this.mainMenuText.setInteractive()
    this.mainMenuText.on("pointerdown", this.goToMenu, this)
  }

  restartLevel() {
    this.scene.launch(this.gameOverLevel);
    this.scene.stop()
  }

  goToMenu() {
    this.scene.launch("mainMenu");
    this.scene.stop()
    this.scene.stop(this.gameOverLevel)
    EventHub.emit("backToMenu")
  }
}