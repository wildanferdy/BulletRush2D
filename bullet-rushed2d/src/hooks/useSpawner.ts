import { useEffect, useState } from "react"

type TargetType = {
  id: number
  x: number
  y: number
  src: string
}

const useSpawner = () => {
    const [targets, setTargets] = useState<TargetType[]>([])

    const spawnTarget = () => {
      const newTarget = {
        id: Date.now(),
        x: Math.random() * 600,
        y: Math.random() * 1000,
        src: ""
      }

      setTargets(prev => [...prev, newTarget])
      
    }

    useEffect(() => {
      spawnTarget()
      spawnTarget()
      spawnTarget()
    }, [])

    useEffect(() => {
      const interval = setInterval(() => {
        spawnTarget()
      }, 3000)

      return () => clearInterval(interval)
    }, [])

    const removeTarget = (id: number) => {
        setTargets(prev => prev.filter(t => t.id !== id))

    }

    return {targets, spawnTarget, removeTarget}
    
}

export default useSpawner
