interface Proptypes {
    type?: 'button' | 'submit' | 'reset',
    children: any,
    onClick?: () => void,
    className?: string
}

const Button = (props: Proptypes) => {
    const { type = 'button', children, onClick, className } = props
    return (
        <button type={type} className={className} onClick={onClick}>{children}</button>
    )
}

export default Button