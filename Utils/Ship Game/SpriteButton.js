import Phaser from "phaser"

export default class SpriteButton extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, key, upFrame, downFrame) {
    //future I should add a hoverFrame to my spriter too :)

    if (!scene) {
      console.log('missing scene');
      return;
    }
    if (!key) {
      console.log("missing key!");
      return;
    }
    if (!x) {
      x = 0
    }
    if (!y) {
      y = 0
    }

    super(scene, x, y, key, upFrame) //after calling superm the "this" of this SpriteButton can be called

    this.x = x
    this.y = y
    this.upFrame = upFrame ? upFrame : 0
    this.downFrame = downFrame ? downFrame : upFrame

    scene.add.existing(this)

    this.setOrigin(0, 0)
    this.setOrigin(0, 0)

    //make interactive and set listeners
    this.setInteractive();

    // // I am commenting this out here, bc I am prefering to handle the frames in another way, directly in the scene.
    // // The way it's here, the upDown frame happens only when you click, and for this project I want it to stay as a sign of this button being selected
    // this.on('pointerdown', this.onDown, this);
    // this.on('pointerup', this.onUp, this);
    // // this.on('pointerover', this.onHover, this);
    // this.on('pointerout', this.onUp, this);
  }

  // onDown() {
  //   this.setFrame(this.downFrame);
  // }

  // onUp() {
  //   this.setFrame(this.upFrame);
  // }
}