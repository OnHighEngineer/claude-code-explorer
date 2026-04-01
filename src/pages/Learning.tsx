import React, { useState } from 'react'
import { BookOpen, Play } from 'lucide-react'

interface LearningPath {
  id: string
  title: string
  icon: string
  description: string
  duration: string
  steps: { title: string; description: string }[]
}

export function LearningPage() {
  const [selectedPath, setSelectedPath] = useState<string | null>(null)

  const paths: LearningPath[] = [
    {
      id: 'query-flow',
      title: 'How Queries Are Processed',
      icon: '🔄',
      description: 'Learn the complete flow from user input to tool execution',
      duration: '10 min',
      steps: [
        {
          title: 'User Input Entry',
          description: `
main.tsx receives the command via CLI parser
Uses Commander.js for argument parsing
Initializes React/Ink rendering context
          `,
        },
        {
          title: 'QueryEngine Setup',
          description: `
Creates a new turn in the conversation
Loads system prompt context
Initializes permission tracking
Prepares tool registry
          `,
        },
        {
          title: 'Tool Selection',
          description: `
Model decides which tool to use
Filtered tool list is sent in context
Permissions determine visibility
Tool matching via name equivalence
          `,
        },
        {
          title: 'Permission Check',
          description: `
Tool-specific permission validators run
User can approve/deny with prompts
Permission modes control behavior
Deny rules prevent access
          `,
        },
        {
          title: 'Tool Execution',
          description: `
Input validated against Zod schema
Tool.call() method invoked
Progress events streamed to UI
Result mapped to API format
          `,
        },
      ],
    },
    {
      id: 'tool-system',
      title: 'Understanding the Tool System',
      icon: '🔨',
      description: 'Deep dive into how tools are built and registered',
      duration: '12 min',
      steps: [
        {
          title: 'Tool Interface',
          description: `
All tools extend base Tool<Input, Output, Progress>
Define inputSchema via Zod
Implement async call() method
Handle permissions in checkPermissions()
          `,
        },
        {
          title: 'Tool Registration',
          description: `
Tools registered in src/tools.ts
getAllBaseTools() returns all available tools
Feature flags conditionally include tools
Dead code elimination via Bun bundler
          `,
        },
        {
          title: 'Permission Layer',
          description: `
Permissions checked BEFORE model sees tool
Multiple permission modes available
Tools can define custom permission rules
Sandbox constraints enforced
          `,
        },
        {
          title: 'Execution & Results',
          description: `
Tools execute with streaming output
Progress events report incremental updates
Large outputs persisted to disk
Results mapped to ToolResultBlockParam
          `,
        },
        {
          title: 'Example: BashTool',
          description: `
Validates shell command safety
Detects destructive operations
Runs with timeout and sandbox
Streams stdout/stderr to UI
Interprets exit codes
          `,
        },
      ],
    },
    {
      id: 'permissions',
      title: 'Permission System Deep Dive',
      icon: '🔐',
      description: 'Learn how permissions protect tool execution',
      duration: '8 min',
      steps: [
        {
          title: 'Permission Modes',
          description: `
default: Ask user for each tool use
plan: Ask for permission in planning mode
auto: Allow trusted tools automatically
bypassPermissions: Skip permission checks (dev)
          `,
        },
        {
          title: 'Deny Rules',
          description: `
Applied during tool filtering
Can deny entire tool categories
Can deny specific tools by name
Prevents access before model calls
          `,
        },
        {
          title: 'Permission Check Flow',
          description: `
1. Input schema validation (Zod)
2. Tool-specific validation
3. canUseTool() permission callback
4. User approval (if in ask mode)
5. Execution or denial
          `,
        },
        {
          title: 'Tool Safety Checks',
          description: `
BashTool: Destructive command detection
BashTool: Command injection prevention
FileEditTool: Protected file patterns
Commands: Restricted to intended purpose
          `,
        },
      ],
    },
    {
      id: 'commands',
      title: 'Command System Overview',
      icon: '⌘',
      description: 'Explore how slash commands are registered and executed',
      duration: '8 min',
      steps: [
        {
          title: 'Command Registration',
          description: `
Commands in src/commands/ directory
Conditionally loaded in src/commands.ts
Each command implements Command interface
Feature flags enable/disable commands
          `,
        },
        {
          title: 'Command Types',
          description: `
Workflow: /commit, /review, /push
Config: /config, /settings, /theme
Admin: /login, /logout, /doctor
Utilities: /help, /memory, /skills
          `,
        },
        {
          title: 'Command Execution',
          description: `
Parsed from input by CLI
Handlers implement actual logic
Can spawn UI dialogs
Can call tools internally
Return results to REPL
          `,
        },
        {
          title: 'Interactive vs Batch',
          description: `
Interactive: Request user input
Batch: Process without prompts
Some commands work both ways
Determined by mode and flags
          `,
        },
      ],
    },
    {
      id: 'architecture',
      title: 'System Architecture Overview',
      icon: '🏗️',
      description: 'Understand the major components and how they interact',
      duration: '15 min',
      steps: [
        {
          title: 'Core Components',
          description: `
main.tsx - CLI entry point
QueryEngine.ts - LLM orchestration
Tool.ts - Tool type system
commands.ts - Command registry
tools.ts - Tool registry
          `,
        },
        {
          title: 'Services Layer',
          description: `
api/ - Anthropic API client
mcp/ - Model Context Protocol
oauth/ - OAuth authentication
analytics/ - Feature flags and telemetry
plugins/ - Plugin system
          `,
        },
        {
          title: 'Tool & Command Registry',
          description: `
40+ tools for different operations
50+ commands for user workflows
Extensible via plugins & MCP
Permissions filter visibility
          `,
        },
        {
          title: 'State & Context',
          description: `
AppState singleton for sessions
Tool execution context passed through
Permission context tracks rules
Conversation history maintained
          `,
        },
        {
          title: 'Extensibility Points',
          description: `
MCP servers add new tools
Plugins extend commands
Skills create workflows
Custom agents via AgentTool
UI components in Ink
          `,
        },
      ],
    },
  ]

  const current = paths.find((p) => p.id === selectedPath)

  return (
    <div className="flex-1 max-w-5xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
          Learning Paths
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Guided tours to understand Claude Code internals
        </p>
      </div>

      {!selectedPath ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {paths.map((path) => (
            <button
              key={path.id}
              onClick={() => setSelectedPath(path.id)}
              className="text-left bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow"
            >
              <div className="text-4xl mb-3">{path.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                {path.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                {path.description}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-gray-500 dark:text-gray-500">
                  ⏱️ {path.duration}
                </span>
                <span className="text-gray-700 dark:text-gray-300 dark:text-gray-300 flex items-center gap-1">
                  <Play className="w-4 h-4" /> Start
                </span>
              </div>
            </button>
          ))}
        </div>
      ) : (
        current && (
          <div>
            <button
              onClick={() => setSelectedPath(null)}
              className="mb-6 text-gray-700 dark:text-gray-300 dark:text-gray-300 hover:underline flex items-center gap-2"
            >
              ← Back to Learning Paths
            </button>

            <div className="mb-6">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {current.icon} {current.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {current.description}
              </p>
              <div className="text-sm text-gray-500 dark:text-gray-500">
                {current.steps.length} steps • {current.duration}
              </div>
            </div>

            <div className="space-y-4">
              {current.steps.map((step, idx) => (
                <div
                  key={idx}
                  className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-black dark:bg-white text-white flex items-center justify-center font-bold flex-shrink-0">
                      {idx + 1}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                        {step.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 whitespace-pre-wrap">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 bg-gray-50 dark:bg-gray-900/20 rounded-lg p-6 border border-green-200 dark:border-green-800">
              <BookOpen className="w-5 h-5 text-gray-600 dark:text-gray-400 mb-2" />
              <h4 className="font-semibold text-gray-900 dark:text-gray-200 mb-2">
                Continue Learning
              </h4>
              <p className="text-sm text-gray-800 dark:text-gray-300">
                After completing this learning path, explore the Search, Files,
                and Architecture sections to go deeper.
              </p>
            </div>
          </div>
        )
      )}
    </div>
  )
}
