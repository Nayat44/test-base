'use client'

import * as React from 'react'
import { Select as BaseSelect } from '@base-ui-components/react/select'
import { Field } from '@base-ui-components/react/field'
import { type VariantProps } from 'tailwind-variants'
import { ChevronDown } from 'lucide-react'
import { cn, tv } from '@/lib/utils'

// =============================================================================
// TYPES
// =============================================================================

type SelectSize = 'xs' | 'sm' | 'md' | 'lg'

// =============================================================================
// VARIANTS
// =============================================================================

const selectTriggerVariants = tv({
  base: [
    'flex items-center justify-between w-full',
    'rounded-md border',
    'transition-colors duration-standard ease-default',
    'cursor-pointer',
    'focus-visible:outline focus-visible:[outline-width:var(--spacing-focus-outline)] focus-visible:[outline-offset:var(--spacing-focus-offset)] focus-visible:outline-brand',
    'disabled:pointer-events-none disabled:opacity-disabled',

  ],
  variants: {
    variant: {
      primary: [
        'bg-surface text-fg-primary border-border-strong',
        'hover:bg-subtle',
      ],
      ghost: [
        'bg-transparent text-fg-primary border-transparent',
        'hover:bg-subtle',
      ],
      tertiary: [
        'bg-secondary text-fg-primary border-transparent',
        'hover:bg-muted',
      ],
    },
    size: {
      xs: 'h-control-xs px-50 text-label-xs data-[placeholder]:text-body-xs data-[placeholder]:text-fg-muted',
      sm: 'h-control-sm px-50 text-label-xs data-[placeholder]:text-body-xs data-[placeholder]:text-fg-muted',
      md: 'h-control-md px-75 text-label-sm data-[placeholder]:text-body-sm data-[placeholder]:text-fg-muted',
      lg: 'h-control-lg px-75 text-label-sm data-[placeholder]:text-body-sm data-[placeholder]:text-fg-muted',
    },
    error: {
      true: 'border-negative focus-visible:outline-negative',
      false: '',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md',
    error: false,
  },
})

const selectFieldVariants = tv({
  base: 'flex flex-col gap-25',
  variants: {
    size: {
      xs: 'min-w-[240px]',
      sm: 'min-w-[260px]',
      md: 'min-w-[280px]',
      lg: 'min-w-[300px]',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

const selectLabelVariants = tv({
  base: 'font-medium text-fg-primary',
  variants: {
    size: {
      xs: 'text-label-2xs',
      sm: 'text-label-xs',
      md: 'text-label-sm',
      lg: 'text-label-sm',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

const selectDescriptionVariants = tv({
  base: 'text-fg-secondary',
  variants: {
    size: {
      xs: 'text-body-xs',
      sm: 'text-body-xs',
      md: 'text-body-xs',
      lg: 'text-body-sm',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

const selectHelperTextVariants = tv({
  base: 'text-fg-muted',
  variants: {
    size: {
      xs: 'text-body-xs',
      sm: 'text-body-xs',
      md: 'text-body-xs',
      lg: 'text-body-sm',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

const selectErrorVariants = tv({
  base: 'text-negative',
  variants: {
    size: {
      xs: 'text-body-xs',
      sm: 'text-body-xs',
      md: 'text-body-xs',
      lg: 'text-body-sm',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

const selectPopupVariants = tv({
  base: [
    'z-50 w-fit overflow-hidden rounded-md border border-border-subtle bg-surface text-fg-primary shadow-300',
    'p-50',
    'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
  ],
})

const selectItemVariants = tv({
  base: [
    'relative flex w-full cursor-pointer select-none items-center rounded-pill py-50 pl-75 pr-75 text-label-sm outline-none whitespace-nowrap',
    'bg-transparent text-fg-primary',
    'data-[highlighted]:bg-primary',
    'active:bg-secondary',
    'data-[disabled]:pointer-events-none data-[disabled]:opacity-disabled',
  ],
})

// =============================================================================
// FIELD COMPONENTS
// =============================================================================

interface SelectFieldProps extends React.ComponentPropsWithoutRef<typeof Field.Root> {
  size?: SelectSize
}

const SelectField = React.forwardRef<HTMLDivElement, SelectFieldProps>(
  ({ className, size = 'md', ...props }, ref) => (
    <Field.Root
      ref={ref}
      className={cn(selectFieldVariants({ size }), className)}
      {...props}
    />
  )
)
SelectField.displayName = 'SelectField'

interface SelectLabelProps extends React.ComponentPropsWithoutRef<typeof Field.Label> {
  size?: SelectSize
}

const SelectLabel = React.forwardRef<HTMLLabelElement, SelectLabelProps>(
  ({ className, size = 'md', ...props }, ref) => (
    <Field.Label
      ref={ref}
      className={cn(selectLabelVariants({ size }), className)}
      {...props}
    />
  )
)
SelectLabel.displayName = 'SelectLabel'

interface SelectDescriptionProps extends React.ComponentPropsWithoutRef<typeof Field.Description> {
  size?: SelectSize
}

const SelectDescription = React.forwardRef<HTMLParagraphElement, SelectDescriptionProps>(
  ({ className, size = 'md', ...props }, ref) => (
    <Field.Description
      ref={ref}
      className={cn(selectDescriptionVariants({ size }), className)}
      {...props}
    />
  )
)
SelectDescription.displayName = 'SelectDescription'

interface SelectHelperTextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  size?: SelectSize
}

const SelectHelperText = React.forwardRef<HTMLParagraphElement, SelectHelperTextProps>(
  ({ className, size = 'md', ...props }, ref) => (
    <p
      ref={ref}
      className={cn(selectHelperTextVariants({ size }), className)}
      {...props}
    />
  )
)
SelectHelperText.displayName = 'SelectHelperText'

interface SelectErrorProps extends React.HTMLAttributes<HTMLSpanElement> {
  size?: SelectSize
}

const SelectError = React.forwardRef<HTMLSpanElement, SelectErrorProps>(
  ({ className, size = 'md', ...props }, ref) => (
    <span
      ref={ref}
      className={cn(selectErrorVariants({ size }), className)}
      {...props}
    />
  )
)
SelectError.displayName = 'SelectError'

// =============================================================================
// COMPONENT COMPOSITION
// =============================================================================

const SelectRoot = BaseSelect.Root
const SelectValue = BaseSelect.Value
const SelectGroup = BaseSelect.Group
const SelectGroupLabel = BaseSelect.GroupLabel
const SelectSeparator = BaseSelect.Separator

// Re-exporting Trigger with variants
export interface SelectTriggerProps
  extends React.ComponentPropsWithoutRef<typeof BaseSelect.Trigger>,
    VariantProps<typeof selectTriggerVariants> {}

// Icon size mapping for trigger chevron
const getIconSizeClass = (size: SelectSize = 'md') => {
  const sizeMap: Record<SelectSize, string> = {
    xs: 'size-icon-sm',
    sm: 'size-icon-sm',
    md: 'size-icon-md',
    lg: 'size-icon-lg',
  }
  return sizeMap[size]
}

const SelectTrigger = React.forwardRef<HTMLButtonElement, SelectTriggerProps>(
  ({ className, size = 'md', variant, error, children, ...props }, ref) => (
    <BaseSelect.Trigger
      ref={ref}
      className={cn(selectTriggerVariants({ variant, size, error }), className)}
      {...props}
    >
      {children}
      <BaseSelect.Icon>
        <ChevronDown className={cn(getIconSizeClass(size), 'opacity-50')} />
      </BaseSelect.Icon>
    </BaseSelect.Trigger>
  )
)
SelectTrigger.displayName = 'SelectTrigger'

const SelectContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof BaseSelect.Popup>
>(({ className, children, ...props }, ref) => (
  <BaseSelect.Portal>
    <BaseSelect.Positioner sideOffset={4}>
      <BaseSelect.Popup
        ref={ref}
        className={cn(selectPopupVariants(), className)}
        {...props}
      >
        {children}
      </BaseSelect.Popup>
    </BaseSelect.Positioner>
  </BaseSelect.Portal>
))
SelectContent.displayName = 'SelectContent'

// Replacing Option with Item
const SelectItem = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof BaseSelect.Item>
>(({ className, children, ...props }, ref) => (
  <BaseSelect.Item
    ref={ref}
    className={cn(selectItemVariants(), className)}
    {...props}
  >
    <BaseSelect.ItemText>{children}</BaseSelect.ItemText>
  </BaseSelect.Item>
))
SelectItem.displayName = 'SelectItem'

// Simplified Wrapper for common usage
interface SelectOption {
  value: string
  label: string
  icon?: string | React.ReactNode | null
}

interface SelectProps extends React.ComponentProps<typeof SelectRoot> {
  options?: SelectOption[]
  placeholder?: string
  size?: SelectSize
  variant?: VariantProps<typeof selectTriggerVariants>['variant']
  triggerClassName?: string
  // Field props
  label?: string
  description?: string
  helperText?: string
  error?: boolean
  errorMessage?: string
}

const Select = React.forwardRef<HTMLButtonElement, SelectProps>(
  ({ 
    options, 
    placeholder = 'Select', 
    size = 'md', 
    variant, 
    triggerClassName, 
    label,
    description,
    helperText,
    error,
    errorMessage,
    children, 
    ...props 
  }, ref) => {
    // If children provided, render as composition root (headless-like)
    if (children) {
      return <SelectRoot {...props}>{children}</SelectRoot>
    }

    // Determine if we should wrap with field components
    const hasFieldElements = label || description || helperText || error

    // Helper to render icon (supports both image paths and React nodes)
    const renderIcon = (icon: string | React.ReactNode | null | undefined) => {
      if (!icon) return null
      if (typeof icon === 'string') {
        return <img src={icon} alt="" className="size-icon-sm" />
      }
      return <span className="size-icon-sm flex items-center justify-center">{icon}</span>
    }

    const selectContent = (
      <>
        <SelectTrigger ref={ref} className={triggerClassName} size={size} variant={variant} error={error}>
          <SelectValue>
            {(val: any) => {
              if (!val || (Array.isArray(val) && val.length === 0)) return placeholder
              if (Array.isArray(val)) {
                return val.map((v) => options?.find((o) => o.value === v)?.label || v).join(', ')
              }
              const selectedOption = options?.find((o) => o.value === val)
              if (selectedOption?.icon) {
                return (
                  <span className="flex items-center gap-50">
                    {renderIcon(selectedOption.icon)}
                    <span>{selectedOption.label}</span>
                  </span>
                )
              }
              return selectedOption?.label || val
            }}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {options?.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.icon ? (
                <span className="flex items-center gap-50">
                  {renderIcon(option.icon)}
                  <span>{option.label}</span>
                </span>
              ) : (
                option.label
              )}
            </SelectItem>
          ))}
        </SelectContent>
      </>
    )

    // Render without field wrapper for simple usage
    if (!hasFieldElements) {
      return (
        <SelectRoot {...props}>
          {selectContent}
        </SelectRoot>
      )
    }

    // Render with field wrapper
    return (
      <SelectField size={size}>
        {label && <SelectLabel size={size}>{label}</SelectLabel>}
        {description && <SelectDescription size={size}>{description}</SelectDescription>}
        <SelectRoot {...props}>
          {selectContent}
        </SelectRoot>
        {helperText && <SelectHelperText size={size}>{helperText}</SelectHelperText>}
        {error && errorMessage && <SelectError size={size}>{errorMessage}</SelectError>}
      </SelectField>
    )
  }
)
Select.displayName = 'Select'

export {
  Select,
  SelectRoot,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectItem as SelectOption,
  SelectValue,
  SelectGroup,
  SelectGroupLabel,
  SelectLabel,
  SelectSeparator,
  SelectField,
  SelectDescription,
  SelectHelperText,
  SelectError,
}
