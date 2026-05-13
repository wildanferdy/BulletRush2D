import { useEffect, useState } from "react"

type TargetType = {
  id: number
  x: number
  y: number
  src: string
}

const useSpawner = () => {
    const [target, setTarget] = useState<TargetType[]>([])

    const spawnTarget = () => {
      const newTarget = {
        id: Date.now() + Math.random(),
        x: Math.random() * 600,
        y: Math.random() * 1000,
        src: ""
      }

      setTarget(prev => [...prev, newTarget])
      
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
        setTarget(prev => prev.filter(t => t.id !== id))

    }

    return {target, spawnTarget, removeTarget}
    
}

export default useSpawner