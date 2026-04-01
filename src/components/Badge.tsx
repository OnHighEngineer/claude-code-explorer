import React from 'react'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'green' | 'blue' | 'amber' | 'red' | 'purple'
}

const variantClasses = {
  default: 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300',
  green: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400',
  blue: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400',
  amber: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400',
  red: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400',
  purple: 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400',
}

export function Badge({ children, variant = 'default' }: BadgeProps) {
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${variantClasses[variant]}`}>
      {children}
    </span>
  )
}
