import WelcomeScreen from "./components/screens/WelcomeScreen";
import { GameProvider } from "./store/gameStore";

function App() {
  return (
    <GameProvider>
      <WelcomeScreen />
    </GameProvider>
  );
}

export default App;
