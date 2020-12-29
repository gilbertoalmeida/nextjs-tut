import Phaser from "phaser"

export class Star extends Phaser.Physics.Matter.Sprite {
  constructor(world, x, y, frame) {
    super(world, x, y, "sun", frame, {
      density: 1,
      isStatic: true,
      chamfer: 1
    })

    world.scene.add.existing(this)

    this.setScale(2)

    // this.setBody("circle", {
    //   density: 1,
    //   isStatic: true,
    //   circleRadius: 30
    // })
    this.setInteractive()

    this.gravityMag = 0
  }
}

