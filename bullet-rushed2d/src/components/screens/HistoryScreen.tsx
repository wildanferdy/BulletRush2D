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
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-8">
      <div className="bg-zinc-900 w-80 rounded-lg p-4">
        <h2 className="text-white font-bold text-center text-lg mb-4">
          LEADERBOARD
        </h2>
        {history
          .sort((a, b) => b.score - a.score)
          .map((match) => (
            <div
              key={match.id}
              className="flex justify-between items-center mb-3"
            >
              <div>
                <p className="text-white font-medium">{match.playerName}</p>
                <p className="text-zinc-400 text-sm">Score : {match.score}</p>
              </div>
            </div>
          ))}
        <Button onClick={() => setCurrentScreen(null)} className="w-full mt-4">
          Back
        </Button>
      </div>
    </div>
  );
};

export default HistoryScreen;
