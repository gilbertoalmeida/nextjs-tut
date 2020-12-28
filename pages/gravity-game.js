import React, { useState, useEffect } from 'react'
import resizeGame from "../Utils/resizeGame"

export default function Game() {

  const [gameLoading, setgameLoading] = useState(true)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('phaser').then(async Phaser => {

        let config = {
          type: Phaser.AUTO,
          width: 360,
          height: 640,
          parent: "phaser-app",
          pixelArt: true,
          physics: {
            default: "matter",
            matter: {
              debug: true,
              gravity: false,
              setBounds: true
            }
          },
          scene: {
            init,
            preload,
            create,
            update
          }
        }

        var game = new Phaser.Game(config);
        setgameLoading(false)

        resizeGame(game.config.width, game.config.height)
        window.addEventListener("resize", () => resizeGame(game.config.width, game.config.height))

        function init() {
          this.config = this.game.config
        }

        function preload() {
          this.load.spritesheet("sun", "Ship Game/spritesheets/explosion.png", {
            frameWidth: 16,
            frameHeight: 16
          })

          this.load.spritesheet("planet", "Ship Game/spritesheets/power-up.png", {
            frameWidth: 16,
            frameHeight: 16
          })
        }

        function create() {


          // this.sun = this.physics.add.sprite(this.config.width / 2, this.config.height / 4, 'sun');
          this.sun = this.matter.add.sprite(this.config.width / 2, this.config.height / 4, 'sun');
          this.sun.setFrame(4)
          // this.sun.setCircle(6);
          this.sun.setScale(2)
          this.sun.setBody("circle", {
            density: 1,
            isStatic: true,
            circleRadius: 13
          })
          this.sun.setInteractive()

          this.sunMag = 0


          this.sun2 = this.matter.add.sprite(this.config.width / 2, this.config.height / 4 + 200, 'sun');
          this.sun2.setFrame(2)
          // this.sun2.setCircle(8);
          this.sun2.setScale(2)
          this.sun2.setBody("circle", {
            density: 1,
            isStatic: true,
            circleRadius: 13
          })
          this.sun2.setInteractive()

          this.sunMag2 = -0.04



          this.planet = this.matter.add.sprite(this.config.width / 2, this.config.height / 4 + 100, 'planet');
          // this.planet.setCircle(8);
          // this.planet.setFriction(0, 0, 0) //air friction and friction on the walls
          // this.planet.setBounce(1)
          this.planet.setBody("circle", {
            density: 1,
            friction: 0,
            frictionStatic: 0,
            frictionAir: 0,
            restitution: 1
          })

          const planetBody = this.planet.body
          this.matter.body.setInertia(planetBody, Infinity)



          // this.planet.setCollideWorldBounds(true);

          // this.planet.body.velocity.x = 100;
          this.planet.setVelocity(2, 0);

          // this.physics.add.collider(this.sun, this.planet);

          this.cursors = this.input.keyboard.createCursorKeys();

          // this.accText = this.add.text(20, 20, "acceleration: 0")
          // this.velText = this.add.text(20, 60, "velocity: 0")
          // this.distText = this.add.text(20, 60, "distance: 0")

          this.input.on("gameobjectdown", toggleGravity, this)
        }

        function toggleGravity(pointer, object) {
          if (object.frame.name === 2) {
            //disable gravity

            if (object === this.sun) {
              this.sunMag = 0
              this.sun.setFrame(4)
              // this.sunMag2 = -0.04
              // this.sun2.setFrame(2)
            } else {
              this.sunMag2 = 0
              this.sun2.setFrame(4)
              // this.sunMag = -0.04
              // this.sun.setFrame(2)
            }
          } else {
            //enable gravity
            object.setFrame(2)

            if (object === this.sun) {
              this.sunMag = -0.04
              this.sun.setFrame(2)
              this.sunMag2 = 0
              this.sun2.setFrame(4)
            } else {
              this.sunMag2 = -0.04
              this.sun2.setFrame(2)
              this.sunMag = 0
              this.sun.setFrame(4)
            }
          }
          // this.objectToAttract?.setFrame(4)
          // this.objectToAttract = object
          // object.setFrame(2)
        }

        function update() {


          const force = new Phaser.Math.Vector2(this.planet.body.position.x - this.sun.body.position.x, this.planet.body.position.y - this.sun.body.position.y).normalize().setLength(this.sunMag)
          const force2 = new Phaser.Math.Vector2(this.planet.body.position.x - this.sun2.body.position.x, this.planet.body.position.y - this.sun2.body.position.y).normalize().setLength(this.sunMag2)
          const resforce = force.add(force2)
          this.planet.applyForce(resforce)

          // if (this.objectToAttract) {
          //   //this.physics.accelerateTo(this.planet, 200, 150)
          //   this.physics.accelerateToObject(this.planet, this.objectToAttract, 10000 / (this.config.height / 4));
          // }

          // if (this.cursors.up.isDown) {
          //   //this.physics.accelerateTo(this.planet, 200, 150)
          //   // this.physics.accelerateToObject(this.planet, this.sun, -60, 300, 300);
          //   this.physics.accelerateToObject(this.planet, this.sun2, 10000 / 60);

          // }

          if (this.cursors.down.isDown) {
            console.log(this.planet.body)
          }


          // this.distText.text = "distance: " + Phaser.Math.Distance.Between(this.sun.x, this.sun.y, this.planet.x, this.planet.y)

          // // Calculate gravity as the normalised vector from the ship to the planet
          // this.planet.body.gravity = new Phaser.Math.Vector2(this.sun.body.x - this.planet.body.x, this.sun.body.y - this.planet.body.y);
          // // Normalize and multiply by actual strength of gravity desired
          //  this.planet.body.gravity = this.planet.body.gravity.normalize().multiply(300, 300);

        }
      })
    }

  }, [])

  return (
    <div>

      <div id="page">
        {gameLoading ? (
          <div id="loading">
            <div >loading...</div>
          </div>
        ) : null}
        <div id="phaser-app"></div>
      </div>

      <style jsx>
        {`
        #loading {
          width: 100vw;
        }

          #page, #loading {
            overflow: hidden;
            background-color: grey;
            color: white;
            height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }

          #phaser-app {
            margin: 0 auto;
          }

          #phaser-app canvas {
            width: 100%;
            height: 100%;  
            }
        `}
      </style>
    </div>
  )
}