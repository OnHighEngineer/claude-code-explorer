import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'

interface ArchitectureExplorerProps {
  onNavigate: (page: string) => void
}

const categories = [
  {
    name: 'Tools & Commands',
    color: '#7B9EB8',
    dirs: [
      { name: 'tools', count: 184 },
      { name: 'commands', count: 189 },
      { name: 'skills', count: 20 },
    ],
  },
  {
    name: 'Core Processing',
    color: '#D4A853',
    dirs: [
      { name: 'core', count: 312 },
      { name: 'api', count: 156 },
      { name: 'session', count: 98 },
    ],
  },
  {
    name: 'UI Layer',
    color: '#6BA368',
    dirs: [
      { name: 'ink', count: 96 },
      { name: 'components', count: 389 },
      { name: 'ui', count: 124 },
    ],
  },
  {
    name: 'Infrastructure',
    color: '#C17B5E',
    dirs: [
      { name: 'services', count: 130 },
      { name: 'bridge', count: 31 },
      { name: 'config', count: 45 },
    ],
  },
  {
    name: 'Support & Utilities',
    color: '#B8A9C9',
    dirs: [
      { name: 'utils', count: 564 },
      { name: 'hooks', count: 104 },
      { name: 'constants', count: 21 },
    ],
  },
  {
    name: 'Personality & UX',
    color: '#9BBEC7',
    dirs: [
      { name: 'prompts', count: 67 },
      { name: 'themes', count: 18 },
      { name: 'buddy', count: 24 },
    ],
  },
]

function CategoryCard({ category, expanded, onToggle }: { category: typeof categories[0]; expanded: boolean; onToggle: () => void }) {
  return (
    <motion.button
      onClick={onToggle}
      className="card-surface p-5 text-left w-full card-hover"
      whileHover={{ filter: 'brightness(1.1)' }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: category.color }} />
        <ChevronRight className={`w-4 h-4 text-[#8a8580] transition-transform duration-200 ${expanded ? 'rotate-90' : ''}`} />
      </div>
      <h3 className="text-sm font-heading font-semibold text-[#e8e4df] mb-2">{category.name}</h3>
      <div className="space-y-1">
        {category.dirs.map(dir => (
          <div key={dir.name} className="flex items-center justify-between text-xs">
            <span className="font-mono text-[#8a8580]">{dir.name}</span>
            <span className="text-[#8a8580] bg-[#2a2520] px-1.5 py-0.5 rounded">{dir.count} files</span>
          </div>
        ))}
      </div>
    </motion.button>
  )
}

export function ArchitectureExplorer({ onNavigate }: ArchitectureExplorerProps) {
  const [expanded, setExpanded] = useState<string | null>(null)

  return (
    <section id="architecture" className="py-20">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="text-sm font-mono text-[#d4a853] mb-4 block">02</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            <span className="text-[#e8e4df]">Architecture Explorer</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-[#8a8580] max-w-2xl mx-auto font-body">
            Click around the source tree to explore what's inside.
          </p>
        </div>

        {/* Category grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {categories.map(cat => (
            <CategoryCard
              key={cat.name}
              category={cat}
              expanded={expanded === cat.name}
              onToggle={() => setExpanded(expanded === cat.name ? null : cat.name)}
            />
          ))}
        </div>

        {/* Expanded detail */}
        {expanded && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="card-surface p-6 glow-accent"
          >
            {(() => {
              const cat = categories.find(c => c.name === expanded)
              if (!cat) return null
              return (
                <>
                  <h3 className="text-lg font-heading font-semibold text-[#e8e4df] mb-4 flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }} />
                    {cat.name}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {cat.dirs.map(dir => (
                      <div key={dir.name} className="bg-[#0d0d0d] rounded-lg p-4 border border-[#2a2520]">
                        <div className="font-mono text-sm text-[#7b9eb8] mb-1">{dir.name}/</div>
                        <div className="text-xs text-[#8a8580]">{dir.count} files</div>
                      </div>
                    ))}
                  </div>
                </>
              )
            })()}
          </motion.div>
        )}

        {/* CTA */}
        <div className="text-center mt-8">
          <button onClick={() => onNavigate('architecture')} className="btn-secondary">
            <span>Full architecture</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  )
}
