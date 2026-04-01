import * as fs from 'fs'
import * as path from 'path'

const SOURCE_DIR = 'C:\\Users\\manju\\Downloads\\src\\src'
const OUTPUT_FILE = 'public/data/screens-index.json'

interface ScreenEntry {
  name: string
  file: string
  description: string
  purpose: string
  features?: string[]
  relatedComponents?: string[]
}

function extractScreens(): ScreenEntry[] {
  const screensDir = path.join(SOURCE_DIR, 'screens')
  const screens: ScreenEntry[] = []

  if (!fs.existsSync(screensDir)) {
    console.log('Screens directory not found, using defaults')
    return [
      {
        name: 'REPL',
        file: 'src/screens/REPL.tsx',
        description: 'Main interactive read-eval-print loop screen',
        purpose: 'Primary user interaction interface',
        features: ['Virtualized message list', 'Prompt input with slash commands', 'Tool call visualization', 'Model picker', 'Status bar', 'Vim mode'],
      },
      {
        name: 'Doctor',
        file: 'src/screens/Doctor.tsx',
        description: 'Diagnostic and troubleshooting screen',
        purpose: 'Debug and diagnose issues',
        features: ['System checks', 'Auth verification', 'Network diagnostics'],
      },
      {
        name: 'ResumeConversation',
        file: 'src/screens/ResumeConversation.tsx',
        description: 'Session resume chooser',
        purpose: 'Resume previous sessions',
        features: ['Session listing', 'Conversation preview', 'Resume with context'],
      },
    ]
  }

  const files = fs.readdirSync(screensDir).filter((f) => f.endsWith('.tsx') || f.endsWith('.ts'))

  for (const file of files) {
    const filePath = path.join(screensDir, file)
    const content = fs.readFileSync(filePath, 'utf-8')
    const name = path.basename(file, path.extname(file))

    screens.push({
      name,
      file: `src/screens/${file}`,
      description: `Screen component: ${name}`,
      purpose: 'Terminal UI screen',
    })
  }

  return screens
}

const screens = extractScreens()

fs.writeFileSync(OUTPUT_FILE, JSON.stringify({ screens }, null, 2))
console.log(`✅ Generated ${OUTPUT_FILE} with ${screens.length} screens`)
