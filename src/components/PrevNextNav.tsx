import React from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface PrevNextNavProps {
  prev?: { id: string; title: string }
  next?: { id: string; title: string }
  onNavigate: (id: string) => void
}

export function PrevNextNav({ prev, next, onNavigate }: PrevNextNavProps) {
  if (!prev && !next) return null

  return (
    <div className="flex items-center justify-between mt-12 pt-6 border-t border-gray-200 dark:border-gray-800">
      {prev ? (
        <button
          onClick={() => onNavigate(prev.id)}
          className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <div className="text-left">
            <div className="text-xs text-gray-500">Previous</div>
            <div className="font-medium">{prev.title}</div>
          </div>
        </button>
      ) : (
        <div />
      )}
      {next ? (
        <button
          onClick={() => onNavigate(next.id)}
          className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          <div className="text-right">
            <div className="text-xs text-gray-500">Next</div>
            <div className="font-medium">{next.title}</div>
          </div>
          <ChevronRight className="w-4 h-4" />
        </button>
      ) : (
        <div />
      )}
    </div>
  )
}
