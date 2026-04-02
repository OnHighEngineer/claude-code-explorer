import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const SECTIONS = [
  { id: 'agent-loop', num: '01', label: 'The Agent Loop' },
  { id: 'architecture', num: '02', label: 'Architecture' },
  { id: 'tools', num: '03', label: 'Tool System' },
  { id: 'commands', num: '04', label: 'Commands' },
  { id: 'hidden-features', num: '05', label: 'Hidden Features' },
]

interface SectionNavProps {
  activeSection: string | null
  heroVisible: boolean
  onNavigate: (id: string) => void
}

export function SectionNav({ activeSection, heroVisible, onNavigate }: SectionNavProps) {
  const [expanded, setExpanded] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false)
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])

  if (heroVisible) return null

  return (
    <>
      {/* Desktop nav */}
      <div
        className="hidden md:flex fixed left-4 top-1/2 -translate-y-1/2 z-40 flex-col gap-1 bg-[#0d0d0d]/90 backdrop-blur-sm border border-[#2a2520] rounded-full p-2"
        style={{ width: expanded ? 'auto' : 48 }}
        onMouseEnter={() => setExpanded(true)}
        onMouseLeave={() => setExpanded(false)}
      >
        {SECTIONS.map((section) => {
          const isActive = activeSection === section.id
          return (
            <button
              key={section.id}
              onClick={() => onNavigate(section.id)}
              className="relative flex items-center gap-3 px-3 py-2 rounded-full transition-colors duration-150 hover:bg-white/5 whitespace-nowrap"
              style={isActive ? { background: 'rgba(212,168,83,0.1)' } : {}}
            >
              <span className={`font-heading text-xs font-bold tabular-nums ${isActive ? 'text-[#d4a853]' : 'text-[#8a8580]'}`}>
                {section.num}
              </span>
              <AnimatePresence>
                {expanded && (
                  <motion.span
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: 'auto' }}
                    exit={{ opacity: 0, width: 0 }}
                    transition={{ duration: 0.15, ease: 'easeOut' }}
                    className={`font-heading text-xs overflow-hidden ${isActive ? 'text-[#d4a853]' : 'text-[#8a8580]'}`}
                  >
                    {section.label}
                  </motion.span>
                )}
              </AnimatePresence>
              {isActive && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute left-0.5 top-1/2 -translate-y-1/2 w-0.5 rounded-full bg-[#d4a853]"
                  style={{ height: 16 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          )
        })}
      </div>

      {/* Mobile FAB */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="md:hidden fixed bottom-5 right-5 z-40 flex items-center gap-2 px-4 py-3 bg-[#0d0d0d]/90 backdrop-blur-sm border border-[#2a2520] rounded-full text-[#e8e4df] font-heading text-xs uppercase tracking-wider"
        onClick={() => setMobileOpen(true)}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <rect y="2" width="16" height="1.5" rx="0.75" />
          <rect y="7.25" width="16" height="1.5" rx="0.75" />
          <rect y="12.5" width="16" height="1.5" rx="0.75" />
        </svg>
        Sections
      </motion.button>

      {/* Mobile bottom sheet */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#0d0d0d] border-t border-[#2a2520] rounded-t-2xl"
            >
              <div className="flex justify-center pt-3 pb-2">
                <div className="w-10 h-1 rounded-full bg-[#2a2520]" />
              </div>
              <div className="px-6 pb-8">
                {SECTIONS.map((section) => {
                  const isActive = activeSection === section.id
                  return (
                    <button
                      key={section.id}
                      onClick={() => {
                        onNavigate(section.id)
                        setMobileOpen(false)
                      }}
                      className={`w-full flex items-center gap-4 py-4 border-b border-[#2a2520]/50 transition-colors ${
                        isActive ? 'text-[#d4a853]' : 'text-[#8a8580]'
                      }`}
                    >
                      <span className="font-heading text-sm font-bold">{section.num}</span>
                      <span className="font-heading text-sm">{section.label}</span>
                    </button>
                  )
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
