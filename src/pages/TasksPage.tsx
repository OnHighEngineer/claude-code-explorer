import { PropertyTable } from '@/components/PropertyTable'

export function TasksPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Tasks</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Claude Code's polymorphic task system for parallel and collaborative work.
      </p>

      <section id="task-types" className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Task Types</h2>
        <PropertyTable
          headers={['Type', 'Description']}
          rows={[
            ['local_bash', 'Execute shell commands on the local machine'],
            ['local_agent', 'Spawn a sub-agent running locally'],
            ['remote_agent', 'Spawn an agent on a remote session'],
            ['in_process_teammate', 'Multi-agent collaboration within the same process'],
            ['local_workflow', 'Execute workflow scripts'],
            ['monitor_mcp', 'Monitor MCP server health'],
            ['dream', 'Experimental agent mode'],
          ]}
        />
      </section>

      <section id="lifecycle" className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Task Lifecycle</h2>
        <div className="space-y-4">
          {[
            { step: '1', title: 'Creation', desc: 'Task is created via TaskCreateTool or internal API with type, config, and initial input' },
            { step: '2', title: 'Scheduling', desc: 'Task is queued and assigned to an appropriate executor based on type' },
            { step: '3', title: 'Execution', desc: 'Task runs asynchronously, reporting progress and intermediate results' },
            { step: '4', title: 'Output', desc: 'Task output is collected and made available via TaskOutput tool' },
            { step: '5', title: 'Completion', desc: 'Task is marked complete, resources are cleaned up, results are returned' },
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

      <section id="agent-swarm" className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Agent Swarms & Teammates</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Claude Code supports multi-agent collaboration through:
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
          <li><strong>TeamCreateTool</strong> — Create new team members (agents)</li>
          <li><strong>TeamDeleteTool</strong> — Remove team members</li>
          <li><strong>SendMessageTool</strong> — Send messages between agents</li>
          <li><strong>Coordinator mode</strong> — Orchestrate multiple workers</li>
        </ul>
      </section>
    </div>
  )
}
