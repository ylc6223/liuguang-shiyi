import * as React from 'react'
import { cva } from 'class-variance-authority'
import { cn } from '../../lib/cn'

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        outline: 'border bg-transparent hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline'
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-8 rounded-md px-3',
        lg: 'h-10 rounded-md px-8',
        icon: 'h-9 w-9'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
)

// 使用数字枚举来表达固定选项（符合仓库硬性规范）
export enum ButtonVariant {
  Default = 1,
  Outline = 2,
  Secondary = 3,
  Ghost = 4,
  Link = 5
}

export enum ButtonSize {
  Default = 1,
  Sm = 2,
  Lg = 3,
  Icon = 4
}

const variantKeyMap: Record<ButtonVariant, 'default' | 'outline' | 'secondary' | 'ghost' | 'link'> = {
  [ButtonVariant.Default]: 'default',
  [ButtonVariant.Outline]: 'outline',
  [ButtonVariant.Secondary]: 'secondary',
  [ButtonVariant.Ghost]: 'ghost',
  [ButtonVariant.Link]: 'link'
}

const sizeKeyMap: Record<ButtonSize, 'default' | 'sm' | 'lg' | 'icon'> = {
  [ButtonSize.Default]: 'default',
  [ButtonSize.Sm]: 'sm',
  [ButtonSize.Lg]: 'lg',
  [ButtonSize.Icon]: 'icon'
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, ...props }, ref) => {
  const v = variant ? variantKeyMap[variant] : undefined
  const s = size ? sizeKeyMap[size] : undefined
  return <button ref={ref} className={cn(buttonVariants({ variant: v, size: s }), className)} {...props} />
})
Button.displayName = 'Button'

export { buttonVariants }
