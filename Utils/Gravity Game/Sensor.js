import Phaser from "phaser"

export class Sensor extends Phaser.Physics.Matter.Sprite {
  constructor(world, x, y) {
    super(world, x, y, "sensorline", 0, {
      isSensor: true,
      onCollideCallback: world.scene.pauseScene.bind(world.scene)
    })

    //for seeing the sensor in debug
    // world.scene.add.existing(this)
  }
}