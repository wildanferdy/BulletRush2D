import { useEffect, useState } from "react";
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
  const [isPaused, setIsPaused] = useState(false);
  const { timeLeft } = useTimer(isPaused);
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
    setCurrentScreen("history");
  };

  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsPaused((prev) => !prev);
    };
    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <GameBoard onScore={setScore} />
      <ScorePanel score={score} timeLeft={timeLeft} />
      <Modal isOpen={timeLeft === 0} onClose={() => {}}>
        <p>Game Over</p>
        <p>Skor: {score}</p>
        <Button onClick={handleSave}>Save</Button>
      </Modal>
      <Modal isOpen={isPaused} onClose={() => setIsPaused(false)}>
        <p>Paused</p>
        <Button onClick={() => setIsPaused(false)}>Continue</Button>
      </Modal>
    </div>
  );
};

export default GameScreen;
