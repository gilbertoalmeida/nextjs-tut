import React, { useState, useEffect } from "react"

const ScoreValue = ({ scene }) => {
  const [score, setscore] = useState(0)

  useEffect(() => {
    scene.events.addListener('REACT_EVENT', (event) => {
      console.log(event)
      if (event.action === 'STAR_COLLECTED') setscore(prev => prev + 10)
    })
  }, [])

  return <div>Score from react: {score}</div>
}

export default ScoreValue