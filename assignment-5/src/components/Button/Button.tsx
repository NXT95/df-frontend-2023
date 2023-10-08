import cn from 'classnames'
import styles from './Button.style'

type ButtonType = 'primary' | 'secondary' | 'default'

interface ButtonProps {
  className?: string
  disabled?: boolean
  appearance: ButtonType
  children: React.ReactNode
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
}

export const Button = ({
  appearance = 'primary',
  className,
  children,
  type = 'button',
  ...rest
}: ButtonProps) => {
  const baseClassName = styles({
    disabled: rest.disabled,
    appearance,
  })

  return (
    <button className={cn(className, baseClassName)} type={type} {...rest}>
      {children}
    </button>
  )
}
