import { Callout } from '@/components/Callout'
import { PropertyTable } from '@/components/PropertyTable'

export function PermissionsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Permissions</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Granular tool permission system that protects tool execution.
      </p>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Permission Modes</h2>
        <PropertyTable
          headers={['Mode', 'Behavior']}
          rows={[
            ['default', 'Ask user for approval before each tool use'],
            ['plan', 'Ask for permission in planning mode only'],
            ['auto', 'Allow trusted tools automatically'],
            ['acceptEdits', 'Auto-accept file edits, ask for other tools'],
            ['bypassPermissions', 'Skip all permission checks (dev only)'],
          ]}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Permission Flow</h2>
        <div className="space-y-4">
          {[
            { step: '1', title: 'Tool Filtering', desc: 'Tools are filtered by permission context before the model sees them' },
            { step: '2', title: 'Deny Rules', desc: 'Deny rules are applied at the registry level — tools can be blocked entirely' },
            { step: '3', title: 'Input Validation', desc: 'Tool input is validated against Zod schema' },
            { step: '4', title: 'Tool-Specific Check', desc: 'Custom permission validators run for specific tools' },
            { step: '5', title: 'User Approval', desc: 'If in ask mode, user can approve or deny with prompts' },
            { step: '6', title: 'Execution or Denial', desc: 'Tool executes if approved, otherwise returns error' },
          ].map((item) => (
            <div key={item.step} className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 flex items-center justify-center font-bold flex-shrink-0">
                {item.step}
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">{item.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Safety Checks</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
          <li><strong>BashTool</strong> — Destructive command detection, command injection prevention</li>
          <li><strong>FileEditTool</strong> — Protected file patterns</li>
          <li><strong>Commands</strong> — Restricted to intended purpose</li>
        </ul>
      </section>

      <Callout variant="warning" title="Security">
        Deny rules prevent tools from being visible to the model entirely. This is the strongest form of permission control — the model never knows the tool exists.
      </Callout>
    </div>
  )
}
