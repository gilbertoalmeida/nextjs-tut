import React, { useState, useEffect } from 'react'
import resizeGame from "../Utils/resizeGame"

export default function Game() {

  const [gameLoading, setgameLoading] = useState(true)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('phaser').then(async Phaser => {
        const { Star } = await import("../Utils/Gravity Game/Star")
        const { Planet } = await import("../Utils/Gravity Game/Planet")

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
          this.load.image("spacebg", "Gravity Game/spacebg.png")

          this.load.spritesheet("star", "Gravity Game/star.png", {
            frameWidth: 32,
            frameHeight: 32
          })

          this.load.spritesheet("planet", "Gravity Game/planet.png", {
            frameWidth: 32,
            frameHeight: 32
          })

          this.load.spritesheet("portal", "Gravity Game/portal.png", {
            frameWidth: 64,
            frameHeight: 24
          })
        }

        function create() {

          this.background = this.add.tileSprite(0, 0, this.config.width, this.config.height, "spacebg")
          this.background.setOrigin(0, 0)

          this.stars = new Phaser.GameObjects.Group(this)

          this.sun = new Star(this.matter.world, this.config.width / 2, 120, 1)
          this.sun2 = new Star(this.matter.world, this.config.width / 2, 320, 1)
          this.sun3 = new Star(this.matter.world, this.config.width / 2, 520, 0)

          this.stars.add(this.sun)
          this.stars.add(this.sun2)
          this.stars.add(this.sun3)

          this.sun3.gravityMag = -0.04

          this.planet = new Planet(this.matter.world, this.config.width / 2, 420, 0);

          this.planet.setVelocity(2, 0);

          this.portal = new Phaser.Physics.Matter.Sprite(this.matter.world, 100, 50, "portal", 0, {
            density: 1,
            isSensor: true,
            onCollideCallback: reachedPortal,
            // isStatic: true,
            chamfer: {
              radius: 32
            }
          })

          this.add.existing(this.portal)

          this.anims.create({
            key: "portal_anim",
            frames: this.anims.generateFrameNumbers("portal"), //this already gets the frame numbers from a spritesheet. It returns this Array [{key: "ship1", frame: 0}, {key: "ship1", frame: 1}]. You can pass a config second argument like { keys: [0, 1, 0, 2] } if you want a specific order
            frameRate: 10,
            repeat: -1 //its how many times. And -1 is infinite
          })

          this.portal.play("portal_anim")


          function reachedPortal(pair) {
            console.log("level completed")

            // const planet = pair.bodyA.gameObject
            // planet.setVelocity(0, 0);


            // let x = 100
            // let y = 50

            // let tween = this.tweens.add({
            //   targets: planet,
            //   y,
            //   x,
            //   ease: "Power1",
            //   duration: 5000,
            //   repeat: 0,
            //   onComplete: function () {
            //     console.log("acabou")
            //   },
            //   callbackScope: this
            // })
          }


          this.cursors = this.input.keyboard.createCursorKeys();

          this.input.on("gameobjectdown", toggleGravity, this)
        }

        function toggleGravity(pointer, object) {
          let starsArray = this.stars.getChildren()

          if (object.frame.name === 0) {
            //disable gravity

            starsArray.forEach(star => {
              if (star === object) {
                star.gravityMag = 0
                star.setFrame(1)
              }
            })
          } else {
            //enable gravity

            starsArray.forEach(star => {
              if (star === object) {
                star.gravityMag = -0.04
                star.setFrame(0)
              } else {
                star.gravityMag = 0
                star.setFrame(1)
              }
            })
          }
        }



        function update() {
          this.background.tilePositionY -= 0.005
          this.background.tilePositionX -= 0.005

          let starsArray = this.stars.getChildren()
          let allGravityForces = new Phaser.Math.Vector2(0, 0)

          starsArray.forEach(star => {
            let gravityForce = new Phaser.Math.Vector2(this.planet.body.position.x - star.body.position.x, this.planet.body.position.y - star.body.position.y).normalize().setLength(star.gravityMag)
            allGravityForces.add(gravityForce)
          })

          this.planet.applyForce(allGravityForces)
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
            background-color: black;
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