import Phaser from "phaser"
import EventHub from './EventHub'

export class Star extends Phaser.Physics.Matter.Sprite {
  constructor(world, x, y, frame) {
    super(world, x, y, "star", frame, {
      density: 1,
      isStatic: true,
      chamfer: {
        radius: 16
      }
    })

    this.scene = world.scene

    this.setOnCollide(this.implosion.bind(this))

    this.scene.add.existing(this)

    this.setInteractive()

    this.gravityMag = 0
  }

  implosion(pair) {
    EventHub.emit("gameOver", {
      gameOverConfig: {
        reason: "Star collision",
        message: "You collided with a star",
        level: this.scene.scene.key
      }
    })

    let planet = pair.bodyB.gameObject

    planet.setTint(0xFF0000)
    planet.setStatic(true)
  }
}

