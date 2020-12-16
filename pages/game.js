import Layout from "../components/Layout"
import React, { useState, useEffect } from 'react'


export default function Game() {

  const [game, setgame] = useState(<div>loading...</div>)


  useEffect(() => {
    if (typeof window !== 'undefined') {
      console.log("window present")

      import('phaser').then(Phaser => {
        console.log("phaser imported")
        let gameState = {
          initialize: true,
          game: {
            width: "100%",
            height: "100%",
            type: Phaser.AUTO,
            scene: {
              preload: function () {
                this.load.image('star', '/star.png');
              },
              create: function () {
                this.add.image(400, 300, 'star');
              }
            }
          }
        }
        console.log(gameState)

        import('@ion-phaser/react').then(module => {
          setgame(<module.IonPhaser game={gameState.game} initialize={gameState.initialize} />)
          console.log("pronto")
          //canvasEl.appendChild(ionCanvasEl)
        })
      })
    }

  }, [])

  return (
    <Layout>
      <div>Game will be here</div>
      <div id="canvas"></div>
      {game}

    </Layout>
  )
}