import Phaser from "phaser"
import { Star } from "../Star"
import { Planet } from "../Planet"
import { Portal } from "../Portal"
import { Touch } from "../Touch"
import { Sensor } from "../Sensor"
import { Text } from "../Text"

export class Level1 extends Phaser.Scene {
  constructor() {
    super({ key: "level1" })
  }

  init() {
    this.config = this.game.config

    this.scenePlugin = new Phaser.Scenes.ScenePlugin(this)

    this.allowGravity = true
    this.turnCount = 0
  }

  create() {
    this.background = this.add.tileSprite(0, 0, this.config.width, this.config.height, "spacebg")
    this.background.setOrigin(0, 0)

    this.stars = new Phaser.GameObjects.Group(this)

    this.sun = new Star(this.matter.world, this.config.width / 2, 520, 0)

    this.stars.add(this.sun)

    this.sun.gravityMag = -0.04

    this.portal = new Portal(this.matter.world, 100, 50)

    this.planet = new Planet(this.matter.world, this.config.width / 2, 420, 0);

    this.planet.setVelocity(2, 0);

    this.sensor = new Sensor(this.matter.world, 90, 494)

    this.throwIntroText()
  }

  pauseScene() {
    this.turnCount++

    if (this.turnCount === 3) {
      this.scenePlugin.pause()
      this.scene.launch('level1tutorial', {
        mainScene: this
      });
    }
  }

  throwIntroText() {
    this.time.addEvent({
      delay: 1000,
      callback: function () {
        this.introText = new Text(this, this.config.width / 2, this.config.height / 2, "Great things don't happen\nin your comfort orbit", 24)
        this.introText.setCenterAlign()
        this.introText.alpha = 0
        this.introText.fadeIn(3000)
      },
      callbackScope: this,
      loop: false
    })

    this.time.addEvent({
      delay: 5000,
      callback: function () {
        this.introText.fadeOut(2000)
      },
      callbackScope: this,
      loop: false
    })

    this.time.addEvent({
      delay: 7000,
      callback: function () {
        this.introText.destroy()
        this.introText2 = new Text(this, this.config.width / 2, this.config.height / 2, "What if you could get rid of\nthis force that holds you?", 24)
        this.introText2.setCenterAlign()
        this.introText2.alpha = 0
        this.introText2.fadeIn(3000)
      },
      callbackScope: this,
      loop: false
    })
  }

  throwOffYouGoText() {
    this.time.addEvent({
      delay: 1000,
      callback: function () {
        this.offText = new Text(this, this.config.width / 2, this.config.height / 2, "And off you go", 24)
        this.offText.setCenterAlign()
        this.offText.alpha = 0
        this.offText.fadeIn(3000)
      },
      callbackScope: this,
      loop: false
    })
  }

  reachedPortal(pair) {
    this.planet.setVelocity(0, 0);

    this.tweens.add({
      targets: this.planet,
      y: this.portal.y - 5,
      x: this.portal.x,
      scale: 0.1,
      alpha: 0.7,
      ease: "Power0",
      duration: 1500,
      repeat: 0,
      onComplete: function () {
        this.planet.alpha = 0
        this.scene.launch("level2")
      },
      callbackScope: this
    })
  }


  update() {
    this.background.tilePositionY -= 0.005
    this.background.tilePositionX -= 0.005

    if (this.allowGravity) {
      let starsArray = this.stars.getChildren()
      let allGravityForces = new Phaser.Math.Vector2(0, 0)

      starsArray.forEach(star => {
        let gravityForce = new Phaser.Math.Vector2(this.planet.body.position.x - star.body.position.x, this.planet.body.position.y - star.body.position.y).normalize().setLength(star.gravityMag)
        allGravityForces.add(gravityForce)
      })

      this.planet.applyForce(allGravityForces)
    }
  }
}


export class Level1Tutorial extends Phaser.Scene {
  constructor() {
    super({ key: "level1tutorial" })
  }

  init(data) {
    this.mainScene = data.mainScene
    this.mainScenePlugin = new Phaser.Scenes.ScenePlugin(data.mainScene)
  }

  create() {
    let interactiveZoneWidth = this.mainScene.sun.width
    let interactiveZoneHeight = interactiveZoneWidth
    let interactiveZoneX = this.mainScene.sun.x
    let interactiveZoneY = this.mainScene.sun.y

    this.clickText = new Text(this, interactiveZoneX + 100, interactiveZoneY, "Touch the\nstar", 24)
    this.clickText.setCenterAlign()

    this.touchIcon = new Touch(this.matter.world, this.mainScene.sun.x + 35, this.mainScene.sun.y, - Math.PI / 2)

    this.interactiveZone = this.add.zone(interactiveZoneX, interactiveZoneY, interactiveZoneWidth, interactiveZoneHeight)
    this.interactiveZone.setOrigin(0.5, 0.5)

    this.interactiveZone.setInteractive()
    this.interactiveZone.on("pointerdown", () => {
      this.clickText.destroy()
      this.touchIcon.destroy()
      this.mainScene.introText2.destroy()
      this.mainScenePlugin.resume()
      this.mainScene.allowGravity = false
      this.mainScene.sun.setFrame(1)
      this.mainScene.throwOffYouGoText()
    }, this)
  }
}