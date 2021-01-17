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

    this.scene = world.scene

    this.setOnCollide(this.implosion.bind(this))

    this.scene.add.existing(this)

    this.setInteractive()

    this.gravityMag = 0
  }

  implosion(pair) {
    let planet = pair.bodyB.gameObject
    this.scene.gameOver = true
    planet.setTint(0xFF0000)
    planet.setStatic(true)
  }
}

