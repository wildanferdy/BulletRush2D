import { useGame } from "../../../store/gameStore"

const ScorePanel = ({ score, timeLeft }: { score: number, timeLeft: number }) => {
    const { username } = useGame()

    return (
        <div>
            {username}
            {timeLeft}
            {score}
        </div>
    )
}

export default ScorePanel