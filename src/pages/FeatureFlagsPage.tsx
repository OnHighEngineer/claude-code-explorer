import { Badge } from '@/components/Badge'
import { PropertyTable } from '@/components/PropertyTable'

interface FeatureFlagsPageProps {
  flags: { name: string; description: string; defaultEnabled: boolean; file: string }[]
}

export function FeatureFlagsPage({ flags }: FeatureFlagsPageProps) {
  const allFlags = flags.length > 0 ? flags : [
    { name: 'KAIROS', description: 'Assistant/proactive mode', defaultEnabled: false, file: 'src/flags.ts' },
    { name: 'COORDINATOR_MODE', description: 'Multi-agent coordination', defaultEnabled: false, file: 'src/flags.ts' },
    { name: 'VOICE_MODE', description: 'Speech-to-text input', defaultEnabled: false, file: 'src/flags.ts' },
    { name: 'BRIDGE_MODE', description: 'IDE/mobile client connectivity', defaultEnabled: false, file: 'src/flags.ts' },
    { name: 'WORKFLOW_SCRIPTS', description: 'Executable workflow scripts', defaultEnabled: false, file: 'src/flags.ts' },
    { name: 'WEB_BROWSER_TOOL', description: 'Browser automation (computer use)', defaultEnabled: false, file: 'src/flags.ts' },
    { name: 'SSH_REMOTE', description: 'SSH remote execution', defaultEnabled: false, file: 'src/flags.ts' },
    { name: 'DIRECT_CONNECT', description: 'cc:// URL protocol support', defaultEnabled: false, file: 'src/flags.ts' },
    { name: 'PROACTIVE', description: 'Proactive suggestions', defaultEnabled: false, file: 'src/flags.ts' },
    { name: 'WORKTREE_MODE', description: 'Git worktree support', defaultEnabled: true, file: 'src/flags.ts' },
    { name: 'POWERSHELL_TOOL', description: 'Windows PowerShell execution', defaultEnabled: true, file: 'src/flags.ts' },
    { name: 'LSP_INTEGRATION', description: 'Language Server Protocol', defaultEnabled: false, file: 'src/flags.ts' },
  ]

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Feature Flags</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Compile-time dead code elimination via Bun's <code>bun:bundle</code> feature flags.
      </p>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">All Flags</h2>
        <PropertyTable
          headers={['Flag', 'Description', 'Status']}
          rows={allFlags.map((f) => [
            f.name,
            f.description,
            f.defaultEnabled ? <Badge variant="green">Enabled</Badge> : <Badge variant="red">Disabled</Badge>,
          ])}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">How It Works</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Feature flags are evaluated at compile time by the Bun bundler. Code behind disabled flags
          is completely eliminated from the final build — it's as if it never existed. This keeps the
          binary size small and prevents accidental exposure of experimental features.
        </p>
      </section>
    </div>
  )
}
