import * as fs from 'fs'
import * as path from 'path'

const SOURCE_DIR = 'C:\\Users\\manju\\Downloads\\src\\src'
const OUTPUT_FILE = 'public/data/components-index.json'

interface ComponentEntry {
  name: string
  file: string
  description: string
  category: string
}

function categorizeComponent(name: string, dir: string): string {
  const lower = name.toLowerCase()
  if (lower.includes('message')) return 'messages'
  if (lower.includes('prompt') || lower.includes('input')) return 'input'
  if (lower.includes('model') || lower.includes('theme') || lower.includes('setting')) return 'settings'
  if (lower.includes('task')) return 'tasks'
  if (lower.includes('status')) return 'status'
  if (lower.includes('diff')) return 'rendering'
  if (lower.includes('markdown')) return 'rendering'
  if (lower.includes('dialog') || lower.includes('trust') || lower.includes('onboard')) return 'dialogs'
  if (lower.includes('permission')) return 'dialogs'
  if (lower.includes('mcp')) return 'settings'
  if (lower.includes('spinner') || lower.includes('loading')) return 'feedback'
  return dir || 'other'
}

function extractComponents(): ComponentEntry[] {
  const componentsDir = path.join(SOURCE_DIR, 'components')
  const components: ComponentEntry[] = []

  if (!fs.existsSync(componentsDir)) {
    console.log('Components directory not found')
    return []
  }

  function scanDir(dir: string, relativePath: string) {
    const entries = fs.readdirSync(dir, { withFileTypes: true })
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name)
      if (entry.isDirectory()) {
        scanDir(fullPath, path.join(relativePath, entry.name))
      } else if (entry.name.endsWith('.tsx') || entry.name.endsWith('.ts')) {
        const name = path.basename(entry.name, path.extname(entry.name))
        if (name.startsWith('.') || name === 'index') continue
        components.push({
          name,
          file: `src/${relativePath}/${entry.name}`,
          description: `React component: ${name}`,
          category: categorizeComponent(name, relativePath.split(path.sep)[0]),
        })
      }
    }
  }

  scanDir(componentsDir, 'src/components')
  return components
}

const components = extractComponents()

fs.writeFileSync(OUTPUT_FILE, JSON.stringify({ components }, null, 2))
console.log(`✅ Generated ${OUTPUT_FILE} with ${components.length} components`)
