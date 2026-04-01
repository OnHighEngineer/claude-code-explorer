export function PluginsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Plugins</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Extend Claude Code with third-party plugins.
      </p>

      <div className="space-y-8">
        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Plugin System</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Plugins are npm packages that extend Claude Code with new commands, tools, skills, and UI components.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Plugin Commands</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 mb-4">
            <li><code>/plugin list</code> — Show installed plugins</li>
            <li><code>/plugin install &lt;name&gt;</code> — Install a plugin</li>
            <li><code>/plugin update &lt;name&gt;</code> — Update a plugin</li>
            <li><code>/plugin remove &lt;name&gt;</code> — Remove a plugin</li>
            <li><code>/reload-plugins</code> — Reload all plugins</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">What Plugins Can Add</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
            <li>New slash commands</li>
            <li>New tools for the model</li>
            <li>New skills and workflows</li>
            <li>Custom UI components</li>
            <li>Settings and configuration</li>
          </ul>
        </section>
      </div>
    </div>
  )
}
