import Phaser from "phaser"
import { Text } from "./Text"
import EventHub from './EventHub'
import { msToTime } from "./helperFunctions"

export class Background extends Phaser.Scene {
  constructor() {
    super({ key: "background" })
  }

  init() {
    this.config = this.game.config
    this.playStartTime = 0
    this.playingTime = 0

    this.playing = false
    this.numberOfDeaths = 0
  }

  create() {
    this.background = this.add.tileSprite(0, 0, this.config.width, this.config.height, "spacebg")
    this.background.setOrigin(0, 0)

    this.playingTimeText = new Text(this, this.config.width - 120, this.config.height - 40, "", 20)
    this.playingTimeText.setOrigin(0, 0)

    this.numberOfDeathsText = new Text(this, 20, this.config.height - 40, "0", 20)
    this.numberOfDeathsText.setOrigin(0, 0)

    EventHub.on('playingStart', this.playingStarted, this)
    EventHub.on('gameOver', this.gameOver, this)
    EventHub.on('backToMenu', this.backToMenu, this)
    EventHub.on('gameFinished', this.gameFinished, this)

    // using the events of the scene itself to clean my listener when the scene shuts down
    this.events.on(Phaser.Scenes.Events.SHUTDOWN, () => {
      EventHub.off('playingStart', this.playingStarted, this)
      EventHub.off('gameOver', this.gameOver, this)
      EventHub.off('backToMenu', this.backToMenu, this)
      EventHub.off('gameFinished', this.gameFinished, this)
    })
  }

  update() {
    this.background.tilePositionY -= 0.005
    this.background.tilePositionX -= 0.005

    this.calculatePlayingTime();
  }

  playingStarted() {
    this.playing = true
    this.playStartTime = this.game.loop.time
    this.numberOfDeaths = 0
    this.numberOfDeathsText.text = this.numberOfDeaths
  }

  backToMenu() {
    this.playing = false
  }

  gameOver(data) {
    this.scene.launch('gameOver', data);
    this.numberOfDeaths++
    this.numberOfDeathsText.text = this.numberOfDeaths
  }

  gameFinished(data) {
    this.playing = false
    data.gameOverConfig.numberOfDeaths = this.numberOfDeaths
    data.gameOverConfig.timeOfRun = msToTime(this.playingTime)
    this.scene.launch('gameOver', data);
  }

  calculatePlayingTime() {
    if (this.playing) {
      this.playingTime = this.game.loop.time - this.playStartTime
    }

    this.playingTimeText.text = msToTime(this.playingTime)
  }
}