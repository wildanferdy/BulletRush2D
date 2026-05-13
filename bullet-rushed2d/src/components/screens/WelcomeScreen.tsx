import { useState } from "react";
import Button from "../ui/Button";
import SelectionCard from "../ui/Card";
import { LEVELS, GUNS, TARGETS } from "../../utils/gameConfig";
import { useGame } from "../../store/gameStore";

const WelcomeScreen = () => {
  const [username, setUsername] = useState("");
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [selectedTarget, setSelectedTarget] = useState<string | null>(null);
  const [selectedGun, setSelectedGun] = useState<string | null>(null);

  const {
    setUsername: setGlobalUsername,
    setSelectedLevel: setGlobalLevel,
    setSelectedGun: setGlobalGun,
    setSelectedTarget: setGlobalTarget,
    setCurrentScreen,
  } = useGame();

  const isReady =
    username !== "" && selectedLevel !== null && selectedTarget !== null && selectedGun !== null;

  const handlePlay = () => {
    setGlobalUsername(username);
    setGlobalLevel(selectedLevel);
    setGlobalGun(selectedGun);
    setGlobalTarget(selectedTarget);
    setCurrentScreen("game");
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-6 font-mono">
      <div className="w-full max-w-lg flex flex-col gap-6">

        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-widest text-white uppercase">Operator</h1>
          <p className="text-xs tracking-widest text-zinc-500 uppercase mt-1">Setup your loadout</p>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs tracking-widest text-zinc-400 uppercase">Callsign</label>
          <input
            type="text"
            placeholder="Enter callsign..."
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="bg-zinc-900 border border-zinc-700 focus:border-red-600 text-white placeholder-zinc-600 px-4 py-3 text-sm outline-none transition-colors"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs tracking-widest text-zinc-400 uppercase">Threat Level</label>
          <select
            value={selectedLevel ?? ""}
            onChange={(e) => setSelectedLevel(e.target.value)}
            className="bg-zinc-900 border border-zinc-700 focus:border-red-600 text-white px-4 py-3 text-sm outline-none transition-colors appearance-none cursor-pointer"
          >
            <option value="" disabled>Select level...</option>
            {Object.entries(LEVELS).map(([id, data]) => (
              <option key={id} value={id} className="bg-zinc-900">{data.label}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xs tracking-widest text-zinc-400 uppercase">Weapon</label>
          <div className="grid grid-cols-3 gap-2">
            {GUNS.map((gun) => (
              <SelectionCard key={gun.id} item={gun} name="gun" selected={selectedGun === gun.id} onChange={setSelectedGun} />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xs tracking-widest text-zinc-400 uppercase">Target Type</label>
          <div className="grid grid-cols-3 gap-2">
            {TARGETS.map((target) => (
              <SelectionCard key={target.id} item={target} name="target" selected={selectedTarget === target.id} onChange={setSelectedTarget} />
            ))}
          </div>
        </div>

        <Button
          disabled={!isReady}
          onClick={handlePlay}
          className={`w-full py-3 text-sm font-bold tracking-widest uppercase transition-colors
            ${!isReady
              ? "bg-zinc-800 text-zinc-600 cursor-not-allowed"
              : "bg-red-600 hover:bg-red-500 text-white cursor-pointer"
            }`}
        >
          {isReady ? "Deploy" : "Incomplete"}
        </Button>

      </div>
    </div>
  );
};

export default WelcomeScreen;