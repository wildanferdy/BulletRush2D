import { useState } from "react"
import GameBoard from "../game/GameBoard/GameBoard"
import ScorePanel from "../game/ScorePanel"

const GameScreen = () => {
  const [score, setScore] = useState(0)

  return (
    <div className="min-h-screen flex items-center justify-center">
        <GameBoard onScore={setScore}/>
        <ScorePanel score={score} />
    </div>
  )
}

export default GameScreen
