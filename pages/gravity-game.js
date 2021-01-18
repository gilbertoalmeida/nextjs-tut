import React, { useState, useEffect } from 'react'
import resizeGame from "../Utils/resizeGame"

export default function Game() {

  const [gameLoading, setgameLoading] = useState(true)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('phaser').then(async Phaser => {
        const { BootScene } = await import("../Utils/Gravity Game/BootScene")

        let config = {
          type: Phaser.AUTO,
          width: 360,
          height: 640,
          parent: "phaser-app",
          pixelArt: true,
          physics: {
            default: "matter",
            matter: {
              debug: false,
              gravity: false,
              setBounds: false
            }
          },
          scene: [BootScene]
        }

        var game = new Phaser.Game(config);
        setgameLoading(false)

        resizeGame(game.config.width, game.config.height)
        window.addEventListener("resize", () => resizeGame(game.config.width, game.config.height))

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
          justify-content: center;
        }

          #page, #loading {
            overflow: hidden;
            background-color: black;
            color: white;
            height: 100vh;
            display: flex;
            flex-direction: column;
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