import { Terminal, Code, Monitor, Smartphone, Server, Globe } from 'lucide-react'

export function MultiClientPage() {
  const clients = [
    { icon: Terminal, name: 'CLI', desc: 'Primary terminal interface', details: 'The main way users interact with Claude Code' },
    { icon: Code, name: 'SDK', desc: 'TypeScript & Python SDKs', details: 'Programmatic access for automation' },
    { icon: Monitor, name: 'VS Code Extension', desc: 'IDE integration', details: 'Embedded Claude Code in VS Code' },
    { icon: Globe, name: 'Desktop App', desc: 'Standalone desktop application', details: 'Full-featured desktop client' },
    { icon: Smartphone, name: 'Mobile', desc: 'Mobile client via Bridge mode', details: 'Connect from mobile devices' },
    { icon: Server, name: 'Remote', desc: 'Remote sessions (CCR)', details: 'Connect to remote Claude Code instances' },
  ]

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Multi-Client Support</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Claude Code works across multiple platforms and interfaces.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {clients.map((client) => {
          const Icon = client.icon
          return (
            <div key={client.name} className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-5">
              <Icon className="w-6 h-6 text-gray-700 dark:text-gray-300 mb-3" />
              <h3 className="font-semibold text-gray-900 dark:text-white">{client.name}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{client.desc}</p>
              <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">{client.details}</p>
            </div>
          )
        })}
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Remote Sessions</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Claude Code Remote (CCR) allows connecting to remote instances:
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
          <li><strong>SSH</strong> — <code>claude ssh &lt;host&gt;</code></li>
          <li><strong>Direct Connect</strong> — <code>cc://</code> URLs</li>
          <li><strong>Bridge Mode</strong> — Mobile/web client connectivity</li>
          <li><strong>Teleport</strong> — Remote session branching</li>
        </ul>
      </section>
    </div>
  )
}
