import Phaser from "phaser"

export class Text extends Phaser.GameObjects.BitmapText {
  constructor(scene, x, y, text, size) {
    super(scene, x, y, "pixelFont", text, size)

    this.setOrigin(0.5, 0.5)

    scene.add.existing(this)
  }

  fadeIn(duration) {
    this.scene.tweens.add({
      targets: this,
      alpha: 1,
      ease: "Power0",
      duration,
      repeat: 0,
      callbackScope: this
    })
  }

  fadeOut(duration) {
    this.scene.tweens.add({
      targets: this,
      alpha: 0,
      ease: "Power0",
      duration,
      repeat: 0,
      callbackScope: this
    })
  }
}

