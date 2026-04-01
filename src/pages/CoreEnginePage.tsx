import { CodeBlock } from '@/components/CodeBlock'
import { Callout } from '@/components/Callout'
import { PropertyTable } from '@/components/PropertyTable'

export function CoreEnginePage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Core Engine</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        The heart of Claude Code — entry point, CLI parsing, REPL, QueryEngine, state management, and Ink rendering.
      </p>

      <section id="entry-point" className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Entry Point & CLI</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          The application starts at <code>src/main.tsx</code>, which uses <strong>Commander.js</strong> for CLI argument parsing
          and initializes the React/Ink rendering context.
        </p>
        <CodeBlock language="typescript" code={`// main.tsx - Entry point
const program = new Command()
  .name('claude')
  .option('-m, --model <model>', 'Specify Claude model')
  .option('-p, --print', 'Non-interactive mode')
  .option('--fast', 'Enable fast mode')
  .action(async (opts) => {
    renderAndRun(program)
  })`} />
        <Callout variant="info" title="Runtime">
          Claude Code runs on the <strong>Bun</strong> runtime, which provides feature flags via <code>bun:bundle</code>
          for compile-time dead code elimination.
        </Callout>
      </section>

      <section id="repl" className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">REPL Screen</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          The main interactive screen is <code>screens/REPL.tsx</code> — a read-eval-print loop that handles:
        </p>
        <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300 mb-4">
          <li>User prompt input with slash command parsing</li>
          <li>Message display with virtualized list</li>
          <li>Tool call visualization</li>
          <li>Model picker and status bar</li>
          <li>Vim mode and keybinding support</li>
        </ul>
      </section>

      <section id="query-engine" className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">QueryEngine</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          <code>QueryEngine.ts</code> (~47KB) is the LLM orchestration engine. It manages:
        </p>
        <PropertyTable
          headers={['Responsibility', 'Description']}
          rows={[
            ['Context Setup', 'Loads system prompt and conversation history'],
            ['Message Processing', 'Parses user input for commands'],
            ['Tool Assembly', 'Gathers available tools with permission filtering'],
            ['Permission Check', 'Validates tool access before model sees them'],
            ['API Communication', 'Sends/receives messages to Anthropic API'],
            ['Result Handling', 'Maps tool results back to the model'],
          ]}
        />
      </section>

      <section id="state-management" className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">State Management</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Centralized <code>AppState</code> store (<code>state/AppStateStore.ts</code>) uses a Zustand-like pattern:
        </p>
        <CodeBlock language="typescript" code={`// AppState pattern
const store = createStore({
  session: null,
  messages: [],
  tasks: [],
  permissions: {},
  settings: {},
})

// Selectors for reactive updates
const useSession = () => store.useSelector(s => s.session)`} />
      </section>

      <section id="ink-rendering" className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Ink Rendering Engine</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          The <code>ink/</code> directory contains a customized terminal rendering engine (~40 files):
        </p>
        <PropertyTable
          headers={['Component', 'Purpose']}
          rows={[
            ['termio', 'Terminal I/O parsing and escape sequence handling'],
            ['layout', 'Flexbox layout engine using Yoga'],
            ['reconciliation', 'React-like diffing for terminal output'],
            ['rendering', 'Actual terminal buffer writing'],
          ]}
        />
        <Callout variant="tip" title="Custom Ink">
          This is a heavily customized/forked version of Ink with its own layout engine, reconciliation, and rendering pipeline — not the standard Ink library.
        </Callout>
      </section>
    </div>
  )
}
