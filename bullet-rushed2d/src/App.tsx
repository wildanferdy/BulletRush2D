import GameScreen from "./components/screens/GameScreen";
import HistoryScreen from "./components/screens/HistoryScreen";
import WelcomeScreen from "./components/screens/WelcomeScreen";
import { GameProvider, useGame } from "./store/gameStore";

function App() {
  return (
    <GameProvider>
      <AppContent />
    </GameProvider>
  );
}

const AppContent = () => {
  const { currentScreen } = useGame()

  if(currentScreen === "game") return <GameScreen/>
  if(currentScreen === "history") return <HistoryScreen/>
  return <WelcomeScreen/>
  
}

export default App;
