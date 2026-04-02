import { useState, useEffect, useCallback } from 'react'
import type { ComponentType } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface AgentLoopProps {
  onNavigate: (page: string) => void
}

const steps = [
  { num: 1, title: 'Input', desc: 'User types a message or pipes input through stdin' },
  { num: 2, title: 'Message', desc: 'Input is parsed and structured into a message object' },
  { num: 3, title: 'History', desc: 'Previous conversation context is loaded and trimmed' },
  { num: 4, title: 'System', desc: 'System prompt and configuration are assembled' },
  { num: 5, title: 'API', desc: 'Request is sent to Claude API with all context' },
  { num: 6, title: 'Tokens', desc: 'Response streams back token by token' },
  { num: 7, title: 'Tools?', desc: 'Check if Claude wants to call a tool' },
  { num: 8, title: 'Loop', desc: 'Tool results feed back into the conversation' },
  { num: 9, title: 'Render', desc: 'Final response is rendered in the terminal' },
  { num: 10, title: 'Hooks', desc: 'Post-response hooks fire for analytics and logging' },
  { num: 11, title: 'Await', desc: 'System waits for next user input' },
]

const SPEEDS = [0.5, 1, 2]

function TypingSimulation({ speed }: { speed: number }) {
  const [text, setText] = useState('')
  const full = 'Fix the bug in auth.ts line 42'
  useEffect(() => {
    setText('')
    let i = 0
    const t = setInterval(() => {
      if (i < full.length) { setText(full.slice(0, i + 1)); i++ }
      else clearInterval(t)
    }, 80 / speed)
    return () => clearInterval(t)
  }, [speed])
  return (
    <div className="font-mono text-sm bg-[#0d0d0d] rounded-lg p-4 border border-[#2a2520]">
      <span className="text-[#d4a853]">$ </span>
      <span className="text-[#e8e4df]">{text}</span>
      <span className="animate-blink text-[#d4a853]">▊</span>
    </div>
  )
}

