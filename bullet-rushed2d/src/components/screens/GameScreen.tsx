import { useState } from "react";
import GameBoard from "../game/GameBoard/GameBoard";
import ScorePanel from "../game/ScorePanel";
import useTimer from "../../hooks/userTimer";
import Modal from "../ui/Modal";
import Button from "../ui/Button";
import { useGame } from "../../store/gameStore";

type MatchHistory = {
  id: number;
  playerName: string;
  score: number;
  playedAt: string;
};

const GameScreen = () => {
  const [score, setScore] = useState(0);
  const { timeLeft } = useTimer();
  const { setCurrentScreen, username } = useGame();

  const handleSave = () => {
    const history = JSON.parse(
      localStorage.getItem("shooter_history") || "[]",
    ) as MatchHistory[];
    const newMatch = {
      id: Date.now(),
      playerName: username,
      score: score,
      playedAt: new Date().toString(),
    };
    localStorage.setItem(
      "shooter_history",
      JSON.stringify([...history, newMatch]),
    );
    setCurrentScreen("history")
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <GameBoard onScore={setScore} />
      <ScorePanel score={score} timeLeft={timeLeft} />
      <Modal isOpen={timeLeft === 0} onClose={() => {}}>
        <p>Game Over</p>
        <p>Skor: {score}</p>
        <Button onClick={handleSave}>Save</Button>
      </Modal>
    </div>
  );
};

export default GameScreen;
