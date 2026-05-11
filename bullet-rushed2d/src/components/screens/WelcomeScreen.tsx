import { useState } from "react"
import Button from "../ui/Button"
import { LEVELS, GUNS, TARGETS } from "../../utils/gameConfig"

const WelcomeScreen = () => {
    const [username, setUsername] = useState('')
    const [selectedLevel, setSelectedLevel] = useState<string | null>(null)
    const [selectedTarget, setSelectedTarget] = useState<string | null>(null)
    const [selectedGun, setSelectedGun] = useState<string | null>(null)
    const [modal, setModal] = useState(false)

    return (
        <div>
            <input type="name" onChange={(e) => setUsername(e.target.value)} value={username} />
            <select value={selectedLevel ?? ""} onChange={(e) => setSelectedLevel(e.target.value)}>
                <option value=""></option>
                {Object.entries(LEVELS).map(([id, data]) => (
                    <option key={id} value={id}>{data.label}</option>
                ))}
            </select>

            {GUNS.map(gun => (
                <div key={gun.id}>
                    <label>
                        <input type="radio" name="gun" value={gun.id} checked={selectedGun === gun.id} onChange={(e) => setSelectedGun(e.target.value)} />
                        <img src={gun.src} alt={gun.label} />
                        <span>{gun.label}</span>
                    </label>
                </div>
            ))}

            {TARGETS.map(target => (
                <div key={target.id}>
                    <label>
                        <input type="radio" name="target" value={target.id} checked={selectedTarget === target.id} onChange={(e) => setSelectedTarget(e.target.value)} />
                        <img src={target.src} alt={target.label} />
                        <span>{target.label}</span>
                    </label>
                </div>
            ))}


            <Button disabled={username === "" || selectedLevel === null || selectedTarget === null || selectedGun === null}>Play</Button>
        </div>
    )

}

export default WelcomeScreen