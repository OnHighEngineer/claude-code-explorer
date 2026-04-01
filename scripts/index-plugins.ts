import * as fs from 'fs'
import * as path from 'path'

const SOURCE_DIR = 'C:\\Users\\manju\\Downloads\\src\\src'
const OUTPUT_FILE = 'public/data/plugins-index.json'

interface PluginEntry {
  name: string
  file: string
  description: string
}

function extractPlugins(): PluginEntry[] {
  const pluginsDir = path.join(SOURCE_DIR, 'plugins')
  const plugins: PluginEntry[] = []

  if (!fs.existsSync(pluginsDir)) {
    console.log('Plugins directory not found')
    return []
  }

  const entries = fs.readdirSync(pluginsDir, { withFileTypes: true })
  for (const entry of entries) {
    if (entry.isDirectory()) {
      plugins.push({
        name: entry.name,
        file: `src/plugins/${entry.name}/`,
        description: `Plugin: ${entry.name}`,
      })
    }
  }

  return plugins
}

const plugins = extractPlugins()

fs.writeFileSync(OUTPUT_FILE, JSON.stringify({ plugins }, null, 2))
console.log(`✅ Generated ${OUTPUT_FILE} with ${plugins.length} plugins`)
