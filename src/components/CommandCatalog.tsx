import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Settings, GitBranch, Bug, FlaskConical, Lock } from 'lucide-react'

const commandCategories = [
  {
    id: 'setup',
    name: 'Setup & Config',
    icon: Settings,
    color: '#7B9EB8',
    commands: [
      { name: '/init', desc: 'Initialize Claude Code in a project', hidden: false },
      { name: '/login', desc: 'Authenticate with Anthropic', hidden: false },
      { name: '/logout', desc: 'Sign out of current session', hidden: false },
      { name: '/config', desc: 'View or edit configuration', hidden: false },
      { name: '/permissions', desc: 'Manage tool permissions', hidden: false },
      { name: '/model', desc: 'Switch the active model', hidden: false },
      { name: '/theme', desc: 'Change terminal theme', hidden: false },
      { name: '/terminal-setup', desc: 'Configure terminal integration', hidden: false },
      { name: '/doctor', desc: 'Run diagnostics', hidden: false },
      { name: '/onboarding', desc: 'Show onboarding flow', hidden: false },
      { name: '/mcp', desc: 'Manage MCP servers', hidden: false },
      { name: '/hooks', desc: 'Configure post-sampling hooks', hidden: false },
    ],
  },
  {
    id: 'workflow',
    name: 'Daily Workflow',
    icon: GitBranch,
    color: '#D4A853',
    commands: [
      { name: '/compact', desc: 'Compact conversation history', hidden: false },
      { name: '/memory', desc: 'View stored memories', hidden: false },
      { name: '/context', desc: 'Show current context', hidden: false },
      { name: '/plan', desc: 'Enter planning mode', hidden: false },
      { name: '/resume', desc: 'Resume last session', hidden: false },
      { name: '/session', desc: 'Manage sessions', hidden: false },
      { name: '/files', desc: 'List project files', hidden: false },
      { name: '/add-dir', desc: 'Add directory to context', hidden: false },
      { name: '/copy', desc: 'Copy last response', hidden: false },
      { name: '/export', desc: 'Export conversation', hidden: false },
      { name: '/summary', desc: 'Summarize current session', hidden: false },
      { name: '/clear', desc: 'Clear conversation', hidden: false },
      { name: '/brief', desc: 'Brief mode toggle', hidden: false },
      { name: '/output-style', desc: 'Set output formatting', hidden: false },
      { name: '/color', desc: 'Toggle colored output', hidden: false },
      { name: '/vim', desc: 'Enable vim keybindings', hidden: false },
      { name: '/keybindings', desc: 'Customize keybindings', hidden: false },
      { name: '/skills', desc: 'Manage skills', hidden: false },
      { name: '/tasks', desc: 'View active tasks', hidden: false },
      { name: '/agents', desc: 'Manage agents', hidden: false },
      { name: '/fast', desc: 'Enable fast mode', hidden: false },
      { name: '/effort', desc: 'Set effort level', hidden: false },
      { name: '/extra-usage', desc: 'Show extra usage info', hidden: false },
      { name: '/rate-limit-options', desc: 'View rate limit settings', hidden: false },
    ],
  },
  {
    id: 'review',
    name: 'Code Review & Git',
    icon: GitBranch,
    color: '#6BA368',
    commands: [
      { name: '/review', desc: 'Review changes', hidden: false },
      { name: '/commit', desc: 'Commit changes', hidden: false },
      { name: '/commit-push-pr', desc: 'Commit, push and create PR', hidden: false },
      { name: '/diff', desc: 'Show current diff', hidden: false },
      { name: '/pr_comments', desc: 'View PR comments', hidden: false },
      { name: '/branch', desc: 'Manage branches', hidden: false },
      { name: '/issue', desc: 'Work with issues', hidden: false },
      { name: '/security-review', desc: 'Run security review', hidden: false },
      { name: '/autofix-pr', desc: 'Auto-fix PR issues', hidden: false },
      { name: '/share', desc: 'Share session', hidden: false },
      { name: '/install-github-app', desc: 'Install GitHub app', hidden: false },
      { name: '/install-slack-app', desc: 'Install Slack app', hidden: false },
      { name: '/tag', desc: 'Manage git tags', hidden: false },
    ],
  },
  {
    id: 'debug',
    name: 'Debugging & Diagnostics',
    icon: Bug,
    color: '#C17B5E',
    commands: [
      { name: '/status', desc: 'Show current status', hidden: false },
      { name: '/stats', desc: 'Show session statistics', hidden: false },
      { name: '/cost', desc: 'Show cost breakdown', hidden: false },
      { name: '/usage', desc: 'Show API usage', hidden: false },
      { name: '/version', desc: 'Show version info', hidden: false },
      { name: '/feedback', desc: 'Submit feedback', hidden: false },
      { name: '/think-back', desc: 'Review past sessions', hidden: false },
      { name: '/thinkback-play', desc: 'Play back session', hidden: false },
      { name: '/rewind', desc: 'Rewind conversation', hidden: false },
      { name: '/ctx_viz', desc: 'Context visualization', hidden: false },
      { name: '/debug-tool-call', desc: 'Debug tool calls', hidden: false },
      { name: '/perf-issue', desc: 'Performance diagnostics', hidden: false },
      { name: '/heapdump', desc: 'Generate heap dump', hidden: false },
      { name: '/ant-trace', desc: 'Anthropic trace logging', hidden: false },
      { name: '/backfill-sessions', desc: 'Backfill session data', hidden: false },
      { name: '/break-cache', desc: 'Clear caches', hidden: false },
      { name: '/bridge-kick', desc: 'Restart bridge connection', hidden: false },
      { name: '/mock-limits', desc: 'Mock rate limits', hidden: false },
      { name: '/oauth-refresh', desc: 'Refresh OAuth token', hidden: false },
      { name: '/reset-limits', desc: 'Reset rate limits', hidden: false },
      { name: '/env', desc: 'Show environment variables', hidden: false },
      { name: '/bughunter', desc: 'Run bug detection', hidden: false },
      { name: '/passes', desc: 'Show test passes', hidden: false },
    ],
  },
  {
    id: 'advanced',
    name: 'Advanced & Experimental',
    icon: FlaskConical,
    color: '#9B7CB8',
    commands: [
      { name: '/advisor', desc: 'Enable advisor mode', hidden: false },
      { name: '/ultraplan', desc: 'Ultra planning mode', hidden: true },
      { name: '/remote-control', desc: 'Remote session control', hidden: true },
      { name: '/teleport', desc: 'Teleport context', hidden: true },
      { name: '/voice', desc: 'Voice input mode', hidden: false },
      { name: '/desktop', desc: 'Desktop mode', hidden: true },
      { name: '/chrome', desc: 'Chrome integration', hidden: true },
      { name: '/mobile', desc: 'Mobile mode', hidden: true },
      { name: '/sandbox', desc: 'Sandbox mode', hidden: false },
      { name: '/plugin', desc: 'Manage plugins', hidden: false },
      { name: '/reload-plugins', desc: 'Reload all plugins', hidden: false },
      { name: '/web-setup', desc: 'Web interface setup', hidden: false },
      { name: '/remote-env', desc: 'Remote environment', hidden: true },
      { name: '/ide', desc: 'IDE integration', hidden: false },
      { name: '/stickers', desc: 'Toggle stickers', hidden: false },
      { name: '/good-claude', desc: 'Good Claude mode', hidden: true },
      { name: '/btw', desc: 'By the way context', hidden: true },
      { name: '/upgrade', desc: 'Check for upgrades', hidden: false },
      { name: '/release-notes', desc: 'Show release notes', hidden: false },
      { name: '/privacy-settings', desc: 'Privacy configuration', hidden: false },
      { name: '/help', desc: 'Show help', hidden: false },
      { name: '/exit', desc: 'Exit Claude Code', hidden: false },
      { name: '/rename', desc: 'Rename session', hidden: false },
    ],
  },
]

