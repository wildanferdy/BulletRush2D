import type React from "react"

const GameBoard = () => {
    const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        console.log("mouse move")
    }
    
    const handleShoot = () => {
        console.log("shoot")
    }

  return (
    <div className="w-[600px] h-[1000px] relative" onMouseMove={onMouseMove} onClick={handleShoot}>
      
    </div>
  )
}

export default GameBoard
