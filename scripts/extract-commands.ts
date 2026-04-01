import * as fs from 'fs'
import * as path from 'path'

const COMMANDS_DIR = 'c:/Users/manju/.gemini/antigravity/scratch/claude-code/src/commands'
const OUTPUT_DIR = 'public/data'

interface CommandEntry {
  name: string
  file: string
  description: string
  aliases?: string[]
  category?: string
}

function scanCommands(): CommandEntry[] {
  const commands: CommandEntry[] = []

  try {
    const entries = fs.readdirSync(COMMANDS_DIR, { withFileTypes: true })

    for (const entry of entries) {
      let commandName = entry.name.replace(/\-/g, ' ').replace(/\.js$/, '')
      commandName = commandName.replace(/\.tsx?$/, '')

      let description = 'A Claude Code command'

      if (entry.isDirectory()) {
        const indexPath = path.join(COMMANDS_DIR, entry.name, 'index.ts')
        const indexTsxPath = path.join(COMMANDS_DIR, entry.name, 'index.tsx')
        let filePath = fs.existsSync(indexPath)
          ? indexPath
          : fs.existsSync(indexTsxPath)
            ? indexTsxPath
            : null

        if (filePath) {
          try {
            const content = fs.readFileSync(filePath, 'utf-8')
            const descMatch = content.match(/description[:\s]*['"]([^'"]+)['"]/i)
            if (descMatch) {
              description = descMatch[1]
            }
          } catch (err) {
            console.warn(`Could not read ${filePath}`)
          }

          commands.push({
            name: commandName,
            file: path.relative(
              'c:/Users/manju/.gemini/antigravity/scratch/claude-code',
              filePath
            ),
            description,
            category: 'command',
          })
        }
      } else if (entry.name.endsWith('.ts') || entry.name.endsWith('.tsx')) {
        const filePath = path.join(COMMANDS_DIR, entry.name)

        try {
          const content = fs.readFileSync(filePath, 'utf-8')
          const descMatch = content.match(/description[:\s]*['"]([^'"]+)['"]/i)
          if (descMatch) {
            description = descMatch[1]
          }
        } catch (err) {
          console.warn(`Could not read ${filePath}`)
        }

        commands.push({
          name: commandName,
          file: path.relative(
            'c:/Users/manju/.gemini/antigravity/scratch/claude-code',
            filePath
          ),
          description,
          category: 'command',
        })
      }
    }
  } catch (err) {
    console.error('Error scanning commands:', err)
  }

  return commands.sort((a, b) => a.name.localeCompare(b.name))
}

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true })
}

console.log('Extracting commands...')
const commands = scanCommands()

const commandsIndex = { commands }

fs.writeFileSync(
  path.join(OUTPUT_DIR, 'commands-index.json'),
  JSON.stringify(commandsIndex, null, 2)
)

console.log(`✓ Generated commands-index.json (${commands.length} commands)`)