interface CommandCatalogProps {
  commands: any[]
  onNavigate: (page: string) => void
}

export function CommandCatalog({ commands: _commands, onNavigate: _onNavigate }: CommandCatalogProps) {
  const [selectedCommand, setSelectedCommand] = useState<{ name: string; desc: string; category: string; color: string } | null>(null)

  const handleKey = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') setSelectedCommand(null)
  }, [])

  useEffect(() => {
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [handleKey])

  return (
    <section id="commands" className="py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-sm font-mono text-[#d4a853] mb-4 block">04</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            <span className="text-[#e8e4df]">Command Catalog</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-[#8a8580] max-w-2xl mx-auto font-body">
            Every slash command available in Claude Code, sorted by what it does.
          </p>
        </div>

        <div className="space-y-6 mb-8">
          {commandCategories.map(category => {
            const Icon = category.icon
            return (
              <div key={category.id}>
                <div className="flex items-center gap-3 mb-3">
                  <Icon className="w-5 h-5" style={{ color: category.color }} />
                  <h3 className="text-sm font-heading font-semibold text-[#e8e4df]">{category.name}</h3>
                  <span className="text-xs text-[#8a8580]">{category.commands.length}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {category.commands.map(cmd => (
                    <button
                      key={cmd.name}
                      onClick={() => setSelectedCommand({ name: cmd.name, desc: cmd.desc, category: category.name, color: category.color })}
                      className="command-chip text-[11px] font-mono px-3 py-1.5 rounded-lg transition-all duration-150 hover:brightness-125 cursor-pointer"
                      style={{
                        backgroundColor: category.color + '10',
                        color: cmd.hidden ? '#8a8580' : category.color,
                        border: `1px solid ${cmd.hidden ? '#2a2520' : category.color + '20'}`,
                        borderStyle: cmd.hidden ? 'dashed' : 'solid',
                        opacity: cmd.hidden ? 0.6 : 1,
                      }}
                    >
                      {cmd.hidden && <Lock className="w-3 h-3 inline mr-1" />}
                      {cmd.name}
                    </button>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        <p className="text-center text-sm text-[#8a8580] font-body">
          Click a command to see details and source code
        </p>

        <AnimatePresence>
          {selectedCommand && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                onClick={() => setSelectedCommand(null)}
              />
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-x-4 bottom-4 sm:inset-auto sm:left-1/2 sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:max-w-lg w-full bg-[#1a1a1a] border border-[#2a2520] rounded-2xl z-50 p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <code className="text-lg font-mono font-bold" style={{ color: selectedCommand.color }}>
                      {selectedCommand.name}
                    </code>
                    <p className="text-xs text-[#8a8580] mt-1">{selectedCommand.category}</p>
                  </div>
                  <button
                    onClick={() => setSelectedCommand(null)}
                    className="p-1.5 rounded-lg hover:bg-[#2a2520] transition-colors text-[#8a8580] hover:text-[#e8e4df]"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                  </button>
                </div>
                <p className="text-[#e8e4df] font-body">{selectedCommand.desc}</p>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
