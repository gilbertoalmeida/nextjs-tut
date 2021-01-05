import Phaser from "phaser"

export class Portal extends Phaser.Physics.Matter.Sprite {
  constructor(world, x, y) {
    super(world, x, y, "portal", 0, {
      density: 1,
      isSensor: true,
      onCollideCallback: world.scene.reachedPortal.bind(world.scene),
      // isStatic: true,
      chamfer: {
        radius: 32
      }
    })

    this.play("portal_anim")

    world.scene.add.existing(this)
  }
}