import Phaser from "phaser"
import { Star } from "../Star"
import { Planet } from "../Planet"
import { Portal } from "../Portal"
import { Asteroids } from "../Asteroids"

export class Level3 extends Phaser.Scene {
  constructor() {
    super({ key: "level3" })
  }

  init() {
    this.config = this.game.config
  }

  create() {
    this.stars = new Phaser.GameObjects.Group(this)

    this.sun = new Star(this.matter.world, this.config.width * 3 / 4, this.config.height * 3 / 4, 0)
    this.sun2 = new Star(this.matter.world, this.config.width / 2 - 12, this.config.height / 5, 1)

    this.stars.add(this.sun)
    this.stars.add(this.sun2)

    this.sun.gravityMag = -0.03

    this.portal = new Portal(this.matter.world, this.config.width / 4 - 12, this.config.height * 3 / 4)
    this.portal.setRotation(Math.PI)

    this.planet = new Planet(this.matter.world, this.config.width * 3 / 4, this.config.height * 3 / 4 + 75, 0);

    this.planet.setVelocity(1.5, 0);

    this.input.on("gameobjectdown", this.toggleGravity, this)

    for (let i = 0; i < 20; i++) {
      let asteroid = new Asteroids(this.matter.world, (this.config.width / 2) - 12, this.config.height - (24 * i))
      asteroid.setRotation(- Math.PI / 2)

    }
  }

  reachedPortal(pair) {
    this.planet.setVelocity(0, 0);

    let tween = this.tweens.add({
      targets: this.planet,
      y: this.portal.y + 5,
      x: this.portal.x,
      scale: 0.1,
      alpha: 0.7,
      ease: "Power1",
      duration: 3000,
      repeat: 0,
      onComplete: function () {
        this.planet.alpha = 0
        this.scene.launch("level4")
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

