import { useState } from "react";
import Button from "../ui/Button";
import { useGame } from "../../store/gameStore";

type MatchHistory = {
  id: number;
  playerName: string;
  score: number;
  playedAt: string;
};

const HistoryScreen = () => {
  const { setCurrentScreen } = useGame();
  const [history, setHistory] = useState<MatchHistory[]>(() => {
    return JSON.parse(localStorage.getItem("shooter_history") || "[]");
  });

  return (
    <div>
      {history.map((match) => (
        <div key={match.id}>
          <p>{match.playerName}</p>
          <p>{match.score}</p>
          <p>{match.playedAt}</p>
        </div>
      ))}
      <Button onClick={() => setCurrentScreen(null)}>Back</Button>
    </div>
  );
};

export default HistoryScreen;
