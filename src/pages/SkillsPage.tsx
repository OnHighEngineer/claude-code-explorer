export function SkillsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Skills</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Skills are reusable capability definitions that extend Claude Code's abilities.
      </p>

      <div className="space-y-8">
        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">What are Skills?</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Skills are markdown files in <code>/skills/</code> and <code>/commands/</code> directories that define
            specialized capabilities. They can be:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
            <li><strong>Bundled skills</strong> — Shipped with Claude Code</li>
            <li><strong>Plugin skills</strong> — Loaded from installed plugins</li>
            <li><strong>Project skills</strong> — Defined in the current project</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Skill Structure</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Each skill defines:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
            <li>Trigger patterns (when the skill activates)</li>
            <li>Instructions for the model</li>
            <li>Associated tools or commands</li>
            <li>Input/output specifications</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Using Skills</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Skills can be invoked via the <code>/skills</code> slash command or triggered automatically
            based on user input patterns. The SkillTool manages skill discovery and execution.
          </p>
        </section>
      </div>
    </div>
  )
}
