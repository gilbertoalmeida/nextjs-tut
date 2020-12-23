import Layout from "../components/Layout"
import React, { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Game() {

  const [gameLoading, setgameLoading] = useState(true)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('phaser').then(async Phaser => {
        const { BootScene } = await import("../Utils/Ship Game/BootScene")
        const { GameScene } = await import("../Utils/Ship Game/GameScene")

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

        let config = {
          type: canvas.getContext('webgl') ? Phaser.WEBGL : Phaser.CANVAS,
          width: 512,
          height: 544,
          canvas: canvas,
          context: myCustomContext,
          pixelArt: true,
          physics: {
            default: "arcade",
            arcade: {
              debug: false
            }
          },
          scene: [BootScene, GameScene]
        }

        var game = new Phaser.Game(config);
        setgameLoading(false)
      })
    }

  }, [])

  return (
    <Layout>
      <div>Tutorial Game from{" "}
        <Link href={"https://www.youtube.com/watch?v=gFXx7lgxK9A&list=PLDyH9Tk5ZdFzEu_izyqgPFtHJJXkc79no&index=2"}>
          <a>Luis Zuno</a>
        </Link>
      </div>
      {gameLoading ? <div>loading...</div> : null}
      <canvas id="canvas" style={{ margin: "20px auto", display: "block" }}></canvas>
    </Layout>
  )
}