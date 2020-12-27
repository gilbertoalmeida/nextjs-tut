import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import resizeGame from "../Utils/resizeGame"

export default function Game() {

  const [gameLoading, setgameLoading] = useState(true)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('phaser').then(async Phaser => {
        const { BootScene } = await import("../Utils/Ship Game/BootScene")
        const { GameScene } = await import("../Utils/Ship Game/GameScene")
        const { PreloadScene } = await import("../Utils/Ship Game/PreloadScene")

        /*  
        This is all not necessary anymore, since now I am just placing the game inside parent in the config file
 
 
        let canvas = document.getElementById("canvas")
 
         //  It's important to set the WebGL context values that Phaser needs:
         const contextCreationConfig = {
           alpha: false,
           depth: false,
           antialias: true,
           premultipliedAlpha: true,
           stencil: true,
           preserveDrawingBuffer: false,
           failIfMajorPerformanceCaveat: false,
           powerPreference: 'default'
         };
 
         const myCustomContext = canvas.getContext('webgl') ? canvas.getContext('webgl', contextCreationConfig) : undefined;
         */

        let config = {
          // type: canvas.getContext('webgl') ? Phaser.WEBGL : Phaser.CANVAS,
          type: Phaser.AUTO,
          width: 512,
          height: 544,
          parent: "phaser-app",
          // canvas: canvas,
          // context: myCustomContext,
          pixelArt: true,
          physics: {
            default: "arcade",
            arcade: {
              debug: false
            }
          },
          scene: [BootScene, PreloadScene, GameScene]
        }

        var game = new Phaser.Game(config);
        game.input.addPointer();
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
            <div>Tutorial Game from{" "}
              <Link href={"https://www.youtube.com/watch?v=gFXx7lgxK9A&list=PLDyH9Tk5ZdFzEu_izyqgPFtHJJXkc79no&index=2"}>
                <a>Luis Zuno</a>
              </Link>
            </div>
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