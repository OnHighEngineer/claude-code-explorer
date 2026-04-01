import React from 'react'
import { ExternalLink, Star } from 'lucide-react'
import type { ToolEntry } from '@/types'

interface ToolCardProps {
  tool: ToolEntry
  onFavorite?: (tool: ToolEntry) => void
  isFavorited?: boolean
}

export function ToolCard({
  tool,
  onFavorite,
  isFavorited = false,
}: ToolCardProps) {
  return (
    <div className="bg-white dark:bg-black rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-800">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-black dark:text-white">
            {tool.name}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            {tool.description}
          </p>
        </div>
        {onFavorite && (
          <button
            onClick={() => onFavorite(tool)}
            className={`p-2 rounded-lg transition-colors ${
              isFavorited
                ? 'bg-gray-200 dark:bg-gray-800 text-black dark:text-white'
                : 'bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white'
            }`}
          >
            <Star className="w-5 h-5" fill={isFavorited ? 'currentColor' : 'none'} />
          </button>
        )}
      </div>

      {tool.permissions && tool.permissions.length > 0 && (
        <div className="mt-4">
          <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">
            Permissions
          </p>
          <div className="flex flex-wrap gap-2 mt-2">
            {tool.permissions.map((perm) => (
              <span
                key={perm}
                className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 rounded-full"
              >
                {perm}
              </span>
            ))}
          </div>
        </div>
      )}

      {tool.file && (
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-800 flex items-center justify-between">
          <a
            href={`https://github.com/OnHighEngineer/claude-code/blob/main/${tool.file}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-gray-700 dark:text-gray-300 hover:underline hover:text-black dark:hover:text-white flex items-center gap-1"
          >
            View Source
            <ExternalLink className="w-3 h-3" />
          </a>
          <span className="text-xs text-gray-500 dark:text-gray-500">
            {tool.category}
          </span>
        </div>
      )}
    </div>
  )
}
