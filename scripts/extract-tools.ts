import * as fs from 'fs'
import * as path from 'path'

const TOOLS_DIR = 'c:/Users/manju/.gemini/antigravity/scratch/claude-code/src/tools'
const OUTPUT_DIR = 'public/data'

interface ToolEntry {
  name: string
  file: string
  description: string
  inputs?: Record<string, { type: string; description?: string }>
  permissions?: string[]
  category?: string
}

function extractToolName(dirName: string): string {
  return dirName
    .replace(/Tool$/, '')
    .replace(/([A-Z])/g, ' $1')
    .trim()
}

function scanTools(): ToolEntry[] {
  const tools: ToolEntry[] = []

  try {
    const dirs = fs.readdirSync(TOOLS_DIR, { withFileTypes: true })

    for (const entry of dirs) {
      if (entry.isDirectory() && entry.name.endsWith('Tool')) {
        const toolName = entry.name.replace(/Tool$/, '')
        const indexPath = path.join(TOOLS_DIR, entry.name, 'index.ts')
        const mainPath = path.join(TOOLS_DIR, entry.name, entry.name + '.tsx')
        const filePath = fs.existsSync(indexPath) ? indexPath : mainPath

        let content = ''
        let description = 'A Claude Code tool'

        try {
          content = fs.readFileSync(filePath, 'utf-8')

          // Try to extract description from comments or JSDoc
          const docMatch = content.match(/\/\*\*[\s\S]*?description[:\s]+([^\n]+)/i)
          if (docMatch) {
            description = docMatch[1].trim()
          } else if (content.includes('description')) {
            const descMatch = content.match(/description[:\s]+['"]([^'"]+)['"]/i)
            if (descMatch) {
              description = descMatch[1]
            }
          }
        } catch (err) {
          console.warn(`Could not read ${filePath}:`, err)
        }

        tools.push({
          name: toolName,
          file: path.relative(
            'c:/Users/manju/.gemini/antigravity/scratch/claude-code',
            filePath
          ),
          description: description,
          category: 'tool',
        })
      }
    }
  } catch (err) {
    console.error('Error scanning tools:', err)
  }

  return tools.sort((a, b) => a.name.localeCompare(b.name))
}

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true })
}

console.log('Extracting tools...')
const tools = scanTools()

const toolsIndex = { tools }

fs.writeFileSync(
  path.join(OUTPUT_DIR, 'tools-index.json'),
  JSON.stringify(toolsIndex, null, 2)
)

console.log(`✓ Generated tools-index.json (${tools.length} tools)`)
