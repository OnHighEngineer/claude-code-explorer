import React, { useState, useEffect, useRef } from 'react'
import { Search, X } from 'lucide-react'

interface SearchBoxProps {
  placeholder?: string
  onSearch: (query: string) => void
  results?: Array<{ name: string; description?: string }>
  onSelectResult?: (result: any) => void
}

export function SearchBox({
  placeholder = 'Search tools, commands, files...',
  onSearch,
  results = [],
  onSelectResult,
}: SearchBoxProps) {
  const [query, setQuery] = useState('')
  const [showResults, setShowResults] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setQuery(value)
    onSearch(value)
    setShowResults(true)
  }

  const handleClear = () => {
    setQuery('')
    onSearch('')
    setShowResults(false)
    inputRef.current?.focus()
  }

  const handleSelectResult = (result: any) => {
    onSelectResult?.(result)
    setShowResults(false)
  }

  return (
    <div className="relative flex-1 max-w-xl">
      <div className="relative">
        <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder={placeholder}
          className="w-full pl-10 pr-10 py-2 bg-white dark:bg-black border border-gray-300 dark:border-gray-700 rounded-lg text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 dark:focus:ring-gray-600"
        />
        {query && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {showResults && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-black border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg z-10">
          <div className="max-h-80 overflow-y-auto">
            {results.map((result, idx) => (
              <button
                key={idx}
                onClick={() => handleSelectResult(result)}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-900 border-b border-gray-200 dark:border-gray-800 last:border-b-0"
              >
                <div className="font-medium text-black dark:text-white">
                  {result.name}
                </div>
                {result.description && (
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {result.description}
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
