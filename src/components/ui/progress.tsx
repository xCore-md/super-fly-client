'use client'

import * as React from 'react'
import * as ProgressPrimitive from '@radix-ui/react-progress'
import { cn } from '@/lib/utils'

interface IAdditionalProps {
  progressClassName?: string
  showRectangle?: boolean
}

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root> & IAdditionalProps,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> &
    IAdditionalProps
>(({ className, progressClassName, showRectangle, value, ...props }, ref) => (
  <div className="relative">
    <ProgressPrimitive.Root
      ref={ref}
      className={cn(
        'relative h-4 w-full overflow-hidden rounded-full bg-secondary',
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className={cn(
          'relative h-full w-full flex-1 bg-primary transition-all',
          progressClassName
        )}
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
    {showRectangle && (
      <div
        className="relative h-0 w-full flex-1 -translate-y-0.5 bg-primary transition-all"
        style={{ transform: `translate(-${100 - (value || 0)}%, -4px)` }}
      >
        <div className="absolute -right-1.5 top-1/2 h-1.5 w-3 rounded-full border border-white bg-red-600" />
      </div>
    )}
  </div>
))
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
