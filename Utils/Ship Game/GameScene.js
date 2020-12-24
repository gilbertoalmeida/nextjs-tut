import Phaser from "phaser"
import gameSettings from "./gameSettings"
import Beam from "./Beam"
import Explosion from "./Explosion"

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

    this.ship1 = this.add.sprite(this.config.width / 2 - gameSettings.enemiesStartXOffset, gameSettings.enemiesStartYOffset, "ship1")
    this.ship2 = this.add.sprite(this.config.width / 2, gameSettings.enemiesStartYOffset, "ship2")
    this.ship3 = this.add.sprite(this.config.width / 2 + gameSettings.enemiesStartXOffset, gameSettings.enemiesStartYOffset, "ship3")

    this.ship1.setScale(2)
    this.ship2.setScale(2)
    this.ship3.setScale(2)
    // this.bounce = this.add.sprite(this.config.width / 2, this.config.height * 0.75, "bounce")

    this.enemies = this.physics.add.group()
    this.enemies.add(this.ship1)
    this.enemies.add(this.ship2)
    this.enemies.add(this.ship3)

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

    this.player = this.physics.add.sprite(this.config.width / 2 - 8, this.config.height - gameSettings.playerStartYOffset, "player")
    this.player.setScale(2)
    this.player.play("thrust_anim")
    this.player.setCollideWorldBounds(true)

    //creating variable to listen to keyboard events and process them
    this.cursorKeys = this.input.keyboard.createCursorKeys()

    this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)

    this.projectiles = this.add.group()

    this.physics.add.collider(this.powerUps, this.powerUps)
    this.physics.add.collider(this.projectiles, this.powerUps, function (projectile, powerUp) {
      projectile.destroy()
    })
    this.physics.add.overlap(this.player, this.powerUps, this.pickPowerUp, null, this)
    this.physics.add.overlap(this.player, this.enemies, this.hurtPlayer, null, this)
    this.physics.add.overlap(this.projectiles, this.enemies, this.hitEnemy, null, this)


    //black brackground of the score
    let graphics = this.add.graphics()
    graphics.fillStyle(0x000000, 1)
    graphics.beginPath()
    graphics.moveTo(0, 0)
    graphics.lineTo(this.config.width, 0)
    graphics.lineTo(this.config.width, 40)
    graphics.lineTo(0, 40)
    graphics.lineTo(0, 0)
    graphics.closePath()
    graphics.fillPath()

    this.score = 0
    this.scoreLabel = this.add.bitmapText(20, 10, "pixelFont", "SCORE " + this.zeroPad(this.score, 6), 32)

    // this.add.text(20, 20, "Playing game...", { font: "25px Arial", fill: "yellow" })
  }

  updateScore(pointsToCompute) {
    this.score += pointsToCompute
    if (this.score < 0) this.score = 0
    this.scoreLabel.text = "SCORE " + this.zeroPad(this.score, 6)
  }

  zeroPad(number, size) {
    let stringNumber = String(number)
    while (stringNumber.length < (size || 2)) {
      stringNumber = "0" + stringNumber
    }
    return stringNumber
  }

  pickPowerUp(player, powerUp) {
    powerUp.disableBody(true, true)
  }

  hurtPlayer(player, enemy) {

    //after reseting, the alpha increases from 0 to prevent an immediate double kill. I decided on 0.8 because after this it already looks like it's 1
    if (this.player.alpha < 0.8) {
      return
    }

    let explosion2 = new Explosion(this, enemy.x, enemy.y)
    let explosion1 = new Explosion(this, player.x, player.y)

    this.resetShipPos(enemy)


    this.updateScore(-50)

    player.disableBody(true, true)
    //disablling the player sets its active property to false. This is being used as a flag for the shooting of beams for example

    this.time.addEvent({
      delay: 1000,
      callback: this.resetPlayer(),
      callbackScope: this,
      loop: false
    })
  }

  resetPlayer() {
    let x = this.config.width / 2 - 8
    let y = this.config.height
    this.player.enableBody(true, x, y, true, true)

    this.player.alpha = 0

    //Is it ok to create a tween all the time here? this.children.list.length is not increased
    let tween = this.tweens.add({
      targets: this.player,
      y: this.config.height - gameSettings.playerStartYOffset,
      alpha: 1,
      ease: "Power1",
      duration: 1500,
      repeat: 0,
      onComplete: function () {
        this.player.alpha = 1
      },
      callbackScope: this
    })

    // console.log(this.children.list.length)
    // console.log(this.children.list)


  }

  hitEnemy(projectile, enemy) {

    let explosion = new Explosion(this, enemy.x, enemy.y)

    projectile.destroy()
    this.resetShipPos(enemy)
    this.updateScore(15)
  }

  moveShip(ship, speed) {
    ship.y += speed

    if (ship.y > this.config.height + 32) {
      this.resetShipPos(ship)
    }
  }

  resetShipPos(ship) {
    ship.y = gameSettings.enemiesStartYOffset
    let randomX = Phaser.Math.Between(0, this.config.width)
    ship.x = randomX
  }

  //the pointer here is the mouse pointer and the gameObject is the ship that was clicked
  destroyShip(pointer, gameObject) {
    gameObject.setTexture("explosion") //switch its texture to the explosion spritesheet
    gameObject.play("explosion_anim") //and play the animation for it
  }

  movePlayerManager() {

    //this.cursorKeys was created in create() to listen to keyboard input
    if (this.cursorKeys.left.isDown) {
      this.player.setVelocityX(-gameSettings.playerSpeed)
    } else if (this.cursorKeys.right.isDown) {
      this.player.setVelocityX(gameSettings.playerSpeed)
    } else {
      this.player.setVelocityX(0)
    }

    if (this.cursorKeys.up.isDown) {
      this.player.setVelocityY(-gameSettings.playerSpeed)
    } else if (this.cursorKeys.down.isDown) {
      this.player.setVelocityY(gameSettings.playerSpeed)
    } else {
      this.player.setVelocityY(0)
    }

  }

  shootBeam() {
    let beam = new Beam(this)
    beam.setScale(2)
  }

  update() {

    this.moveShip(this.ship1, 1.5)
    this.moveShip(this.ship2, 2)
    this.moveShip(this.ship3, 3)

    this.background.tilePositionY -= 0.5

    //calling a custom function that controls the player's ship
    this.movePlayerManager()

    //JustDown is for firing only once per down.
    if (Phaser.Input.Keyboard.JustDown(this.spacebar)) {
      if (this.player.active) {
        this.shootBeam()
      }
    }

    //calling the update function of each Beam
    for (let i = 0; i < this.projectiles.getChildren().length; i++) {
      let beam = this.projectiles.getChildren()[i]
      beam.update()
    }

    // const { config } = this.game

    // this.ship3.angle += 3
    // this.ship3.y += this.velocity3

    // if (this.ship3.y > config.height || this.ship3.y < 0) this.velocity3 *= -1
  }
}