function MessageCreationMorph({ speed }: { speed: number }) {
  const [phase, setPhase] = useState<'text' | 'wrapping' | 'json'>('text')
  useEffect(() => {
    setPhase('text')
    const t1 = setTimeout(() => setPhase('wrapping'), 800 / speed)
    const t2 = setTimeout(() => setPhase('json'), 1600 / speed)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [speed])
  return (
    <div className="font-mono text-sm bg-[#0d0d0d] rounded-lg p-4 border border-[#2a2520] min-h-[80px] flex items-center justify-center">
      <AnimatePresence mode="wait">
        {phase === 'text' && (
          <motion.p key="text" initial={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-[#e8e4df]">
            Fix the bug in auth.ts line 42
          </motion.p>
        )}
        {phase === 'wrapping' && (
          <motion.p key="wrap" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-[#8a8580]">
            wrapping...
          </motion.p>
        )}
        {phase === 'json' && (
          <motion.pre key="json" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-[#7b9eb8] text-xs">
{`{
  "role": "user",
  "content": "Fix the bug...",
  "timestamp": 1719000000
}`}
          </motion.pre>
        )}
      </AnimatePresence>
    </div>
  )
}

function HistoryAppendViz() {
  return (
    <div className="space-y-2">
      {['System prompt', 'Previous: "Show me the code"', 'New: "Fix the bug..."'].map((msg, i) => (
        <motion.div
          key={msg}
          initial={{ opacity: 0, x: i === 2 ? 80 : 0, y: i < 2 ? -8 : 0 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ delay: i * 0.2, type: 'spring', stiffness: 300, damping: 25 }}
          className={`font-mono text-xs p-3 rounded-lg border ${i === 2 ? 'border-[#d4a853]/40 bg-[#d4a853]/5 text-[#d4a853]' : 'border-[#2a2520] bg-[#1a1a1a] text-[#8a8580]'}`}
        >
          {msg}
        </motion.div>
      ))}
    </div>
  )
}

function SystemPromptAssembly() {
  const cards = [
    { label: 'CLAUDE.md', color: '#7b9eb8' },
    { label: 'Tools', color: '#d4a853' },
    { label: 'Memory', color: '#6ba368' },
    { label: 'Context', color: '#c17b5e' },
  ]
  const [merged, setMerged] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setMerged(true), 1200)
    return () => clearTimeout(t)
  }, [])
  return (
    <div className="relative min-h-[120px]">
      <AnimatePresence>
        {!merged ? (
          cards.map((card, i) => {
            const origins = [
              { x: -60, y: -40 },
              { x: 60, y: -40 },
              { x: -60, y: 40 },
              { x: 60, y: 40 },
            ]
            return (
              <motion.div
                key={card.label}
                initial={{ opacity: 0, x: origins[i].x, y: origins[i].y }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ delay: i * 0.15, type: 'spring', stiffness: 200, damping: 20 }}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-mono text-xs px-3 py-2 rounded-lg border"
                style={{ borderColor: card.color + '40', backgroundColor: card.color + '10', color: card.color }}
              >
                {card.label}
              </motion.div>
            )
          })
        ) : (
          <motion.div
            key="merged"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="font-mono text-xs px-4 py-3 rounded-lg border border-[#d4a853]/40 bg-[#d4a853]/5 text-[#d4a853] text-center"
          >
            System Prompt (assembled)
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function ApiStreamingViz({ speed }: { speed: number }) {
  const [dots, setDots] = useState(0)
  useEffect(() => {
    setDots(0)
    const t = setInterval(() => setDots(d => Math.min(d + 1, 5)), 400 / speed)
    return () => clearInterval(t)
  }, [speed])
  return (
    <div className="flex items-center justify-between font-mono text-xs">
      <div className="px-3 py-2 rounded-lg border border-[#2a2520] bg-[#1a1a1a] text-[#8a8580]">Your Machine</div>
      <div className="flex-1 mx-4 relative h-8 flex items-center">
        <div className="absolute inset-x-0 top-1/2 h-px border-t border-dashed border-[#2a2520]" />
        <motion.div className="absolute w-2 h-2 rounded-full bg-[#d4a853]" style={{ animation: `dot-travel-right ${1.5 / speed}s ease-in-out infinite` }} />
        <motion.div className="absolute w-2 h-2 rounded-full bg-[#6ba368]" style={{ animation: `dot-travel-left ${1.5 / speed}s ease-in-out infinite`, animationDelay: `${0.75 / speed}s` }} />
      </div>
      <div className="px-3 py-2 rounded-lg border border-[#2a2520] bg-[#1a1a1a] text-[#8a8580]">Claude API</div>
      <div className="ml-4 space-y-1">
        {Array.from({ length: dots }).map((_, i) => (
          <motion.div key={i} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="text-[#7b9eb8]">
            data: {`{"token":"tok_${i}"}`}
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function TokenParsingViz() {
  const tokens = ['Fix', 'ing', ' the', ' auth', ' handler', '...', '\n', 'Done', '.']
  const [idx, setIdx] = useState(0)
  useEffect(() => {
    setIdx(0)
    const t = setInterval(() => setIdx(i => Math.min(i + 1, tokens.length)), 200)
    return () => clearInterval(t)
  }, [])
  return (
    <div className="space-y-3">
      <div className="font-mono text-xs text-[#8a8580]">
        {tokens.map((t, i) => (
          <motion.span key={i} initial={{ opacity: 0 }} animate={{ opacity: i < idx ? 1 : 0 }} className={i < idx ? 'text-[#7b9eb8]' : ''}>
            {t}
          </motion.span>
        ))}
      </div>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: idx > 3 ? 1 : 0, y: 0 }} className="font-mono text-xs text-[#e8e4df] bg-[#0d0d0d] p-3 rounded-lg border border-[#2a2520]">
        Fixing the auth handler... Done.
      </motion.div>
    </div>
  )
}

function ToolDetectionViz() {
  const [active, setActive] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setActive(true), 800)
    return () => clearTimeout(t)
  }, [])
  return (
    <motion.div
      className="font-mono text-xs p-4 rounded-lg border bg-[#0d0d0d]"
      animate={{ borderColor: active ? '#d4a853' : '#2a2520', boxShadow: active ? '0 0 12px rgba(212,168,83,0.2)' : 'none' }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-[#8a8580] mb-2">Response block:</div>
      <div className={active ? 'text-[#d4a853]' : 'text-[#7b9eb8]'}>
        {active ? 'tool_use: Bash(command="npm test")' : 'text: Let me run the tests...'}
      </div>
    </motion.div>
  )
}

function ToolExecutionViz() {
  const [iteration, setIteration] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setIteration(i => (i + 1) % 4), 1500)
    return () => clearInterval(t)
  }, [])
  return (
    <div className="space-y-3">
      <div className="font-mono text-xs p-3 rounded-lg border border-[#2a2520] bg-[#0d0d0d] text-[#7b9eb8]">
        $ npm test<br />✓ 42 tests passed
      </div>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        key={iteration}
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#d4a853]/40 bg-[#d4a853]/5 text-[#d4a853] text-xs font-mono"
      >
        Loop back to API (iteration {iteration + 1})
      </motion.div>
    </div>
  )
}

function ResponseRenderingViz() {
  const lines = ['## Summary', '', 'All 42 tests passed.', 'No issues found in auth.ts.', '', '```\nauth.ts:42 — fixed\n```']
  const [count, setCount] = useState(0)
  useEffect(() => {
    setCount(0)
    const t = setInterval(() => setCount(c => Math.min(c + 1, lines.length)), 300)
    return () => clearInterval(t)
  }, [])
  return (
    <div className="font-mono text-xs bg-[#0d0d0d] rounded-lg p-4 border border-[#2a2520]">
      {lines.slice(0, count).map((line, i) => (
        <motion.div key={i} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className={line.startsWith('##') ? 'text-[#d4a853] font-bold' : line.startsWith('```') ? 'text-[#7b9eb8]' : 'text-[#e8e4df]'}>
          {line || '\u00A0'}
        </motion.div>
      ))}
    </div>
  )
}

function PostSamplingHooksViz() {
  const hooks = [
    { label: 'Auto-compact', color: '#7b9eb8' },
    { label: 'Memory update', color: '#d4a853' },
    { label: 'Dream mode', color: '#c17b5e' },
  ]
  const [active, setActive] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setActive(a => (a + 1) % 3), 1200)
    return () => clearInterval(t)
  }, [])
  return (
    <div className="space-y-2">
      {hooks.map((hook, i) => (
        <motion.div
          key={hook.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.2 }}
          className={`font-mono text-xs px-4 py-2.5 rounded-lg border ${i === active ? 'animate-pulse-scale' : ''}`}
          style={{ borderColor: hook.color + '40', backgroundColor: hook.color + '10', color: hook.color }}
        >
          {hook.label}
        </motion.div>
      ))}
    </div>
  )
}

