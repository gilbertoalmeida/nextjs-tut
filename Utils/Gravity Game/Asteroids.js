import Phaser from "phaser"
import EventHub from './EventHub'

export class Asteroids extends Phaser.Physics.Matter.Sprite {
  constructor(world, x, y) {
    super(world, x, y, "asteroids", 0, {
      density: 1,
      isSensor: true
    })

    this.play("asteroids_anim")

    this.setOnCollide(this.implosion.bind(this))

    world.scene.add.existing(this)
  }

  implosion(pair) {
    if (pair.bodyA.label != "planet") return

    let planet = pair.bodyA.gameObject

    EventHub.emit("gameOver", {
      gameOverConfig: {
        reason: "Asteroid collision",
        message: "You collided with the\nasteroid belt",
        level: this.scene.scene.key
      }
    })

    planet.setTint(0xFF0000)
    planet.setStatic(true)
  }
}