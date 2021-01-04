import Phaser from "phaser"
import { Text } from "./Text"

export class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: "preloadScene" })
  }

  init() {
    this.config = this.game.config
  }

  preload() {
    this.createLoadingBar()

    this.load.spritesheet("star", "Gravity Game/star.png", {
      frameWidth: 32,
      frameHeight: 32
    })

    this.load.spritesheet("planet", "Gravity Game/planet.png", {
      frameWidth: 32,
      frameHeight: 32
    })

    this.load.spritesheet("portal", "Gravity Game/portal.png", {
      frameWidth: 64,
      frameHeight: 24
    })

  }

  create() {

    this.anims.create({
      key: "portal_anim",
      frames: this.anims.generateFrameNumbers("portal"), //this already gets the frame numbers from a spritesheet. It returns this Array [{key: "ship1", frame: 0}, {key: "ship1", frame: 1}]. You can pass a config second argument like { keys: [0, 1, 0, 2] } if you want a specific order
      frameRate: 10,
      repeat: -1 //its how many times. And -1 is infinite
    })

    this.scene.start("level1")
  }

  createLoadingBar() {
    //The bootscene is importat to load the necessary things for this part, before the heavy loading starts. It's a pre-preload
    this.background = this.add.image(0, 0, "spacebg")
    this.background.setOrigin(0, 0)

    this.loadingText = new Text(this, this.config.width / 2, this.config.height / 1.6, "Loading assets - 0%", 32)

    //below are two ways of doing the loading bar. Their sizes are updated in the onProgress callback.
    this.loadingRect = this.add.rectangle(this.config.width / 4, this.config.height / 1.5, 0, 20, "0x000000")
    this.loadingRect.setOrigin(0, 0)

    this.loadingGraphics = this.add.graphics({
      x: this.config.width / 4,
      y: this.config.height / 1.4
    })

    //phaser emits a "progress" event everytime it loads something
    this.load.on("progress", this.onProgress, this)
  }

  onProgress(percent) {
    //the onProgress callback comes with a percent value 0-1
    let humanPercent = parseInt(percent * 100) + "%"

    this.loadingText.text = "Loading assets" + " - " + humanPercent
    this.loadingRect.setSize(this.config.width * percent / 2, 20)

    this.loadingGraphics.clear()
    this.loadingGraphics.fillStyle("0xFFFFFF", 1)
    this.loadingGraphics.fillRect(0, 0, this.config.width * percent / 2, 20)
  }
}