import Layout from "../components/Layout"
import React, { useState, useEffect } from 'react'
import { preload, create, update } from "../Utils/gameFunctions"


export default function Game() {

  const [game, setgame] = useState(<div>loading...</div>)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('phaser').then(Phaser => {
        let gameState = {
          initialize: true,
          game: {
            width: 800,
            height: 600,
            type: Phaser.AUTO,
            physics: {
              default: 'arcade',
              arcade: {
                gravity: { y: 300 },
                debug: false
              }
            },
            scene: {
              preload,
              create,
              update
            },
          }
        }

        import('@ion-phaser/react').then(module => {
          setgame(<module.IonPhaser game={gameState.game} initialize={gameState.initialize} />)
        })
      })
    }

  }, [])

  return (
    <Layout>
      <div>Tutorial Game from https://phaser.io/</div>
      <div id="canvas"></div>
      {game}
    </Layout>
  )
}