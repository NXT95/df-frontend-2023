import { tv } from 'tailwind-variants'

const styles = tv({
  base: 'rounded transition duration-200',
  variants: {
    appearance: {
      primary: '',
      secondary: '',
      default: '',
    },
    disabled: {
      true: '',
    },
  },
  compoundVariants: [
    {
      appearance: 'primary',
      disabled: false,
      className: ['text-white bg-[#d2465b]'],
    },
    {
      appearance: 'secondary',
      disabled: false,
      className: ['text-black hover:bg-red-100'],
    },
    {
      appearance: 'default',
      disabled: false,
    },
  ],
  defaultVariants: {
    disabled: false,
    appearance: 'primary',
  },
})

export default styles
