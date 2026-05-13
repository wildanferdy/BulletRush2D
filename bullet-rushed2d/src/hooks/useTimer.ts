import { useEffect, useState } from "react"
import { useGame } from "../store/gameStore"
import { LEVELS } from "../utils/gameConfig"

const useTimer = () => {
    const {selectLevel} = useGame()

    const duration = selectLevel ? LEVELS[selectLevel as keyof typeof LEVELS].duration : 30
    const [timeLeft, setTimeLeft] = useState(duration)
    const [isRunning, setIsRunning] = useState(true)

    const pause = () => setIsRunning(false)
    const resume = () => setIsRunning(true)
    const reduceFive = () => setTimeLeft(prev => prev - 5)

    useEffect(() => {
        if(!isRunning || timeLeft === 0) return

        const interval = setInterval(() => {
            setTimeLeft((prev: number) => prev - 1)
        }, 1000)

        return () => clearInterval(interval)
    }, [isRunning, timeLeft])

    return {isRunning, timeLeft, pause, resume, reduceFive}

}

export default useTimer