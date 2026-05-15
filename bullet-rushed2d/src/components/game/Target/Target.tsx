type Target = {
    x: number
    y: number
    src: string
    onHit: () => void
}

const Target = ({ x, y, src, onHit }: Target) => {

    return (
        <div className="absolute pointer-events-auto" style={{ left: x, top: y, }} onClick={onHit}>
            <img src={src} alt="" className="w-24 h-24" />
        </div>
    )
}

export default Target
