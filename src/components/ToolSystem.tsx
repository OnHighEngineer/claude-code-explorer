import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FileCode, Terminal, Search, Users, Calendar, Settings, FlaskConical } from 'lucide-react'

const toolCategories = [
  {
    id: 'file',
    name: 'File Operations',
    icon: FileCode,
    color: '#D4A853',
    tools: [
      { name: 'FileRead', gated: false },
      { name: 'FileEdit', gated: false },
      { name: 'FileWrite', gated: false },
      { name: 'Glob', gated: false },
      { name: 'Grep', gated: false },
      { name: 'NotebookEdit', gated: false },
    ],
  },
  {
    id: 'execution',
    name: 'Execution',
    icon: Terminal,
    color: '#C17B5E',
    tools: [
      { name: 'Bash', gated: false },
      { name: 'PowerShell', gated: false },
      { name: 'REPL', gated: true },
    ],
  },
  {
    id: 'search',
    name: 'Search & Fetch',
    icon: Search,
    color: '#7B9EB8',
    tools: [
      { name: 'WebBrowser', gated: false },
      { name: 'WebFetch', gated: true },
      { name: 'WebSearch', gated: false },
      { name: 'ToolSearch', gated: false },
    ],
  },
  {
    id: 'agents',
    name: 'Agents & Tasks',
    icon: Users,
    color: '#6BA368',
    tools: [
      { name: 'Agent', gated: false },
      { name: 'SendMessage', gated: false },
      { name: 'TaskCreate', gated: false },
      { name: 'TaskGet', gated: false },
      { name: 'TaskList', gated: false },
      { name: 'TaskUpdate', gated: false },
      { name: 'TaskStop', gated: false },
      { name: 'TaskOutput', gated: false },
      { name: 'TeamCreate', gated: false },
      { name: 'TeamDelete', gated: false },
      { name: 'ListPeers', gated: true },
    ],
  },
  {
    id: 'planning',
    name: 'Planning',
    icon: Calendar,
    color: '#B8A9C9',
    tools: [
      { name: 'EnterPlanMode', gated: false },
      { name: 'ExitPlanMode', gated: false },
      { name: 'EnterWorktree', gated: false },
      { name: 'ExitWorktree', gated: false },
      { name: 'VerifyPlanExecution', gated: true },
    ],
  },
  {
    id: 'mcp',
    name: 'MCP',
    icon: Settings,
    color: '#9BBEC7',
    tools: [
      { name: 'mcp', gated: false },
      { name: 'ListMcpResources', gated: false },
      { name: 'ReadMcpResource', gated: false },
      { name: 'McpAuth', gated: false },
    ],
  },
  {
    id: 'system',
    name: 'System',
    icon: Settings,
    color: '#8A8580',
    tools: [
      { name: 'AskUserQuestion', gated: false },
      { name: 'TodoWrite', gated: false },
      { name: 'Skill', gated: false },
      { name: 'Config', gated: false },
      { name: 'RemoteTrigger', gated: true },
      { name: 'CronCreate', gated: true },
      { name: 'CronDelete', gated: true },
      { name: 'CronList', gated: true },
      { name: 'Snip', gated: true },
      { name: 'Workflow', gated: true },
      { name: 'TerminalCapture', gated: true },
    ],
  },
  {
    id: 'experimental',
    name: 'Experimental',
    icon: FlaskConical,
    color: '#A0856E',
    tools: [
      { name: 'Sleep', gated: false },
      { name: 'SendUserMessage', gated: false },
      { name: 'StructuredOutput', gated: true },
      { name: 'LSP', gated: true },
      { name: 'SendUserFile', gated: true },
      { name: 'PushNotification', gated: true },
      { name: 'Monitor', gated: true },
      { name: 'SubscribePR', gated: true },
    ],
  },
]

export function ToolSystem({ tools: _tools, onNavigate: _onNavigate }: { tools: any[]; onNavigate: (page: string) => void }) {
  const [selectedTool, setSelectedTool] = useState<{ name: string; category: string; color: string; gated: boolean } | null>(null)

  return (
    <section id="tools" className="py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-sm font-mono text-[#d4a853] mb-4 block">03</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            <span className="text-[#e8e4df]">Tool System</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-[#8a8580] max-w-2xl mx-auto font-body">
            Every built-in tool Claude Code can call, sorted by what it does.
          </p>
        </div>

        <div className="space-y-6 mb-8">
          {toolCategories.map(category => {
            const Icon = category.icon
            return (
              <div key={category.id} className="card-surface p-5">
                <div className="flex items-center gap-3 mb-4">
                  <Icon className="w-5 h-5" style={{ color: category.color }} />
                  <h3 className="text-sm font-heading font-semibold text-[#e8e4df]">{category.name}</h3>
                  <span className="text-xs text-[#8a8580]">{category.tools.length} tools</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {category.tools.map(tool => (
                    <button
                      key={tool.name}
                      onClick={() => setSelectedTool({ name: tool.name, category: category.name, color: category.color, gated: tool.gated })}
                      className="text-[12px] font-mono px-3 py-1.5 rounded-lg transition-all duration-150 hover:brightness-125 cursor-pointer"
                      style={{
                        backgroundColor: category.color + '10',
                        color: tool.gated ? '#8a8580' : category.color,
                        border: `1px solid ${tool.gated ? '#2a2520' : category.color + '20'}`,
                        borderStyle: tool.gated ? 'dashed' : 'solid',
                        opacity: tool.gated ? 0.6 : 1,
                      }}
                    >
                      {tool.name}
                      {tool.gated && ' 🔒'}
                    </button>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        <p className="text-center text-sm text-[#8a8580] font-body">
          Click a tool to see details and source code
        </p>

        <AnimatePresence>
          {selectedTool && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                onClick={() => setSelectedTool(null)}
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
                    <code className="text-lg font-mono font-bold" style={{ color: selectedTool.color }}>
                      {selectedTool.name}
                    </code>
                    <p className="text-xs text-[#8a8580] mt-1">{selectedTool.category}</p>
                  </div>
                  <button
                    onClick={() => setSelectedTool(null)}
                    className="p-1.5 rounded-lg hover:bg-[#2a2520] transition-colors text-[#8a8580] hover:text-[#e8e4df]"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                  </button>
                </div>
                <p className="text-[#e8e4df] font-body text-sm">
                  {selectedTool.gated ? 'This tool is gated behind a feature flag.' : 'Built-in tool available in Claude Code.'}
                </p>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
