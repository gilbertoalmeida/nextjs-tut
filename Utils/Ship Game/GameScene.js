import Phaser from "phaser"

export class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: "playGame" })
    // this.velocity3 = 3
    this.config
  }

  preload() {
    this.config = this.game.config
  }


  create() {

    this.background = this.add.tileSprite(0, 0, this.config.width, this.config.height, "background")
    this.background.setOrigin(0, 0)
    this.background.setScale(2)


    // this.ship1 = this.add.image(this.config.width / 2 - 50, this.config.height / 2, "ship1")
    // this.ship2 = this.add.image(this.config.width / 2, this.config.height / 2, "ship2")
    // this.ship3 = this.add.image(this.config.width / 2 + 50, this.config.height / 2, "ship3")

    // this.ship1.setScale(1.5)
    // this.ship3.setScale(0.5)
    // this.ship2.flipY = true
    // this.ship1.angle += 30

    this.ship1 = this.add.sprite(this.config.width / 2 - 50, this.config.height / 2, "ship1")
    this.ship2 = this.add.sprite(this.config.width / 2, this.config.height / 2, "ship2")
    this.ship3 = this.add.sprite(this.config.width / 2 + 50, this.config.height / 2, "ship3")

    this.ship1.setScale(2)
    this.ship2.setScale(2)
    this.ship3.setScale(2)
    // this.bounce = this.add.sprite(this.config.width / 2, this.config.height * 0.75, "bounce")

    this.ship1.flipY = true
    this.ship2.flipY = true
    this.ship3.flipY = true

    this.anims.create({
      key: "ship1_anim",
      frames: this.anims.generateFrameNumbers("ship1"), //this already gets the frame numbers from a spritesheet. It returns this Array [{key: "ship1", frame: 0}, {key: "ship1", frame: 1}]
      frameRate: 20,
      repeat: -1 //its how many times. And -1 is infinite
    })

    this.anims.create({
      key: "ship2_anim",
      frames: this.anims.generateFrameNumbers("ship2"),
      frameRate: 20,
      repeat: -1
    })

    this.anims.create({
      key: "ship3_anim",
      frames: this.anims.generateFrameNumbers("ship3"),
      frameRate: 20,
      repeat: -1
    })

    this.anims.create({
      key: "red_anim",
      frames: this.anims.generateFrameNumbers("power-up", {
        start: 0,
        end: 1
      }),
      frameRate: 20,
      repeat: -1
    })

    this.anims.create({
      key: "grey_anim",
      frames: this.anims.generateFrameNumbers("power-up", {
        start: 2,
        end: 3
      }),
      frameRate: 20,
      repeat: -1
    })

    this.powerUps = this.physics.add.group()

    let maxPowerUps = 4

    for (let i = 0; i < maxPowerUps; i++) {
      let powerUp = this.physics.add.sprite(16, 16, "power-up")
      this.powerUps.add(powerUp) //adding them to the group
      powerUp.setScale(2)
      powerUp.setRandomPosition(0, 0, this.config.width, this.config.height)

      if (Math.random() > 0.5) {
        powerUp.play("red_anim")
      } else {
        powerUp.play("grey_anim")
      }

      powerUp.setVelocity(250, 150)
      powerUp.setCollideWorldBounds(true)
      powerUp.setBounce(1)
    }

    this.physics.add.collider(this.powerUps, this.powerUps)

    this.anims.create({
      key: "explosion_anim",
      frames: this.anims.generateFrameNumbers("explosion"),
      frameRate: 20,
      repeat: 0,
      hideOnComplete: true
    })

    // this.anims.create({
    //   key: "bounce_anim",
    //   frames: this.anims.generateFrameNumbers("bounce"),
    //   frameRate: 12,
    //   repeat: -1
    // })

    this.ship1.play("ship1_anim")
    this.ship2.play("ship2_anim")
    this.ship3.play("ship3_anim")

    // this.bounce.play("bounce_anim")

    //make the ships able to receive player input
    this.ship1.setInteractive()
    this.ship2.setInteractive()
    this.ship3.setInteractive()
    // this.bounce.setInteractive()

    //listen when an interactive object is clicked and fires the function with the this(scope of the callback)
    this.input.on("gameobjectdown", this.destroyShip, this)

    this.add.text(20, 20, "Playing game...", { font: "25px Arial", fill: "yellow" })
  }

  moveShip(ship, speed) {
    ship.y += speed

    if (ship.y < 0) {
      this.resetShipPos(ship)
    }
  }

  resetShipPos(ship) {
    ship.y = this.config.height
    let randomX = Phaser.Math.Between(0, this.config.width)
    ship.x = randomX
  }

  //the pointer here is the mouse pointer and the gameObject is the ship that was clicked
  destroyShip(pointer, gameObject) {
    gameObject.setTexture("explosion") //switch its texture to the explosion spritesheet
    gameObject.play("explosion_anim") //and play the animation for it
  }

  update() {

    this.moveShip(this.ship1, -1)
    this.moveShip(this.ship2, -2)
    this.moveShip(this.ship3, -3)

    this.background.tilePositionY -= 0.5

    // const { config } = this.game

    // this.ship3.angle += 3
    // this.ship3.y += this.velocity3

    // if (this.ship3.y > config.height || this.ship3.y < 0) this.velocity3 *= -1
  }
}