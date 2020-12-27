import React, { useState, useEffect } from 'react'
import resizeGame from "../Utils/resizeGame"


export default function Game() {

  const [gameLoading, setgameLoading] = useState(true)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('phaser').then(async Phaser => {

        let config = {
          type: Phaser.AUTO,
          parent: "phaser-app",
          width: 360,
          height: 640,
          scene: {
            preload, create
          }
        }

        function preload() {
          this.load.image("background", "360-640-scale.png")
        }

        function create() {
          this.background = this.add.tileSprite(0, 0, 360, 640, "background")
          this.background.setOrigin(0, 0)

          this.add.text(360 / 2, 640 / 2, "|", { font: "25px Arial", fill: "yellow" })
        }

        var game = new Phaser.Game(config);
        setgameLoading(false)

        resizeGame(game.config.width, game.config.height)
        window.addEventListener("resize", () => resizeGame(game.config.width, game.config.height))
      })
    }

  }, [])

  return (
    <div id="page">
      {gameLoading ? <div>loading...</div> : null}
      <div id="phaser-app"></div>

      <style jsx>
        {`
          #page {
            margin: 0;
            overflow: hidden;
            background-color: grey;
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