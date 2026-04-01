import React from 'react'
import { Info, AlertTriangle, Lightbulb } from 'lucide-react'

interface CalloutProps {
  variant: 'info' | 'warning' | 'tip'
  title: string
  children: React.ReactNode
}

const variantConfig = {
  info: {
    icon: Info,
    bg: 'bg-blue-50 dark:bg-blue-950/30',
    border: 'border-blue-200 dark:border-blue-800',
    iconColor: 'text-blue-600 dark:text-blue-400',
    textColor: 'text-blue-800 dark:text-blue-300',
  },
  warning: {
    icon: AlertTriangle,
    bg: 'bg-amber-50 dark:bg-amber-950/30',
    border: 'border-amber-200 dark:border-amber-800',
    iconColor: 'text-amber-600 dark:text-amber-400',
    textColor: 'text-amber-800 dark:text-amber-300',
  },
  tip: {
    icon: Lightbulb,
    bg: 'bg-green-50 dark:bg-green-950/30',
    border: 'border-green-200 dark:border-green-800',
    iconColor: 'text-green-600 dark:text-green-400',
    textColor: 'text-green-800 dark:text-green-300',
  },
}

export function Callout({ variant, title, children }: CalloutProps) {
  const config = variantConfig[variant]
  const Icon = config.icon

  return (
    <div className={`flex gap-3 p-4 rounded-lg border ${config.bg} ${config.border} my-4`}>
      <Icon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${config.iconColor}`} />
      <div>
        {title && (
          <p className={`font-semibold text-sm mb-1 ${config.textColor}`}>{title}</p>
        )}
        <div className={`text-sm ${config.textColor}`}>{children}</div>
      </div>
    </div>
  )
}
