import React, { useState, useEffect, useRef } from 'react'
import { Search, X, Command } from 'lucide-react'

interface SearchBoxProps {
  placeholder?: string
  onSearch: (query: string) => void
  results?: Array<{ name: string; description?: string; type?: string }>
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
  const [isFocused, setIsFocused] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        inputRef.current?.focus()
      }
      if (e.key === 'Escape') {
        setShowResults(false)
        inputRef.current?.blur()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

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
    setQuery('')
  }

  const getTypeIcon = (type?: string) => {
    switch (type) {
      case 'tool': return '🔧'
      case 'command': return '⌘'
      case 'file': return '📄'
      case 'screen': return '🖥️'
      case 'component': return '🧩'
      case 'service': return '⚙️'
      default: return '•'
    }
  }

  return (
    <div className="relative flex-1 max-w-xl">
      <div className={`relative bg-[#1a1a1a]/80 backdrop-blur-xl border border-[#2a2520] rounded-2xl transition-all duration-300 ${isFocused ? 'ring-2 ring-[#d4a853]/50 glow-accent' : ''}`}>
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8a8580]" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleInputChange}
          onFocus={() => { setIsFocused(true); setShowResults(true) }}
          onBlur={() => { setIsFocused(false); setTimeout(() => setShowResults(false), 200) }}
          placeholder={placeholder}
          className="w-full pl-12 pr-20 py-3 bg-transparent text-[#e8e4df] placeholder-[#8a8580] focus:outline-none"
        />
        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
          {query && (
            <button
              onClick={handleClear}
              className="text-[#8a8580] hover:text-[#e8e4df] transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden md:inline-flex items-center gap-1 px-2 py-1 rounded bg-white/10 text-xs text-[#8a8580]">
            <Command className="w-3 h-3" />K
          </kbd>
        </div>
      </div>

      {showResults && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-[#1a1a1a]/90 backdrop-blur-xl border border-[#2a2520] rounded-2xl z-50 animate-in">
          <div className="max-h-80 overflow-y-auto scrollbar-thin">
            {results.map((result, idx) => (
              <button
                key={idx}
                onClick={() => handleSelectResult(result)}
                className="w-full text-left px-4 py-3 hover:bg-white/10 transition-all border-b border-[#2a2520]/50 last:border-b-0 flex items-start gap-3"
              >
                <span className="text-lg mt-0.5">{getTypeIcon(result.type)}</span>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-[#e8e4df] truncate">
                    {result.name}
                  </div>
                  {result.description && (
                    <div className="text-sm text-[#8a8580] truncate">
                      {result.description}
                    </div>
                  )}
                </div>
                {result.type && (
                  <span className="text-xs bg-white/10 px-2 py-1 rounded text-[#8a8580] capitalize">
                    {result.type}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
