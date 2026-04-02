import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface HeroSectionProps {
  onNavigate: (page: string) => void
  toolCount: number
  commandCount: number
  fileCount: number
}

function AnimatedCounter({ target, suffix = '', duration = 2000 }: { target: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setInView(true), 300)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!inView) return
    const steps = 60
    const increment = target / steps
    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, duration / steps)
    return () => clearInterval(timer)
  }, [target, inView, duration])

  return <span>{count}{suffix}</span>
}

export function HeroSection({ onNavigate, toolCount, commandCount, fileCount }: HeroSectionProps) {
  const [loc, setLoc] = useState(0)

  useEffect(() => {
    const el = document.getElementById('loc')
    if (!el) return
    const observer = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setLoc(Math.floor(fileCount * 100))
    }, { threshold: 0.3 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [fileCount])

  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
      {/* Drifting grid background */}
      <div className="absolute inset-0 opacity-[0.04]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'linear-gradient(rgba(212,168,83,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(212,168,83,0.3) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
            animation: 'drift 20s linear infinite',
          }}
        />
      </div>

      {/* Hero content */}
      <motion.div
        className="relative z-10 text-center max-w-4xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <h1 className="font-heading text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold text-[#e8e4df] tracking-tight leading-[1.1]">
          Claude Code{' '}
          <span className="text-[#d4a853]">Unpacked</span>
        </h1>

        {/* Badges */}
        <div className="mt-3 sm:mt-4 flex flex-wrap justify-center gap-2 sm:gap-3">
          <motion.a
            href="https://news.ycombinator.com/item?id=47597085"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full border border-[#ff6600]/30 bg-[#ff6600]/5 text-xs sm:text-sm text-[#ff6600] hover:bg-[#ff6600]/10 hover:border-[#ff6600]/50 transition-all duration-200"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.75, duration: 0.5 }}
          >
            <svg width="14" height="14" viewBox="0 0 16 16" className="flex-shrink-0">
              <rect width="16" height="16" rx="2" fill="#ff6600" />
              <text x="8" y="12" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold" fontFamily="sans-serif">Y</text>
            </svg>
            Featured on Hacker News
          </motion.a>
        </div>

        <p className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl text-[#8a8580] max-w-2xl mx-auto font-body leading-relaxed">
          What actually happens when you type a message into Claude Code?{' '}
          <span className="text-[#e8e4df]">The agent loop, 50+ tools, multi-agent orchestration, and unreleased features</span>, mapped straight from the source.
        </p>
      </motion.div>

      {/* Stats */}
      <motion.div
        className="relative z-10 mt-10 sm:mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 md:gap-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
      >
        <div className="text-center">
          <div className="font-heading text-3xl sm:text-4xl md:text-6xl font-bold text-[#d4a853] tabular-nums">
            <AnimatedCounter target={fileCount} suffix="+" />
          </div>
          <div className="mt-1.5 sm:mt-2 text-[11px] sm:text-sm text-[#8a8580] uppercase tracking-wider font-heading">Files</div>
        </div>
        <div className="text-center">
          <div id="loc" className="font-heading text-3xl sm:text-4xl md:text-6xl font-bold text-[#d4a853] tabular-nums">
            <AnimatedCounter target={loc} suffix="K+" />
          </div>
          <div className="mt-1.5 sm:mt-2 text-[11px] sm:text-sm text-[#8a8580] uppercase tracking-wider font-heading">Lines of Code</div>
        </div>
        <div className="text-center">
          <div className="font-heading text-3xl sm:text-4xl md:text-6xl font-bold text-[#d4a853] tabular-nums">
            <AnimatedCounter target={toolCount} suffix="+" />
          </div>
          <div className="mt-1.5 sm:mt-2 text-[11px] sm:text-sm text-[#8a8580] uppercase tracking-wider font-heading">Tools</div>
        </div>
        <div className="text-center">
          <div className="font-heading text-3xl sm:text-4xl md:text-6xl font-bold text-[#d4a853] tabular-nums">
            <AnimatedCounter target={commandCount} suffix="+" />
          </div>
          <div className="mt-1.5 sm:mt-2 text-[11px] sm:text-sm text-[#8a8580] uppercase tracking-wider font-heading">Commands</div>
        </div>
      </motion.div>

      {/* CTA */}
      <motion.button
        onClick={() => onNavigate('agent-loop')}
        className="relative z-10 mt-12 sm:mt-20 inline-flex items-center gap-2 px-6 py-3 border border-[#d4a853]/40 text-[#d4a853] rounded-full font-heading text-sm uppercase tracking-wider hover:bg-[#d4a853]/10 transition-colors duration-200"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        Start exploring <span className="text-lg">↓</span>
      </motion.button>
    </section>
  )
}
