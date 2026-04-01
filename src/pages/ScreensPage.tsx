import { Badge } from '@/components/Badge'

interface ScreensPageProps {
  screens: { name: string; file: string; description: string; purpose: string; features?: string[] }[]
}

export function ScreensPage({ screens }: ScreensPageProps) {
  const defaultScreens = [
    {
      name: 'REPL',
      file: 'src/screens/REPL.tsx',
      description: 'The main interactive read-eval-print loop screen. This is where users type prompts and see Claude\'s responses, tool calls, and results.',
      purpose: 'Primary user interaction interface',
      features: ['Virtualized message list', 'Prompt input with slash commands', 'Tool call visualization', 'Model picker', 'Status bar', 'Vim mode', 'Keybinding support'],
    },
    {
      name: 'Doctor',
      file: 'src/screens/Doctor.tsx',
      description: 'Diagnostic and troubleshooting screen that checks system configuration, authentication, and connectivity.',
      purpose: 'Debug and diagnose issues',
      features: ['System checks', 'Auth verification', 'Network diagnostics', 'Config validation'],
    },
    {
      name: 'ResumeConversation',
      file: 'src/screens/ResumeConversation.tsx',
      description: 'Session resume chooser that lets users pick from previous conversations to continue working.',
      purpose: 'Resume previous sessions',
      features: ['Session listing', 'Conversation preview', 'Resume with context'],
    },
  ]

  const displayScreens = screens.length > 0 ? screens : defaultScreens

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Screens</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        The 3 main screens of Claude Code's terminal UI.
      </p>

      <div className="space-y-6">
        {displayScreens.map((screen) => (
          <div key={screen.name} className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">{screen.name}</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 font-mono">{screen.file}</p>
              </div>
              <Badge>Screen</Badge>
            </div>
            <p className="text-gray-700 dark:text-gray-300 mb-4">{screen.description}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4"><strong>Purpose:</strong> {screen.purpose}</p>
            {screen.features && screen.features.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Features</h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300">
                  {screen.features.map((f) => <li key={f}>{f}</li>)}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
