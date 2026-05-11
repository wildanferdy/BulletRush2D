import { useState, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"

const DURATION: Record<"a" | "b", number> = {
    a: 20,
    b: 30,
}

const TimerPage = () => {
    const { state } = useLocation()
    const navigate = useNavigate()

    const choice = state?.choice as "a" | "b"
    const totalTime = DURATION[choice]

    const [seconds, setSeconds] = useState(totalTime)
    const [isRunning, setIsRunning] = useState(true)

    const isFinished = seconds === 0
    const progress = (seconds / totalTime) * 100

    useEffect(() => {
        if (!isRunning || isFinished) return

        const interval = setInterval(() => {
            setSeconds(prev => prev - 1)
        }, 1000)

        return () => clearInterval(interval)
    }, [isRunning, seconds])

    const handleReset = () => {
        setSeconds(totalTime)
        setIsRunning(true)
    }

    return (
        <div className="min-h-screen bg-zinc-900 flex flex-col items-center justify-center gap-8 p-8">

            {/* Label pilihan */}
            <div className="px-4 py-1.5 bg-zinc-800 border border-zinc-700 rounded-full">
                <span className="text-zinc-400 text-sm">
                    Pilihan <span className="text-white font-semibold uppercase">{choice}</span>
                    {" "}— {totalTime} detik
                </span>
            </div>

            {/* Lingkaran timer */}
            <div className="relative w-52 h-52">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                    {/* Track */}
                    <circle
                        cx="50" cy="50" r="44"
                        fill="none"
                        stroke="#3f3f46"
                        strokeWidth="8"
                    />
                    {/* Progress */}
                    <circle
                        cx="50" cy="50" r="44"
                        fill="none"
                        stroke={isFinished ? "#22c55e" : "#3b82f6"}
                        strokeWidth="8"
                        strokeLinecap="round"
                        strokeDasharray={`${2 * Math.PI * 44}`}
                        strokeDashoffset={`${2 * Math.PI * 44 * (1 - progress / 100)}`}
                        className="transition-all duration-1000 ease-linear"
                    />
                </svg>

                {/* Angka di tengah */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    {isFinished ? (
                        <span className="text-green-400 text-2xl font-bold">Selesai!</span>
                    ) : (
                        <>
                            <span className="text-white text-5xl font-bold">{seconds}</span>
                            <span className="text-zinc-500 text-xs mt-1">detik</span>
                        </>
                    )}
                </div>
            </div>

            {/* Tombol aksi */}
            <div className="flex gap-3">
                {!isFinished && (
                    <button
                        onClick={() => setIsRunning(prev => !prev)}
                        className="px-5 py-2.5 bg-zinc-700 hover:bg-zinc-600 text-white text-sm font-medium rounded-lg transition-colors"
                    >
                        {isRunning ? "Pause" : "Resume"}
                    </button>
                )}
                <button
                    onClick={handleReset}
                    className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium rounded-lg transition-colors"
                >
                    Reset
                </button>
                <button
                    onClick={() => navigate(-1)}
                    className="px-5 py-2.5 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-300 text-sm font-medium rounded-lg transition-colors"
                >
                    ← Kembali
                </button>
            </div>

        </div>
    )
}

export default TimerPage