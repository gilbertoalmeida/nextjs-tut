import Phaser from "phaser"
import { Star } from "../Star"
import { Planet } from "../Planet"
import { Portal } from "../Portal"
import { Asteroids } from "../Asteroids"
import EventHub from '../EventHub'

export class Level4 extends Phaser.Scene {
  constructor() {
    super({ key: "level4" })
  }

  init() {
    this.config = this.game.config
  }

  create() {
    this.stars = new Phaser.GameObjects.Group(this)

    this.sun = new Star(this.matter.world, this.config.width / 4, this.config.height / 4 - 10, 1)
    this.sun2 = new Star(this.matter.world, this.config.width * 3 / 4, (this.config.height / 2) - 50, 1)
    this.sun3 = new Star(this.matter.world, this.config.width / 4, this.config.height - 200, 1)

    this.stars.add(this.sun)
    this.stars.add(this.sun2)
    this.stars.add(this.sun3)

    //this.sun.gravityMag = -0.04

    this.portal = new Portal(this.matter.world, this.config.width - 50, this.config.height - 100)
    this.portal.setRotation(Math.PI / 2)

    this.planet = new Planet(this.matter.world, this.config.width / 8, 75, 0);

    this.planet.setVelocity(0, 2);

    this.cursors = this.input.keyboard.createCursorKeys();

    this.input.on("gameobjectdown", this.toggleGravity, this)

    //creating variable to listen to keyboard events and process them
    this.cursorKeys = this.input.keyboard.createCursorKeys()
    this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)

    for (let i = 0; i < 6; i++) {
      let asteroid = new Asteroids(this.matter.world, this.config.width / 4, (24 * i))
      asteroid.setRotation(- Math.PI / 2)
    }

    for (let i = 0; i < 11; i++) {
      let asteroid = new Asteroids(this.matter.world, (24 * i), (this.config.height / 2) - 50)
      //asteroid.setRotation(- Math.PI / 2)
    }

    for (let i = 0; i < 11; i++) {
      let asteroid = new Asteroids(this.matter.world, this.config.width - (24 * i), this.config.height - 200)
      asteroid.setRotation(Math.PI)
    }
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
        this.planet.setStatic(true)
        EventHub.emit("gameFinished", {
          gameOverConfig: {
            reason: "Finished",
            message: "Now do it faster",
            level: this.scene.key
          }
        })
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

    if (Phaser.Input.Keyboard.JustDown(this.spacebar)) {
      console.log(this.children.list)
    }

    this.planet.update()
  }

}

