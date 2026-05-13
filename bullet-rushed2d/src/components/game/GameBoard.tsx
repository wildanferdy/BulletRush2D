import type React from "react"
import { useRef } from "react"
import crossHair from "/images/pointer.png"

interface Target {
  id: string
  x: number
  y: number
  width: number
  height: number
}

const GameBoard = () => {
  const crosshairRef = useRef<HTMLDivElement>(null)
  const boardRef = useRef<HTMLDivElement>(null)

  // contoh targets, nanti bisa dari props/store
  const targets: Target[] = [
    { id: "1", x: 100, y: 200, width: 60, height: 60 },
    { id: "2", x: 300, y: 400, width: 60, height: 60 },
  ]

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (crosshairRef.current) {
      crosshairRef.current.style.left = e.nativeEvent.offsetX + "px"
      crosshairRef.current.style.top = e.nativeEvent.offsetY + "px"
    }
  }

  const handleShoot = (e: React.MouseEvent<HTMLDivElement>) => {
    const clickX = e.nativeEvent.offsetX
    const clickY = e.nativeEvent.offsetY

    const hit = targets.find(
      (t) =>
        clickX >= t.x &&
        clickX <= t.x + t.width &&
        clickY >= t.y &&
        clickY <= t.y + t.height
    )

    if (hit) {
      console.log("hit target:", hit.id)
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
      {targets.map((target) => (
        <div
          key={target.id}
          className="absolute bg-red-600"
          style={{ left: target.x, top: target.y, width: target.width, height: target.height }}
        />
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