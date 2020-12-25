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

    this.load.spritesheet("power-up", "Ship Game/spritesheets/power-up.png", {
      frameWidth: 16,
      frameHeight: 16
    })

    this.load.spritesheet("player", "Ship Game/spritesheets/player.png", {
      frameWidth: 16,
      frameHeight: 24
    })

    this.load.spritesheet("beam", "Ship Game/spritesheets/beam.png", {
      frameWidth: 16,
      frameHeight: 16
    })

    this.load.spritesheet("shootButton", "Ship Game/spritesheets/shootButton.png", {
      frameWidth: 32,
      frameHeight: 32
    })

    this.load.bitmapFont("pixelFont", "Ship Game/font/font.png", "Ship Game/font/font.xml")

    this.load.audio("audio_beam", ["Ship Game/sounds/beam.ogg", "Ship Game/sounds/beam.mp3"])
    this.load.audio("audio_explosion", ["Ship Game/sounds/explosion.ogg", "Ship Game/sounds/explosion.mp3"])
    this.load.audio("audio_pickup", ["Ship Game/sounds/pickup.ogg", "Ship Game/sounds/pickup.mp3"])
    this.load.audio("bgmusic", ["Ship Game/sounds/sci-fi_platformer12.ogg", "Ship Game/sounds/sci-fi_platformer12.mp3"])

    this.load.plugin('rexvirtualjoystickplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexvirtualjoystickplugin.min.js', true);

    // this.load.spritesheet("bounce", "Ship Game/spritesheets/first-spritesheet-x2.png", {
    //   frameWidth: 64,
    //   frameHeight: 64
    // })


  }

  create() {
    this.background = this.add.image(0, 0, "background")
    this.background.setOrigin(0, 0)
    this.add.text(20, 20, "Loading game...", { font: "25px Arial", fill: "yellow" })


    this.anims.create({
      key: "ship1_anim",
      frames: this.anims.generateFrameNumbers("ship1"), //this already gets the frame numbers from a spritesheet. It returns this Array [{key: "ship1", frame: 0}, {key: "ship1", frame: 1}]
      frameRate: 20,
      repeat: -1 //its how many times. And -1 is infinite
    })

    this.anims.create({
      key: "ship2_anim",
      frames: this.anims.generateFrameNumbers("ship2"),
      frameRate: 20,
      repeat: -1
    })

    this.anims.create({
      key: "ship3_anim",
      frames: this.anims.generateFrameNumbers("ship3"),
      frameRate: 20,
      repeat: -1
    })

    this.anims.create({
      key: "red_anim",
      frames: this.anims.generateFrameNumbers("power-up", {
        start: 0,
        end: 1
      }),
      frameRate: 20,
      repeat: -1
    })

    this.anims.create({
      key: "grey_anim",
      frames: this.anims.generateFrameNumbers("power-up", {
        start: 2,
        end: 3
      }),
      frameRate: 20,
      repeat: -1
    })

    this.anims.create({
      key: "thrust_anim",
      frames: this.anims.generateFrameNumbers("player"),
      frameRate: 20,
      repeat: -1
    })

    this.anims.create({
      key: "beam_anim",
      frames: this.anims.generateFrameNumbers("beam"),
      frameRate: 20,
      repeat: -1
    })

    this.anims.create({
      key: "explosion_anim",
      frames: this.anims.generateFrameNumbers("explosion"),
      frameRate: 20,
      repeat: 0,
      hideOnComplete: true
    })

    // this.anims.create({
    //   key: "bounce_anim",
    //   frames: this.anims.generateFrameNumbers("bounce"),
    //   frameRate: 12,
    //   repeat: -1
    // })


    this.scene.start("playGame")
  }
}