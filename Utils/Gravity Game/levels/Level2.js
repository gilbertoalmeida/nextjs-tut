import Phaser from "phaser"
import { Star } from "../Star"
import { Planet } from "../Planet"
import { Portal } from "../Portal"

export class Level2 extends Phaser.Scene {
  constructor() {
    super({ key: "level2" })
  }

  init() {
    this.config = this.game.config
  }

  create() {
    this.stars = new Phaser.GameObjects.Group(this)

    this.sun = new Star(this.matter.world, this.config.width / 2, 120, 1)
    this.sun2 = new Star(this.matter.world, this.config.width / 2, 320, 1)
    this.sun3 = new Star(this.matter.world, this.config.width / 2, 520, 0)

    this.stars.add(this.sun)
    this.stars.add(this.sun2)
    this.stars.add(this.sun3)

    this.sun3.gravityMag = -0.04

    this.portal = new Portal(this.matter.world, this.config.width - 30, 50)
    this.portal.setRotation(Math.PI / 2)

    this.planet = new Planet(this.matter.world, this.config.width / 2 - 100, 520, 0);

    this.planet.setVelocity(0, -2);

    this.input.on("gameobjectdown", this.toggleGravity, this)
  }

  reachedPortal(pair) {
    this.planet.setVelocity(0, 0);

    let tween = this.tweens.add({
      targets: this.planet,
      y: this.portal.y,
      x: this.portal.x + 5,
      scale: 0.1,
      alpha: 0.7,
      ease: "Power1",
      duration: 3000,
      repeat: 0,
      onComplete: function () {
        this.planet.alpha = 0
        this.scene.launch("level3")
        this.scene.stop()
      },
      callbackScope: this
    })
  }

  toggleGravity(pointer, object) {
    let starsArray = this.stars.getChildren()

    if (object.frame.name === 0) {
      //disable gravity

      starsArray.forEach(star => {
        if (star === object) {
          star.gravityMag = 0
          star.setFrame(1)
        }
      })
    } else {
      //enable gravity

      starsArray.forEach(star => {
        if (star === object) {
          star.gravityMag = -0.04
          star.setFrame(0)
        } else {
          star.gravityMag = 0
          star.setFrame(1)
        }
      })
    }
  }



  update() {
    let starsArray = this.stars.getChildren()
    let allGravityForces = new Phaser.Math.Vector2(0, 0)

    starsArray.forEach(star => {
      let gravityForce = new Phaser.Math.Vector2(this.planet.body.position.x - star.body.position.x, this.planet.body.position.y - star.body.position.y).normalize().setLength(star.gravityMag)
      allGravityForces.add(gravityForce)
    })

    this.planet.applyForce(allGravityForces)

    this.planet.update()

  }

}

