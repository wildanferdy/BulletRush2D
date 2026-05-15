import type React from "react";
import { useRef } from "react";
import crossHair from "/images/pointer.png";
import useSpawner from "../../../hooks/useSpawner";
import Target from "../Target";
import { useGame } from "../../../store/gameStore";
import { GUNS } from "../../../utils/gameConfig";
import ScorePanel from "../ScorePanel";

const GameBoard = ({
  onScore,
  isGameOver,
  score,
  timeLeft,
  countdown,
}: {
  onScore: React.Dispatch<React.SetStateAction<number>>;
  isGameOver: boolean;
  score: number;
  timeLeft: number;
  countdown: number;
}) => {
  const crosshairRef = useRef<HTMLDivElement>(null);
  const boardRef = useRef<HTMLDivElement>(null);
  const gunRef = useRef<HTMLDivElement>(null);

  const { selectGun } = useGame();
  const gunData = GUNS.find((g) => g.id === selectGun);

  const { target, removeTarget } = useSpawner(isGameOver, countdown > 0);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = boardRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (crosshairRef.current) {
      crosshairRef.current.style.left = x + "px";
      crosshairRef.current.style.top = y + "px";
    }

    if (gunRef.current) {
      gunRef.current.style.left = x + "px";
      gunRef.current.style.top = y + "px";
    }
  };

  const handleShoot = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = boardRef.current?.getBoundingClientRect();
    if (!rect) return;

    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    console.log("click:", clickX, clickY);
    console.log(
      "targets:",
      target.map((t) => ({ x: t.x, y: t.y })),
    );

    const hit = target.find(
      (t) =>
        clickX >= t.x &&
        clickX <= t.x + 96 &&
        clickY >= t.y &&
        clickY <= t.y + 96,
    );

    if (hit) {
      removeTarget(hit.id);
      onScore((prev: number) => prev + 1);
    } else {
      console.log("miss");
    }
  };

  return (
    <div
      ref={boardRef}
      className="w-screen h-screen relative cursor-none overflow-hidden"
      style={{
        backgroundImage: "url('/images/background.jpg')",
        backgroundSize: "cover",
      }}
      onMouseMove={onMouseMove}
      onClick={handleShoot}
    >
      {target.map((targets) => (
        <Target
          key={targets.id}
          x={targets.x}
          y={targets.y}
          src={targets.src}
          onHit={() => removeTarget(targets.id)}
        />
      ))}
      <ScorePanel score={score} timeLeft={timeLeft} />
      <div
        ref={crosshairRef}
        className="absolute pointer-events-none -translate-x-1/2 -translate-y-1/2"
      >
        <img src={crossHair} alt="crosshair" />
      </div>
      <div ref={gunRef} className="absolute pointer-events-none">
        <img src={gunData?.src} alt="gun" />
      </div>
    </div>
  );
};

export default GameBoard;