function AwaitNextInputViz() {
  return (
    <div className="font-mono text-sm bg-[#0d0d0d] rounded-lg p-4 border border-[#2a2520]">
      <span className="text-[#d4a853]">❯ </span>
      <span className="animate-blink text-[#d4a853]">▊</span>
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mt-2 text-[#8a8580] text-xs">
        Waiting for next message...
      </motion.p>
    </div>
  )
}

const vizComponents = [
  TypingSimulation,
  MessageCreationMorph,
  HistoryAppendViz,
  SystemPromptAssembly,
  ApiStreamingViz,
  TokenParsingViz,
  ToolDetectionViz,
  ToolExecutionViz,
  ResponseRenderingViz,
  PostSamplingHooksViz,
  AwaitNextInputViz,
]

export function AgentLoop({ onNavigate }: AgentLoopProps) {
  const [activeStep, setActiveStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [speed, setSpeed] = useState(1)

  const handleNext = useCallback(() => setActiveStep(p => (p + 1) % steps.length), [])
  const handlePrev = useCallback(() => setActiveStep(p => (p - 1 + steps.length) % steps.length), [])

  useEffect(() => {
    if (!isPlaying) return
    const t = setInterval(handleNext, 3000 / speed)
    return () => clearInterval(t)
  }, [isPlaying, speed, handleNext])

  const Viz = vizComponents[activeStep] as ComponentType<{ speed?: number }>

  return (
    <section id="agent-loop" className="py-20">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="text-sm font-mono text-[#d4a853] mb-4 block">01</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            <span className="text-[#e8e4df]">The Agent Loop</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-[#8a8580] max-w-2xl mx-auto font-body">
            From keypress to rendered response, step by step through the source.
          </p>
        </div>

        {/* Pipeline visualization */}
        <div className="card-surface p-6 sm:p-8 glow-accent mb-8">
          {/* Step circles */}
          <div className="hidden md:flex items-center justify-between mb-8 relative">
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
              {steps.map((_, i) => {
                if (i === steps.length - 1) return null
                const x1 = `${((i + 0.5) / steps.length) * 100}%`
                const x2 = `${((i + 1.5) / steps.length) * 100}%`
                return (
                  <line
                    key={i}
                    x1={x1}
                    y1="50%"
                    x2={x2}
                    y2="50%"
                    stroke={i < activeStep ? 'rgba(212,168,83,0.7)' : '#2a2520'}
                    strokeWidth="2"
                  />
                )
              })}
              {activeStep === 7 && (
                <path
                  d={`M ${((8.5) / steps.length) * 100}% 60% Q ${((5) / steps.length) * 100}% 80% ${((1.5) / steps.length) * 100}% 60%`}
                  fill="none"
                  stroke="#d4a853"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                />
              )}
            </svg>
            {steps.map((step, i) => {
              const isCompleted = i < activeStep
              const isCurrent = i === activeStep
              return (
                <button
                  key={step.num}
                  onClick={() => setActiveStep(i)}
                  className="relative z-10 flex flex-col items-center"
                  style={{
                    boxShadow: isCurrent ? '0 0 8px rgba(212,168,83,0.4)' : 'none',
                  }}
                >
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center font-heading text-xs font-bold transition-all"
                    style={{
                      backgroundColor: isCurrent ? '#d4a853' : isCompleted ? 'rgba(212,168,83,0.7)' : '#2a2520',
                      color: isCurrent ? '#0d0d0d' : isCompleted ? '#0d0d0d' : '#8a8580',
                    }}
                  >
                    {step.num}
                  </div>
                  <span className={`mt-1.5 text-[10px] font-heading uppercase tracking-wider ${isCurrent ? 'text-[#d4a853]' : 'text-[#8a8580]'}`}>
                    {step.title.split(' ')[0]}
                  </span>
                </button>
              )
            })}
          </div>

          {/* Mobile step indicators */}
          <div className="md:hidden flex flex-wrap gap-2 mb-6 justify-center">
            {steps.map((step, i) => (
              <button
                key={step.num}
                onClick={() => setActiveStep(i)}
                className={`w-8 h-8 rounded-full flex items-center justify-center font-heading text-xs font-bold transition-all ${
                  i === activeStep ? 'bg-[#d4a853] text-[#0d0d0d]' : i < activeStep ? 'bg-[#d4a853]/70 text-[#0d0d0d]' : 'bg-[#2a2520] text-[#8a8580]'
                }`}
              >
                {step.num}
              </button>
            ))}
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <span className="font-heading text-4xl sm:text-6xl font-bold text-[#d4a853]">{activeStep + 1}</span>
              <span className="text-2xl text-[#8a8580]">/</span>
              <span className="text-2xl text-[#8a8580]">{steps.length}</span>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={handlePrev} className="p-2 rounded-lg bg-[#1a1a1a] hover:bg-[#2a2520] transition-colors text-[#8a8580] hover:text-[#e8e4df]" aria-label="Previous step">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M10 2L4 8l6 6" stroke="currentColor" strokeWidth="2" fill="none" /></svg>
              </button>
              <button onClick={() => setIsPlaying(!isPlaying)} className="p-2 rounded-lg bg-[#1a1a1a] hover:bg-[#d4a853]/10 hover:border-[#d4a853] border border-[#2a2520] transition-colors text-[#8a8580] hover:text-[#d4a853]" aria-label={isPlaying ? 'Pause' : 'Play'}>
                {isPlaying ? (
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><rect x="3" y="2" width="3.5" height="12" rx="1" /><rect x="9.5" y="2" width="3.5" height="12" rx="1" /></svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M4 2l10 6-10 6V2z" /></svg>
                )}
              </button>
              <button onClick={handleNext} className="p-2 rounded-lg bg-[#1a1a1a] hover:bg-[#2a2520] transition-colors text-[#8a8580] hover:text-[#e8e4df]" aria-label="Next step">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M6 2l6 6-6 6" stroke="currentColor" strokeWidth="2" fill="none" /></svg>
              </button>
              <button onClick={() => { setActiveStep(0); setIsPlaying(false) }} className="p-2 rounded-lg bg-[#1a1a1a] hover:bg-[#2a2520] transition-colors text-[#8a8580] hover:text-[#e8e4df]" aria-label="Reset">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 8a6 6 0 0 1 10.47-4M14 8a6 6 0 0 1-10.47 4" /><path d="M12 1v3h-3M4 15v-3h3" /></svg>
              </button>
            </div>
          </div>

          {/* Speed controls */}
          <div className="flex items-center gap-2 mb-6">
            <span className="text-xs text-[#8a8580] font-heading uppercase tracking-wider">Speed:</span>
            {SPEEDS.map(s => (
              <button
                key={s}
                onClick={() => setSpeed(s)}
                className={`px-2.5 py-1 rounded text-xs font-mono transition-colors ${speed === s ? 'bg-[#d4a853]/15 text-[#d4a853]' : 'text-[#8a8580] hover:text-[#e8e4df]'}`}
              >
                {s}x
              </button>
            ))}
          </div>

          {/* Step title and description */}
          <div className="mb-6">
            <h3 className="text-xl sm:text-2xl font-bold text-[#e8e4df] mb-2">{steps[activeStep].title}</h3>
            <p className="text-[#8a8580] font-body">{steps[activeStep].desc}</p>
          </div>

          {/* Animated visualization */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Viz speed={speed} />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* CTA */}
        <div className="text-center">
          <button onClick={() => onNavigate('flow')} className="btn-secondary">
            <span>Explore in detail</span>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><path d="M6 2l6 6-6 6" stroke="currentColor" strokeWidth="2" fill="none" /></svg>
          </button>
        </div>
      </div>
    </section>
  )
}
