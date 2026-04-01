import { useState, useEffect } from 'react'

const FAVORITES_KEY = 'claude-code-explorer-favorites'

export function useFavorites() {
  const [favorites, setFavorites] = useState<Set<string>>(new Set())

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(FAVORITES_KEY)
      if (stored) {
        setFavorites(new Set(JSON.parse(stored)))
      }
    } catch (err) {
      console.error('Error loading favorites:', err)
    }
  }, [])

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => {
      const updated = new Set(prev)
      if (updated.has(id)) {
        updated.delete(id)
      } else {
        updated.add(id)
      }
      // Save to localStorage
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(Array.from(updated)))
      return updated
    })
  }

  const isFavorite = (id: string) => favorites.has(id)

  return { favorites, toggleFavorite, isFavorite }
}
