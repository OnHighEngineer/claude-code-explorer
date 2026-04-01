import { PropertyTable } from '@/components/PropertyTable'

export function SettingsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Settings</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Multi-source configuration with hot-reload support.
      </p>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Settings Hierarchy</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Settings are resolved from multiple sources in priority order:
        </p>
        <PropertyTable
          headers={['Source', 'Scope', 'Priority']}
          rows={[
            ['Global', 'User-wide', 'Lowest'],
            ['Project', 'Per-project (.claude/)', 'Medium'],
            ['Policy', 'Organization policy', 'High'],
            ['Remote-Managed', 'Server-managed', 'Higher'],
            ['MDM', 'Mobile Device Management', 'Highest'],
          ]}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Features</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
          <li><strong>Hot-reload</strong> — Settings are reloaded when config files change</li>
          <li><strong>Change detection</strong> — Detects and reacts to configuration changes</li>
          <li><strong>Multi-source resolution</strong> — Settings from all sources are merged</li>
          <li><strong>Validation</strong> — Settings are validated against schemas</li>
        </ul>
      </section>
    </div>
  )
}
