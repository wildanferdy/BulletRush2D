import { useEffect, useRef, useState } from "react";
import { useGame } from "../store/gameStore";
import { TARGETS } from "../utils/gameConfig";

type TargetType = {
  id: number;
  x: number;
  y: number;
  src: string;
};

const useSpawner = (isGameOver: boolean, isCountdown: boolean) => {
  const { selectTarget } = useGame();
  const hasSpawned = useRef(false);

  const [target, setTarget] = useState<TargetType[]>([]);

  const spawnTarget = () => {
    const currentTargetData = TARGETS.find((t) => t.id === selectTarget);
    const newTarget = {
      id: Date.now() + Math.random(),
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      src: currentTargetData?.src ?? "",
    };
    setTarget((prev) => [...prev, newTarget]);
  };

  useEffect(() => {
    if (isCountdown || hasSpawned.current) return;
    hasSpawned.current = true;
    setTarget(() => {
      const currentTargetData = TARGETS.find((t) => t.id === selectTarget);
      return [
        { id: Date.now() + Math.random(), x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight, src: currentTargetData?.src ?? "" },
        { id: Date.now() + Math.random(), x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight, src: currentTargetData?.src ?? "" },
        { id: Date.now() + Math.random(), x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight, src: currentTargetData?.src ?? "" },
      ];
    });
  }, [isCountdown]);

  useEffect(() => {
    if (isGameOver || isCountdown) return;
    const interval = setInterval(() => {
      spawnTarget();
    }, 3000);
    return () => clearInterval(interval);
  }, [isGameOver, isCountdown]);

  const removeTarget = (id: number) => {
    setTarget((prev) => prev.filter((t) => t.id !== id));
  };

  return { target, spawnTarget, removeTarget };
};

export default useSpawner;