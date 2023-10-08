import { forwardRef } from 'react'
import Image from 'next/image'
import closeIcon from '@/assets/icons/close.svg'
import { Button } from 'components/Button'

interface DialogProps {
  className?: string
  title: string
  children: React.ReactNode
  onClose?: () => void
}

export const Dialog = forwardRef(function Dialog(
  { title, children, onClose }: DialogProps,
  ref: React.ForwardedRef<HTMLDialogElement>,
) {
  return (
    <dialog
      className="w-[340px] rounded border-2 border-solid border-[#d6dce1] p-4"
      ref={ref}
    >
      <header className="mb-[25px] flex items-center justify-between">
        <div className="text-2xl font-bold">{title}</div>
        <Button className="bg-white" appearance="default" onClick={onClose}>
          <Image src={closeIcon} alt="Close" />
        </Button>
      </header>
      {children}
    </dialog>
  )
})
