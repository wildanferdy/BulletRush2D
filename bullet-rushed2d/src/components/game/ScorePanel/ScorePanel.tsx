import useTimer from "../../../hooks/useTimer"
import { useGame } from "../../../store/gameStore"

const ScorePanel = ({ score }: { score: number }) => {
    const { username } = useGame()
    const { timeLeft } = useTimer()

    return (
        <div>
            {username}
            {timeLeft}
            {score}
        </div>
    )
}

export default ScorePanel