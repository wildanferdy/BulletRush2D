import { useEffect, useState } from "react"

const Countdown = ({ onFinish }: { onFinish?: () => void }) => {
    const [count, setCount] = useState(3)

    useEffect(() => {
        if (count === 0) {
            onFinish?.()
            return
        }

        const timer = setTimeout(() => setCount(count - 1), 1000)
        return () => clearTimeout(timer)
    }, [count])

    if (count === 0) return null

    return (
        <div className="flex items-center justify-center w-full h-full">
            <span key={count} className="text-white text-8xl font-bold animate-bounce">
                {count}
            </span>
        </div>
    )
}

export default Countdown