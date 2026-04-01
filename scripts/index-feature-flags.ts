import * as fs from 'fs'
import * as path from 'path'

const SOURCE_DIR = 'C:\\Users\\manju\\Downloads\\src\\src'
const OUTPUT_FILE = 'public/data/feature-flags-index.json'

interface FeatureFlagEntry {
  name: string
  description: string
  defaultEnabled: boolean
  file: string
}

function extractFeatureFlags(): FeatureFlagEntry[] {
  const flags: FeatureFlagEntry[] = [
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

  // Try to find more flags from source files
  const mainFile = path.join(SOURCE_DIR, 'main.tsx')
  if (fs.existsSync(mainFile)) {
    const content = fs.readFileSync(mainFile, 'utf-8')
    const flagMatches = content.match(/feature\(['"]([^'"]+)['"]\)/g)
    if (flagMatches) {
      const existingNames = new Set(flags.map((f) => f.name))
      for (const match of flagMatches) {
        const name = match.match(/feature\(['"]([^'"]+)['"]\)/)?.[1]
        if (name && !existingNames.has(name)) {
          flags.push({
            name,
            description: `Feature flag: ${name}`,
            defaultEnabled: false,
            file: 'src/main.tsx',
          })
          existingNames.add(name)
        }
      }
    }
  }

  return flags
}

const flags = extractFeatureFlags()

fs.writeFileSync(OUTPUT_FILE, JSON.stringify({ flags }, null, 2))
console.log(`✅ Generated ${OUTPUT_FILE} with ${flags.length} feature flags`)
