import Phaser from "phaser"

export class Asteroids extends Phaser.Physics.Matter.Sprite {
  constructor(world, x, y) {
    super(world, x, y, "asteroids", 0, {
      density: 1,
      isSensor: true
    })

    this.play("asteroids_anim")

    world.scene.add.existing(this)
  }
}