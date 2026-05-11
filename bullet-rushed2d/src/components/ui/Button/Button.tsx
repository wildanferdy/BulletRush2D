interface Proptypes {
    type?: 'button' | 'submit' | 'reset',
    children: any,
    onClick?: () => void,
    className?: string
    disabled?: boolean
}

const Button = (props: Proptypes) => {
    const { type = 'button', children, onClick, className, disabled } = props
    return (
        <button type={type} className={className} onClick={onClick} disabled={disabled}>{children}</button>
    )
}

export default Button