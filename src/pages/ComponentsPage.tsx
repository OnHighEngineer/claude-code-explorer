import { useMemo, useState } from 'react'
import { Badge } from '@/components/Badge'

interface ComponentsPageProps {
  components: { name: string; file: string; description: string; category: string }[]
}

export function ComponentsPage({ components }: ComponentsPageProps) {
  const [filter, setFilter] = useState<string | null>(null)

  const categories = useMemo(() => {
    const cats = new Set(components.map((c) => c.category))
    return Array.from(cats).sort()
  }, [components])

  const filtered = filter ? components.filter((c) => c.category === filter) : components

  const defaultComponents = [
    { name: 'App', category: 'core', description: 'Root application component', file: 'src/components/App.tsx' },
    { name: 'Message', category: 'messages', description: 'Individual message rendering', file: 'src/components/Message.tsx' },
    { name: 'Messages', category: 'messages', description: 'Message list container', file: 'src/components/Messages.tsx' },
    { name: 'MessageRow', category: 'messages', description: 'Single message row', file: 'src/components/MessageRow.tsx' },
    { name: 'PromptInput', category: 'input', description: 'User prompt input area', file: 'src/components/PromptInput/' },
    { name: 'Spinner', category: 'feedback', description: 'Loading/activity indicators', file: 'src/components/Spinner.tsx' },
    { name: 'ModelPicker', category: 'settings', description: 'Model selection UI', file: 'src/components/ModelPicker.tsx' },
    { name: 'ThemePicker', category: 'settings', description: 'Theme selection UI', file: 'src/components/ThemePicker.tsx' },
    { name: 'TaskListV2', category: 'tasks', description: 'Task management display', file: 'src/components/TaskListV2.tsx' },
    { name: 'StatusLine', category: 'status', description: 'Bottom status bar', file: 'src/components/StatusLine.tsx' },
    { name: 'VirtualMessageList', category: 'messages', description: 'Virtualized message list for performance', file: 'src/components/VirtualMessageList.tsx' },
    { name: 'Markdown', category: 'rendering', description: 'Markdown rendering in terminal', file: 'src/components/Markdown.tsx' },
    { name: 'Diff', category: 'rendering', description: 'Diff visualization components', file: 'src/components/diff/' },
    { name: 'TrustDialog', category: 'dialogs', description: 'Security trust acceptance dialog', file: 'src/components/TrustDialog/' },
    { name: 'Onboarding', category: 'dialogs', description: 'First-run onboarding flow', file: 'src/components/Onboarding.tsx' },
    { name: 'Settings', category: 'settings', description: 'Settings UI', file: 'src/components/settings/' },
    { name: 'Permissions', category: 'dialogs', description: 'Permission management UI', file: 'src/components/permissions/' },
    { name: 'MCP', category: 'settings', description: 'MCP server management UI', file: 'src/components/mcp/' },
  ]

  const displayComponents = components.length > 0 ? filtered : defaultComponents

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Components</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        {components.length > 0 ? components.length : 144}+ React components that make up the terminal UI.
      </p>

      {components.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setFilter(null)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              !filter ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900' : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
            }`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                filter === cat ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900' : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      <div className="space-y-2">
        {displayComponents.map((comp) => (
          <div
            key={comp.name}
            className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-4 hover:shadow-sm transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">{comp.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{comp.description}</p>
                <p className="text-xs text-gray-500 dark:text-gray-500 mt-2 font-mono">{comp.file}</p>
              </div>
              <Badge>{comp.category}</Badge>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
