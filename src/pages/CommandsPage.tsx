import React, { useMemo, useState } from 'react'
import type { CommandEntry } from '@/types'
import { ExternalLink } from 'lucide-react'

interface CommandsPageProps {
  commands: CommandEntry[]
}

export function CommandsPage({ commands }: CommandsPageProps) {
  const [filterCategory, setFilterCategory] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  const categories = useMemo(() => {
    const cats = new Set(commands.map((c) => c.category || 'other'))
    return Array.from(cats).sort()
  }, [commands])

  const filteredCommands = useMemo(() => {
    return commands.filter((cmd) => {
      const matchesCategory = !filterCategory || cmd.category === filterCategory
      const matchesSearch =
        !searchQuery ||
        cmd.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cmd.description.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesCategory && matchesSearch
    })
  }, [commands, filterCategory, searchQuery])

  return (
    <div className="flex-1 max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
          Commands Registry
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          All {commands.length} slash commands available in Claude Code
        </p>
      </div>

      {/* Search and Filter */}
      <div className="mb-8 space-y-4">
        <input
          type="text"
          placeholder="Search commands..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilterCategory(null)}
            className={`px-3 py-2 rounded-lg transition-colors text-sm ${
              filterCategory === null
                ? 'bg-black dark:bg-white text-white'
                : 'bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700'
            }`}
          >
            All Commands
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-3 py-2 rounded-lg transition-colors text-sm ${
                filterCategory === cat
                  ? 'bg-black dark:bg-white text-white'
                  : 'bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700'
              }`}
            >
              {cat} ({commands.filter((c) => c.category === cat).length})
            </button>
          ))}
        </div>
      </div>

      {/* Commands Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                  Command
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                  Source
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredCommands.map((cmd, idx) => (
                <tr
                  key={idx}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <td className="px-6 py-4">
                    <code className="text-sm font-semibold text-gray-700 dark:text-gray-300 dark:text-gray-300">
                      /{cmd.name}
                    </code>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      {cmd.description}
                    </p>
                    {cmd.aliases && cmd.aliases.length > 0 && (
                      <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                        Aliases: {cmd.aliases.join(', ')}
                      </p>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-block px-3 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full">
                      {cmd.category || 'other'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {cmd.file && (
                      <a
                        href={`https://github.com/OnHighEngineer/claude-code/blob/main/${cmd.file}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-700 dark:text-gray-300 dark:text-gray-300 hover:underline flex items-center gap-1 text-sm"
                      >
                        View
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredCommands.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-400">
            No commands match your search
          </p>
        </div>
      )}
    </div>
  )
}
