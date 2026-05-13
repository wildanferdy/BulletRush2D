import type React from "react"
import { useRef } from "react"
import crossHair from "/images/pointer.png"
import useSpawner from "../../../hooks/useSpawner"
import Target from "../Target"

const GameBoard = () => {
  const crosshairRef = useRef<HTMLDivElement>(null)
  const boardRef = useRef<HTMLDivElement>(null)

  const {target, removeTarget} = useSpawner()

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (crosshairRef.current) {
      crosshairRef.current.style.left = e.nativeEvent.offsetX + "px"
      crosshairRef.current.style.top = e.nativeEvent.offsetY + "px"
    }
  }

  const handleShoot = (e: React.MouseEvent<HTMLDivElement>) => {
    const clickX = e.nativeEvent.offsetX
    const clickY = e.nativeEvent.offsetY

    const hit = target.find(
      (t) =>
        clickX >= t.x &&
        clickX <= t.x + 50 &&
        clickY >= t.y &&
        clickY <= t.y + 50
    )

    if (hit) {
      console.log("hit target:", hit.id)
      removeTarget(hit.id)
    } else {
      console.log("miss")
    }
    
  }


  return (
    
    <div
      ref={boardRef}
      className="w-[600px] h-[1000px] relative cursor-none bg-zinc-900"
      onMouseMove={onMouseMove}
      onClick={handleShoot}
    >
      {target.map((targets) => (
        <Target key={targets.id} x={targets.x} y={targets.y} src={targets.src} onHit={() => removeTarget(targets.id)} />
      ))}

      <div
        ref={crosshairRef}
        className="absolute pointer-events-none -translate-x-1/2 -translate-y-1/2"
      >
        <img src={crossHair} alt="crosshair" />
      </div>
    </div>
  )
}

export default GameBoard