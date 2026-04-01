import React, { useMemo, useState } from 'react'
import { ToolCard } from '@/components/ToolCard'
import { useFavorites } from '@/hooks/useFavorites'
import type { ToolEntry } from '@/types'

interface ToolsPageProps {
  tools: ToolEntry[]
}

export function ToolsPage({ tools }: ToolsPageProps) {
  const [filterCategory, setFilterCategory] = useState<string | null>(null)
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false)
  const { isFavorite, toggleFavorite } = useFavorites()

  const categories = useMemo(() => {
    const cats = new Set(tools.map((t) => t.category || 'other'))
    return Array.from(cats).sort()
  }, [tools])

  const filteredTools = useMemo(() => {
    return tools.filter((tool) => {
      const matchesCategory = !filterCategory || tool.category === filterCategory
      const matchesFavorite = !showFavoritesOnly || isFavorite(tool.name)
      return matchesCategory && matchesFavorite
    })
  }, [tools, filterCategory, showFavoritesOnly, isFavorite])

  return (
    <div className="flex-1 max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-black dark:text-white mb-2">
          Tools Catalog
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Explore all {tools.length} tools available in Claude Code
        </p>
      </div>

      {/* Filters */}
      <div className="mb-8 space-y-4">
        <div className="flex flex-wrap gap-2 items-center">
          <button
            onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
            className={`px-4 py-2 rounded-lg transition-colors ${
              showFavoritesOnly
                ? 'bg-gray-800 dark:bg-gray-200 text-white dark:text-black font-semibold'
                : 'bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
            }`}
          >
            ⭐ Favorites Only
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilterCategory(null)}
            className={`px-3 py-2 rounded-lg transition-colors text-sm font-semibold ${
              filterCategory === null
                ? 'bg-black dark:bg-white text-white dark:text-black'
                : 'bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700'
            }`}
          >
            All Tools
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-3 py-2 rounded-lg transition-colors text-sm ${
                filterCategory === cat
                  ? 'bg-black dark:bg-white text-white dark:text-black font-semibold'
                  : 'bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700'
              }`}
            >
              {cat} ({tools.filter((t) => t.category === cat).length})
            </button>
          ))}
        </div>
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTools.map((tool) => (
          <ToolCard
            key={tool.name}
            tool={tool}
            onFavorite={(t) => toggleFavorite(t.name)}
            isFavorited={isFavorite(tool.name)}
          />
        ))}
      </div>

      {filteredTools.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-400">
            No tools match your filters
          </p>
        </div>
      )}
    </div>
  )
}
