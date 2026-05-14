type Target = {
    x: number
    y: number
    src: string
    onHit: () => void
}

const Target = ({ x, y, src, onHit }: Target) => {

    return (
        <div className="absolute" style={{ left: x, top: y, }} onClick={onHit}>
            <img src={src} alt="" className="w-12 h-12" />
        </div>
    )
}

export default Target
