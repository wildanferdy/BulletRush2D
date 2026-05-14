import { useEffect, useState } from "react";
import { useGame } from "../store/gameStore";
import { TARGETS } from "../utils/gameConfig";

type TargetType = {
  id: number;
  x: number;
  y: number;
  src: string;
};

const useSpawner = (isGameOver: boolean) => {
  const { selectTarget } = useGame();

  const [target, setTarget] = useState<TargetType[]>(() => {
    const targetData = TARGETS.find((t) => t.id === selectTarget);
    return [
      {
        id: Date.now() + Math.random(),
        x: Math.random() * 600,
        y: Math.random() * 1000,
        src: targetData?.src ?? "",
      },
      {
        id: Date.now() + Math.random(),
        x: Math.random() * 600,
        y: Math.random() * 1000,
        src: targetData?.src ?? "",
      },
      {
        id: Date.now() + Math.random(),
        x: Math.random() * 600,
        y: Math.random() * 1000,
        src: targetData?.src ?? "",
      },
    ];
  });

  const spawnTarget = () => {
    const currentTargetData = TARGETS.find((t) => t.id === selectTarget);
    const newTarget = {
      id: Date.now() + Math.random(),
      x: Math.random() * 600,
      y: Math.random() * 1000,
      src: currentTargetData?.src ?? "",
    };

    setTarget((prev) => [...prev, newTarget]);
  };

  useEffect(() => {
    if (isGameOver) return

    const interval = setInterval(() => {
      spawnTarget();
    }, 3000);

    return () => clearInterval(interval);
  }, [isGameOver]);

  const removeTarget = (id: number) => {
    setTarget((prev) => prev.filter((t) => t.id !== id));
  };

  return { target, spawnTarget, removeTarget };
};

export default useSpawner;
