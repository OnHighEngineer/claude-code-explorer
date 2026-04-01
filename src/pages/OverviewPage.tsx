import { Terminal, Wrench, Command, Shield, Zap, Package, Network, BookOpen } from 'lucide-react'

interface OverviewPageProps {
  onNavigate: (page: string) => void
  toolCount: number
  commandCount: number
}

export function OverviewPage({ onNavigate, toolCount, commandCount }: OverviewPageProps) {
  const features = [
    { icon: Terminal, title: 'CLI Application', desc: 'React + Ink terminal UI with rich interactive components', page: 'core-engine' },
    { icon: Wrench, title: `${toolCount || 40}+ Tools`, desc: 'Bash, file operations, web search, agent spawning, and more', page: 'tools' },
    { icon: Command, title: `${commandCount || 100}+ Commands`, desc: 'Slash commands for git, config, MCP, plugins, and workflows', page: 'commands' },
    { icon: Shield, title: 'Permission System', desc: 'Granular tool permissions with deny rules and sandbox', page: 'permissions' },
    { icon: Zap, title: 'Feature Flags', desc: 'Compile-time dead code elimination for different builds', page: 'feature-flags' },
    { icon: Package, title: 'Plugin Ecosystem', desc: 'Extensible via plugins, MCP servers, and skills', page: 'plugins' },
    { icon: Network, title: 'MCP Integration', desc: 'Model Context Protocol for third-party tool integration', page: 'mcp' },
    { icon: BookOpen, title: 'Learning Paths', desc: 'Guided tours to understand the codebase', page: 'learning' },
  ]

  return (
    <div>
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Claude Code Documentation
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl">
          A comprehensive guide to Anthropic's CLI coding assistant. Explore the architecture, tools, commands, and internals of how Claude Code works.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        {[
          { label: 'Tools', value: toolCount || 40, color: 'text-blue-600' },
          { label: 'Commands', value: commandCount || 100, color: 'text-green-600' },
          { label: 'Components', value: '144+', color: 'text-purple-600' },
          { label: 'Services', value: '6+', color: 'text-amber-600' },
        ].map((stat) => (
          <div key={stat.label} className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 text-center border border-gray-200 dark:border-gray-800">
            <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</div>
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Explore</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {features.map((feature) => {
          const Icon = feature.icon
          return (
            <button
              key={feature.title}
              onClick={() => onNavigate(feature.page)}
              className="text-left bg-white dark:bg-gray-900 rounded-lg p-5 border border-gray-200 dark:border-gray-800 hover:shadow-md hover:border-gray-300 dark:hover:border-gray-700 transition-all"
            >
              <Icon className="w-6 h-6 text-gray-700 dark:text-gray-300 mb-3" />
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{feature.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{feature.desc}</p>
            </button>
          )
        })}
      </div>

      <div className="mt-12 bg-gray-50 dark:bg-gray-900 rounded-lg p-6 border border-gray-200 dark:border-gray-800">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">What is Claude Code?</h2>
        <div className="space-y-3 text-gray-700 dark:text-gray-300">
          <p>
            Claude Code is Anthropic's official <strong>AI-powered terminal-based coding assistant</strong>.
            It runs in your terminal and can read, edit, and create files, run commands, and interact with
            your codebase — all through natural language prompts.
          </p>
          <p>
            Built with <strong>React + Ink</strong> for the terminal UI, it uses a sophisticated tool system
            with 40+ built-in tools, 100+ slash commands, MCP integration, plugin support, and multi-agent
            collaboration capabilities.
          </p>
          <p>
            This documentation site catalogs every aspect of the codebase to help developers understand
            how it works internally.
          </p>
        </div>
      </div>
    </div>
  )
}
