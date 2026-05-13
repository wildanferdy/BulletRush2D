import { useState } from "react"
import GameBoard from "../game/GameBoard/GameBoard"
import ScorePanel from "../game/ScorePanel"
import useTimer from "../../hooks/userTimer"
import Modal from "../ui/Modal"

const GameScreen = () => {
  const [score, setScore] = useState(0)
  const { timeLeft } = useTimer()

  return (
    <div className="min-h-screen flex items-center justify-center">
      <GameBoard onScore={setScore} />
      <ScorePanel score={score} timeLeft={timeLeft} />
      <Modal isOpen={timeLeft === 0} onClose={() => { }}>
        <p>Game Over</p>
        <p>Skor: {score}</p>
      </Modal>
    </div>
  )
}

export default GameScreen