import { useGame } from "../../../store/gameStore";

const ScorePanel = ({
  score,
  timeLeft,
}: {
  score: number;
  timeLeft: number;
}) => {
  const { username } = useGame();

  return (
    <div className="absolute top-0 left-0 right-0 flex justify-between items-center px-6 py-3 bg-black/60 text-white z-10">
      <span className="font-bold">Player Name : {username}</span>
      <span className="font-bold">Score : {score}</span>
      <span className="font-bold">Time : {timeLeft}</span>
    </div>
  );
};

export default ScorePanel;
