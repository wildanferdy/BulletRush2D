import { createContext, useState, useContext } from "react";

type GameContext = {
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  selectLevel: string | null;
  setSelectedLevel: React.Dispatch<React.SetStateAction<string | null>>;
  selectGun: string | null;
  setSelectedGun: React.Dispatch<React.SetStateAction<string | null>>;
  selectTarget: string | null;
  setSelectedTarget: React.Dispatch<React.SetStateAction<string | null>>;
  currentScreen: string | null;
  setCurrentScreen: React.Dispatch<React.SetStateAction<string | null>>;
};

export const GameContext = createContext<GameContext | null>(null);

export const GameProvider = ({ children }) => {
  const [username, setUsername] = useState("");
  const [selectLevel, setSelectedLevel] = useState<string | null>(null);
  const [selectGun, setSelectedGun] = useState<string | null>(null);
  const [selectTarget, setSelectedTarget] = useState<string | null>(null);
  const [currentScreen, setCurrentScreen] = useState<string | null>(null);

  return (
    <GameContext.Provider
      value={{
        username,
        setUsername,
        selectLevel,
        setSelectedLevel,
        selectGun,
        setSelectedGun,
        selectTarget,
        setSelectedTarget,
        currentScreen,
        setCurrentScreen,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
    return useContext(GameContext)
}