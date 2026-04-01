import React from 'react'
import { Package, Layers, Server, Shield, Zap, Code } from 'lucide-react'

interface ServiceInfo {
  name: string
  description: string
  files: string[]
  icon: React.ReactNode
}

export function ArchitecturePage() {
  const services: ServiceInfo[] = [
    {
      name: 'API Client',
      description: 'Anthropic API communication, token counting',
      files: ['src/services/api/claude.ts', 'src/services/api/bootstrap.ts'],
      icon: <Server className="w-6 h-6" />,
    },
    {
      name: 'MCP (Model Context Protocol)',
      description: 'Third-party tool/resource server integration',
      files: ['src/services/mcp/client.ts', 'src/services/mcp/config.ts'],
      icon: <Layers className="w-6 h-6" />,
    },
    {
      name: 'Permission System',
      description: 'Tool permission checking, denial rules, user approval',
      files: ['src/hooks/toolPermission/', 'src/services/tools/'],
      icon: <Shield className="w-6 h-6" />,
    },
    {
      name: 'Analytics',
      description: 'GrowthBook feature flags, telemetry, event logging',
      files: ['src/services/analytics/growthbook.ts'],
      icon: <Zap className="w-6 h-6" />,
    },
    {
      name: 'Plugin System',
      description: 'Load, manage, and execute user/third-party plugins',
      files: ['src/services/plugins/', 'src/plugins/'],
      icon: <Code className="w-6 h-6" />,
    },
    {
      name: 'State Management',
      description: 'Session appState, task tracking, agent coordination',
      files: ['src/state/AppState.tsx', 'src/tasks/'],
      icon: <Package className="w-6 h-6" />,
    },
  ]

  return (
    <div className="flex-1 max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
          Architecture
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Core systems and service layer overview
        </p>
      </div>

      {/* High-Level Architecture */}
      <div className="mb-12 bg-white dark:bg-gray-800 rounded-lg p-8 border border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          System Architecture
        </h2>

        <div className="space-y-4 font-mono text-sm">
          <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg text-gray-700 dark:text-gray-300 overflow-x-auto">
            <pre>{`┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  User (CLI / IDE Extension / SDK)                          │
│                     ↓                                       │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ main.tsx - CLI Parser (Commander.js)               │   │
│  │             React/Ink UI Renderer                   │   │
│  └─────────────────────────────────────────────────────┘   │
│                     ↓                                       │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ QueryEngine.ts - LLM Orchestration                 │   │
│  │ • Setup context                                     │   │
│  │ • Manage conversation turns                         │   │
│  │ • Handle permissions                                │   │
│  └─────────────────────────────────────────────────────┘   │
│        ↓                  ↓                  ↓              │
│  ┌──────────┐  ┌────────────────┐  ┌──────────────┐       │
│  │Tools (40+)   │Commands (50+)  │  │Plugins       │       │
│  │ Bash Tool   │ /commit        │  │User-defined  │       │
│  │ File Tools  │ /review        │  │Extensions    │       │
│  │ MCP Tools   │ /search        │  │              │       │
│  └──────────┘  └────────────────┘  └──────────────┘       │
│        ↓                                                    │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ Permission System - Check before execution         │   │
│  └─────────────────────────────────────────────────────┘   │
│        ↓                                                    │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ Tool Execution - Async with progress reporting     │   │
│  └─────────────────────────────────────────────────────┘   │
│        ↓                                                    │
│  ┌──────────────────────┬──────────────────┬────────────┐ │
│  │ API Client           │ MCP Integration  │Analytics  │ │
│  │ • Call Anthropic API │ • Resource mgmt  │ • Events  │ │
│  │ • Token counting     │ • Remote tools   │ • Metrics │ │
│  └──────────────────────┴──────────────────┴────────────┘ │
│                                                             │
└─────────────────────────────────────────────────────────────┘`}</pre>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {services.map((service) => (
          <div
            key={service.name}
            className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="p-3 bg-gray-100 dark:bg-gray-900 dark:bg-gray-900 text-gray-700 dark:text-gray-300 dark:text-gray-300 rounded-lg">
                {service.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {service.name}
              </h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              {service.description}
            </p>
            <div className="space-y-1">
              {service.files.map((file) => (
                <div key={file} className="text-xs text-gray-500 dark:text-gray-500">
                  {file}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Core Concepts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-50 dark:bg-gray-900/20 rounded-lg p-6 border border-green-200 dark:border-green-800">
          <h3 className="font-semibold text-gray-900 dark:text-gray-200 mb-3">
            💡 Tool System
          </h3>
          <p className="text-sm text-gray-800 dark:text-gray-300 mb-3">
            Every tool (Bash, File operations, API calls) implements the same
            interface:
          </p>
          <div className="text-xs text-gray-700 dark:text-gray-400 space-y-1">
            <div>✓ Input validation (Zod schema)</div>
            <div>✓ Permission checking</div>
            <div>✓ Async execution</div>
            <div>✓ Progress reporting</div>
            <div>✓ Result mapping</div>
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-900/20 rounded-lg p-6 border border-purple-200 dark:border-purple-800">
          <h3 className="font-semibold text-gray-900 dark:text-gray-200 mb-3">
            🔐 Permission Model
          </h3>
          <p className="text-sm text-gray-800 dark:text-gray-300 mb-3">
            Tools are filtered and gated before model sees them:
          </p>
          <div className="text-xs text-gray-700 dark:text-gray-400 space-y-1">
            <div>✓ Deny rules applied at registry</div>
            <div>✓ Per-tool permission check</div>
            <div>✓ User can approve/deny</div>
            <div>✓ Permission modes: default/plan/auto</div>
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-900/20 rounded-lg p-6 border border-orange-200 dark:border-orange-800">
          <h3 className="font-semibold text-gray-900 dark:text-gray-200 mb-3">
            🔌 Extensibility
          </h3>
          <p className="text-sm text-gray-800 dark:text-gray-300 mb-3">
            Multiple extension mechanisms:
          </p>
          <div className="text-xs text-gray-700 dark:text-gray-400 space-y-1">
            <div>✓ MCP servers add tools/resources</div>
            <div>✓ Plugins extend commands</div>
            <div>✓ Skills create reusable workflows</div>
            <div>✓ Custom agents via AgentTool</div>
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-900/20 rounded-lg p-6 border border-indigo-200 dark:border-indigo-800">
          <h3 className="font-semibold text-gray-900 dark:text-gray-200 mb-3">
            🎛️ Feature Flags
          </h3>
          <p className="text-sm text-gray-800 dark:text-gray-300 mb-3">
            Compile-time dead code elimination:
          </p>
          <div className="text-xs text-gray-700 dark:text-gray-400 space-y-1">
            <div>✓ PROACTIVE - Proactive suggestions</div>
            <div>✓ KAIROS - Assistant mode</div>
            <div>✓ BRIDGE_MODE - IDE integration</div>
            <div>✓ VOICE_MODE - Voice input</div>
          </div>
        </div>
      </div>
    </div>
  )
}
