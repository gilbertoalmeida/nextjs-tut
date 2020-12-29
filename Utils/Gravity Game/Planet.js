import Phaser from "phaser"

export class Planet extends Phaser.Physics.Matter.Sprite {
  constructor(world, x, y, frame) {
    super(world, x, y, "planet", frame, {
      density: 1,
      friction: 0,
      frictionStatic: 0,
      frictionAir: 0,
      restitution: 1,
      chamfer: 1
    })

    world.scene.matter.body.setInertia(this.body, Infinity)

    world.scene.add.existing(this)

  }
}

