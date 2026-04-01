import React, { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

export function ExecutionFlowPage() {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({
    'step-1': true,
    'step-2': false,
    'step-3': false,
    'step-4': false,
    'step-5': false,
  })

  const toggleStep = (step: string) => {
    setExpanded((prev) => ({
      ...prev,
      [step]: !prev[step],
    }))
  }

  const steps = [
    {
      id: 'step-1',
      title: 'User Input → CLI Parser',
      description: 'main.tsx receives user input',
      details: [
        'Entry point: src/main.tsx (808KB+)',
        'Uses Commander.js for CLI parsing',
        'Initializes React/Ink renderer',
        'Supports slash commands: /commit, /search, etc.',
      ],
      code: `// main.tsx
const program = new Command()
  .option('-m, --model <model>', 'Specify Claude model')
  .option('--fast', 'Enable fast mode')
renderAndRun(program)`,
    },
    {
      id: 'step-2',
      title: 'Query Engine Receives Message',
      description: 'QueryEngine.submitMessage() orchestrates the turn',
      details: [
        'File: src/QueryEngine.ts (~47KB)',
        'Loads system prompt context',
        'Processes user input for /commands',
        'Initializes permission tracking',
      ],
      code: `// QueryEngine.ts - submitMessage()
async submitMessage(prompt: string) {
  const systemPrompt = getSystemPrompt()
  const messages = [systemInit, userMessage]
  return this.query({
    messages,
    systemPrompt,
    canUseTool: wrappedCanUseTool
  })
}`,
    },
    {
      id: 'step-3',
      title: 'Tool Selection & Permission Check',
      description: 'Model decides which tool to call',
      details: [
        'Model sees all available tools via toolUse schema',
        'Tool registry from: src/tools.ts',
        'Permission system filters/denies tools',
        'Tool lookup: toolMatchesName()',
      ],
      code: `// tools.ts - getTools()
export function getTools(permissionContext) {
  return getAllBaseTools()
    .filter(t => !getDenyRuleForTool(permissionContext, t))
    .filter(t => t.isEnabled?.())
}`,
    },
    {
      id: 'step-4',
      title: 'Tool Execution',
      description: 'Selected tool is invoked with validated input',
      details: [
        'Input validation via Zod schema',
        'Tool-specific permission checking',
        'Async execution with progress reporting',
        'Result mapping to API format',
      ],
      code: `// BashTool example
async call(input, context, canUseTool, parentMessage, onProgress) {
  // 1. Validate input
  // 2. Check permissions
  // 3. Execute command
  // 4. Report progress
  // 5. Return result
}`,
    },
    {
      id: 'step-5',
      title: 'Result Mapping & Response',
      description: 'Tool result converted and sent to model',
      details: [
        'Convert ToolResult → ToolResultBlockParam',
        'Handle large output persistence',
        'Record turn in conversation history',
        'Return to REPL or SDK caller',
      ],
      code: `// mapToolResultToToolResultBlockParam()
return {
  type: 'tool_result',
  tool_use_id: useId,
  content: formatOutput(toolResult),
  is_error: isError
}`,
    },
  ]

  return (
    <div className="flex-1 max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
          Execution Flow
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          How Claude Code processes a user query
        </p>
      </div>

      {/* Flow Diagram ASCII */}
      <div className="bg-gray-900 text-gray-400 p-6 rounded-lg font-mono text-sm mb-8 overflow-x-auto">
        <pre>{`User Input
    ↓
main.tsx (Commander.js CLI)
    ↓
QueryEngine.submitMessage()
    ↓
getSystemPrompt() + Load Context
    ↓
query() Orchestration Loop
    ├─ Tool Lookup (tools.ts)
    ├─ Permission Check
    ├─ Input Validation
    ├─ Tool Execution
    ├─ Result Mapping
    └─ Message Recording
    ↓
Return to REPL / SDK Caller`}</pre>
      </div>

      {/* Detailed Steps */}
      <div className="space-y-4">
        {steps.map((step) => (
          <div
            key={step.id}
            className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
          >
            <button
              onClick={() => toggleStep(step.id)}
              className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <div className="text-left">
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {step.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {step.description}
                </p>
              </div>
              {expanded[step.id] ? (
                <ChevronUp className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              )}
            </button>

            {expanded[step.id] && (
              <div className="px-6 pb-4 border-t border-gray-200 dark:border-gray-700">
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Key Points:
                  </h4>
                  <ul className="space-y-1">
                    {step.details.map((detail, idx) => (
                      <li
                        key={idx}
                        className="text-sm text-gray-600 dark:text-gray-400 flex items-start gap-2"
                      >
                        <span className="text-gray-700 dark:text-gray-300 dark:text-gray-300 mt-0.5">
                          ▪
                        </span>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-gray-900 text-gray-400 p-4 rounded-lg font-mono text-xs overflow-x-auto">
                  <pre>{step.code}</pre>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Key Files */}
      <div className="mt-12 bg-gray-50 dark:bg-gray-900 dark:bg-gray-900/20 rounded-lg p-6 border border-gray-300 dark:border-gray-700">
        <h3 className="font-semibold text-gray-900 dark:text-gray-100 dark:text-gray-300 mb-3">
          Key File Locations
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700 dark:text-gray-300">
          <div>
            <strong>src/main.tsx</strong>
            <p className="text-xs">CLI entry point, React/Ink init</p>
          </div>
          <div>
            <strong>src/QueryEngine.ts</strong>
            <p className="text-xs">LLM orchestration engine</p>
          </div>
          <div>
            <strong>src/tools.ts</strong>
            <p className="text-xs">Tool registry assembly</p>
          </div>
          <div>
            <strong>src/query.ts</strong>
            <p className="text-xs">Message loop generator</p>
          </div>
          <div>
            <strong>src/services/tools/toolExecution.ts</strong>
            <p className="text-xs">Permission checking & execution</p>
          </div>
          <div>
            <strong>src/Tool.ts</strong>
            <p className="text-xs">Tool type definitions</p>
          </div>
        </div>
      </div>
    </div>
  )
}
