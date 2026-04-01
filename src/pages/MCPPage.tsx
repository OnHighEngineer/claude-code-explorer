import { Callout } from '@/components/Callout'
import { PropertyTable } from '@/components/PropertyTable'

export function MCPPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">MCP (Model Context Protocol)</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Third-party tool and resource server integration via the Model Context Protocol.
      </p>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">What is MCP?</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          MCP is a protocol that allows external servers to expose tools and resources to Claude Code.
          This enables third-party integrations without modifying the core codebase.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">MCP Commands</h2>
        <PropertyTable
          headers={['Command', 'Description']}
          rows={[
            ['/mcp add', 'Add a new MCP server'],
            ['/mcp list', 'List configured MCP servers'],
            ['/mcp remove', 'Remove an MCP server'],
            ['/mcp auth', 'Authenticate with an MCP server'],
            ['/mcp serve', 'Start the MCP server'],
          ]}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">MCP Architecture</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
          <li><strong>MCP Client</strong> — Connects to external MCP servers</li>
          <li><strong>Resource Discovery</strong> — Lists available resources from servers</li>
          <li><strong>Tool Integration</strong> — MCP tools appear alongside built-in tools</li>
          <li><strong>Configuration</strong> — Server configs stored in settings</li>
          <li><strong>Authentication</strong> — OAuth and API key support</li>
        </ul>
      </section>

      <Callout variant="tip" title="Claude.ai MCP Config">
        Claude Code can fetch MCP configuration from Claude.ai, allowing centralized server management.
      </Callout>
    </div>
  )
}
