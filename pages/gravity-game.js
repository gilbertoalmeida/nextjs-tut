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

          this.stars = new Phaser.GameObjects.Group(this)

          this.sun = new Star(this.matter.world, this.config.width / 2, 120, 4)
          this.sun2 = new Star(this.matter.world, this.config.width / 2, 320, 4)
          this.sun3 = new Star(this.matter.world, this.config.width / 2, 520, 2)

          this.stars.add(this.sun)
          this.stars.add(this.sun2)
          this.stars.add(this.sun3)

          this.sun3.gravityMag = -0.04

          this.planet = new Planet(this.matter.world, this.config.width / 2, 420, 1);

          console.log(this.planet)

          this.planet.setVelocity(2, 0);

          this.cursors = this.input.keyboard.createCursorKeys();

          this.input.on("gameobjectdown", toggleGravity, this)
        }

        function toggleGravity(pointer, object) {
          let starsArray = this.stars.getChildren()

          if (object.frame.name === 2) {
            //disable gravity

            starsArray.forEach(star => {
              if (star === object) {
                star.gravityMag = 0
                star.setFrame(4)
              }
            })
          } else {
            //enable gravity

            starsArray.forEach(star => {
              if (star === object) {
                star.gravityMag = -0.04
                star.setFrame(2)
              } else {
                star.gravityMag = 0
                star.setFrame(4)
              }
            })
          }
        }

        function update() {
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