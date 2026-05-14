import type React from "react";
import { useRef } from "react";
import crossHair from "/images/pointer.png";
import useSpawner from "../../../hooks/useSpawner";
import Target from "../Target";
import { useGame } from "../../../store/gameStore";
import { GUNS } from "../../../utils/gameConfig";

const GameBoard = ({
  onScore,
  isGameOver,
}: {
  onScore: React.Dispatch<React.SetStateAction<number>>;
  isGameOver: boolean;
}) => {
  const crosshairRef = useRef<HTMLDivElement>(null);
  const boardRef = useRef<HTMLDivElement>(null);
  const gunRef = useRef<HTMLDivElement>(null);

  const {selectGun} = useGame()
  const gunData = GUNS.find(g => g.id === selectGun)

  const { target, removeTarget } = useSpawner(isGameOver);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (crosshairRef.current) {
      crosshairRef.current.style.left = e.nativeEvent.offsetX + "px";
      crosshairRef.current.style.top = e.nativeEvent.offsetY + "px";
    }

    if (gunRef.current) {
      gunRef.current.style.left = e.nativeEvent.offsetX + "px";
      gunRef.current.style.top = e.nativeEvent.offsetY + "px";
    }
    
  };

  const handleShoot = (e: React.MouseEvent<HTMLDivElement>) => {
    const clickX = e.nativeEvent.offsetX;
    const clickY = e.nativeEvent.offsetY;

    const hit = target.find(
      (t) =>
        clickX >= t.x &&
        clickX <= t.x + 50 &&
        clickY >= t.y &&
        clickY <= t.y + 50,
    );

    if (hit) {
      console.log("hit target:", hit.id);
      removeTarget(hit.id);
      onScore((prev: number) => prev + 1);
    } else {
      console.log("miss");
    }
  };

  return (
    <div
      ref={boardRef}
      className="w-[600px] h-[1000px] relative cursor-none bg-zinc-900"
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
