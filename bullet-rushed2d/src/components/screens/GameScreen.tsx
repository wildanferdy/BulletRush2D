import { useEffect, useState } from "react";
import GameBoard from "../game/GameBoard/GameBoard";
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
  const { setCurrentScreen, username } = useGame();
  const [countdown, setCountdown] = useState(3);
  const { timeLeft } = useTimer(isPaused || countdown > 0);

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

  useEffect(() => {
    if (countdown === 0) return;

    const interval = setInterval(() => {
      setCountdown((prev: number) => prev - 1);
    }, 1000);

    console.log(countdown);

    return () => clearInterval(interval);
  }, [countdown]);

  return (
    <div className="w-screen h-screen relative overflow-hidden">
      {countdown > 0 && (
        <div className="absolute z-50 inset-0 flex items-center justify-center bg-black/50">
          <span className="text-white text-9xl font-bold">{countdown}</span>
        </div>
      )}
      <GameBoard onScore={setScore} isGameOver={timeLeft === 0} score={score} timeLeft={timeLeft} countdown={countdown} />
      <Modal isOpen={timeLeft === 0} onClose={() => {}}>
        <p>Game Over</p>
        <p>Score: {score}</p>
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
