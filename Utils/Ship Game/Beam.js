import Phaser from "phaser"

export default class Beam extends Phaser.GameObjects.Sprite {
  constructor(scene) {

    let x = scene.player.x
    let y = scene.player.y

    super(scene, x, y, "beam")
    //since we are inheriting from Sprite, we have to pass the same parameters to the father with super. 
    //Reference to the scene, texture of the beam and x,y position
    // these are the things we would need if creating the beam directly using phaser's Sprite Class 
    //let beam = this.physics.add.sprite(this.player.x, this.player.y, "beam")
    //So when we create a "new Beam(this)" passing the scene insice as this, the construction uses super to create a Sprite

    //now add the beam "Game Object" to the scene and to the projectile group
    scene.add.existing(this)
    scene.projectiles.add(this)

    this.play("beam_anim")

    //enablying the spritesheet to have physics
    scene.physics.world.enableBody(this)
    this.body.velocity.y = -300
  }

  //Objects updates are not run per default by Phaser for performance reasons. We need to call it for each object in the update of the Scene.
  update() {
    if (this.y < 48) {
      this.destroy()
    }
  }
}