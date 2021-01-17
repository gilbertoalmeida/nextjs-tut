import Phaser from "phaser"

export class Planet extends Phaser.Physics.Matter.Sprite {
  constructor(world, x, y, frame) {
    super(world, x, y, "planet", frame, {
      density: 1,
      friction: 0,
      frictionStatic: 0,
      frictionAir: 0,
      restitution: 1,
      chamfer: {
        radius: 16
      },
      scale: {
        x: 16,
        y: 16
      }
    })

    this.setScale(0.5)

    this.scene = world.scene

    this.scene.matter.body.setInertia(this.body, Infinity)

    this.scene.add.existing(this)

    this.sceneHeight = this.scene.config.height
    this.sceneWidth = this.scene.config.width

  }

  update() {
    if (this.x > this.sceneWidth + 100 || this.x < -100 || this.y > this.sceneHeight + 100 || this.y < -100) {
      this.scene.gameOver = {
        reason: "Drifted",
        message: "You drifted away"
      }

      this.setTint(0xFF0000)
      this.setStatic(true)
      this.setPosition(this.sceneWidth / 2, this.sceneHeight / 2)
    }
  }
}

