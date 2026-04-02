import { useState } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, Zap, Brain, Users, Smartphone, Server, Network, Moon } from 'lucide-react'

const features = [
  {
    id: 'buddy',
    title: 'Buddy',
    icon: Sparkles,
    color: '#C17B5E',
    description: 'A virtual pet that lives in your terminal. Species and rarity are derived from your account ID.',
    details: 'An easter egg feature that assigns each user a unique buddy based on their account hash. Different species have different animations and behaviors.',
    status: 'Feature-flagged',
  },
  {
    id: 'kairos',
    title: 'Kairos',
    icon: Brain,
    color: '#9B7CB8',
    description: 'Persistent mode with memory consolidation between sessions and autonomous background actions.',
    details: 'Enables Claude to remember context across sessions, consolidate learnings, and perform autonomous tasks in the background.',
    status: 'Experimental',
  },
  {
    id: 'ultraplan',
    title: 'UltraPlan',
    icon: Zap,
    color: '#7B9EB8',
    description: 'Long planning sessions on Opus-class models, up to 30-minute execution windows.',
    details: 'Extended reasoning mode using Claude Opus for complex multi-step tasks that require deep planning and execution.',
    status: 'Gated',
  },
  {
    id: 'coordinator',
    title: 'Coordinator Mode',
    icon: Users,
    color: '#6BA368',
    description: 'A lead agent breaks tasks apart, spawns parallel workers in isolated git worktrees, collects results.',
    details: 'Multi-agent orchestration where a coordinator delegates subtasks to worker agents running in parallel.',
    status: 'Experimental',
  },
  {
    id: 'bridge',
    title: 'Bridge',
    icon: Smartphone,
    color: '#D4A853',
    description: 'Control Claude Code from your phone or a browser. Full remote session with permission approvals.',
    details: 'Remote access to Claude Code sessions via web interface, with real-time sync and permission management.',
    status: 'Feature-flagged',
  },
  {
    id: 'daemon',
    title: 'Daemon Mode',
    icon: Server,
    color: '#9BBEC7',
    description: 'Run sessions in the background with --bg. Uses tmux under the hood.',
    details: 'Background session management using tmux for persistent execution detached from the terminal.',
    status: 'In development',
  },
  {
    id: 'uds',
    title: 'UDS Inbox',
    icon: Network,
    color: '#B8A9C9',
    description: 'Sessions talk to each other over Unix domain sockets.',
    details: 'Inter-process communication between Claude Code instances using Unix domain sockets for data sharing.',
    status: 'Experimental',
  },
  {
    id: 'autodream',
    title: 'Auto-Dream',
    icon: Moon,
    color: '#A0856E',
    description: 'Between sessions, the AI reviews what happened and organizes what it learned.',
    details: 'Autonomous reflection and knowledge consolidation between coding sessions for improved future performance.',
    status: 'Experimental',
  },
]

export function HiddenFeatures({ onNavigate: _onNavigate }: { onNavigate: (page: string) => void }) {
  const [selectedFeature, setSelectedFeature] = useState<typeof features[0] | null>(null)

  return (
    <section id="hidden-features" className="py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-sm font-mono text-[#d4a853] mb-4 block">05</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            <span className="text-[#e8e4df]">Hidden Features</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-[#8a8580] max-w-2xl mx-auto font-body">
            Stuff that's in the code but not shipped yet. Feature-flagged, env-gated, or just commented out.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {features.map(feature => {
            const Icon = feature.icon
            return (
              <motion.button
                key={feature.id}
                onClick={() => setSelectedFeature(feature)}
                className="card-surface p-5 text-left w-full card-hover"
                whileHover={{ filter: 'brightness(1.1)' }}
                transition={{ duration: 0.2 }}
              >
                <Icon className="w-7 h-7 mb-3" style={{ color: feature.color }} />
                <h3 className="text-sm font-heading font-semibold text-[#e8e4df] mb-2">{feature.title}</h3>
                <p className="text-xs text-[#8a8580] font-body mb-3 leading-relaxed">{feature.description}</p>
                <span
                  className="text-[10px] font-mono px-2 py-0.5 rounded"
                  style={{ backgroundColor: feature.color + '15', color: feature.color }}
                >
                  {feature.status}
                </span>
              </motion.button>
            )
          })}
        </div>

        <p className="text-center text-sm text-[#8a8580] font-body mb-8">
          Click a feature to explore
        </p>

        {selectedFeature && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="card-surface p-6 sm:p-8"
          >
            <div className="flex items-start gap-4 mb-6">
              <selectedFeature.icon className="w-8 h-8 sm:w-10 sm:h-10 flex-shrink-0" style={{ color: selectedFeature.color }} />
              <div>
                <h3 className="text-lg sm:text-xl font-heading font-bold text-[#e8e4df] mb-1">{selectedFeature.title}</h3>
                <span
                  className="text-xs font-mono px-2.5 py-1 rounded"
                  style={{ backgroundColor: selectedFeature.color + '15', color: selectedFeature.color }}
                >
                  {selectedFeature.status}
                </span>
              </div>
            </div>
            <p className="text-[#e8e4df] font-body text-sm sm:text-base mb-4 leading-relaxed">{selectedFeature.description}</p>
            <div className="bg-[#0d0d0d] rounded-xl p-4 border border-[#2a2520]">
              <p className="text-xs sm:text-sm text-[#8a8580] font-body leading-relaxed">{selectedFeature.details}</p>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
}
