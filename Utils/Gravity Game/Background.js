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
  }

  create() {
    this.background = this.add.tileSprite(0, 0, this.config.width, this.config.height, "spacebg")
    this.background.setOrigin(0, 0)

    this.playingTimeText = new Text(this, this.config.width - 120, this.config.height - 40, "", 20)
    this.playingTimeText.setOrigin(0, 0)

    EventHub.on('playingStart', this.playingStarted, this)

    // using the events of the scene itself to clean my listener when the scene shuts down
    this.events.on(Phaser.Scenes.Events.SHUTDOWN, () => {
      EventHub.off('playingStart', this.playingStarted, this)
    })
  }

  update() {
    this.background.tilePositionY -= 0.005
    this.background.tilePositionX -= 0.005

    this.calculatePlayingTime();
  }

  playingStarted() {
    this.playStartTime = this.game.loop.time
  }

  calculatePlayingTime() {
    this.playingTime = this.playStartTime > 0 ? this.game.loop.time - this.playStartTime : 0

    this.playingTimeText.text = msToTime(this.playingTime)
  }
}