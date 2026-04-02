import { useState, useEffect, useCallback } from 'react'

const SECTIONS = ['agent-loop', 'architecture', 'tools', 'commands', 'hidden-features']

export function useSectionTracking() {
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const [heroVisible, setHeroVisible] = useState(true)

  const trackSection = useCallback((sectionId: string) => {
    const el = document.getElementById(sectionId)
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActiveSection(sectionId)
        }
      },
      {
        threshold: 0.15,
        rootMargin: '-10% 0px -60% 0px',
      }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const cleanups = SECTIONS.map((id) => trackSection(id)).filter(Boolean)
    return () => cleanups.forEach((fn) => fn!())
  }, [trackSection])

  useEffect(() => {
    const hero = document.getElementById('hero')
    if (!hero) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setHeroVisible(entry.isIntersecting)
      },
      { threshold: 0 }
    )

    observer.observe(hero)
    return () => observer.disconnect()
  }, [])

  const scrollToSection = useCallback((sectionId: string) => {
    const el = document.getElementById(sectionId)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [])

  return { activeSection, heroVisible, scrollToSection }
}
