import Phaser from "phaser"

export class Touch extends Phaser.Physics.Matter.Sprite {
  constructor(world, x, y, rotation) {
    super(world, x, y, "touchicon", 0)

    this.setRotation(rotation)

    world.scene.add.existing(this)
  }
}