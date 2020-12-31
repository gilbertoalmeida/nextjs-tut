import Phaser from "phaser"

export class Star extends Phaser.Physics.Matter.Sprite {
  constructor(world, x, y, frame) {
    super(world, x, y, "star", frame, {
      density: 1,
      isStatic: true,
      chamfer: {
        radius: 16
      }
    })

    world.scene.add.existing(this)

    this.setInteractive()

    this.gravityMag = 0
  }
}

