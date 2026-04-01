import * as fs from 'fs'
import * as path from 'path'

const SOURCE_DIR = 'C:\\Users\\manju\\Downloads\\src\\src'
const OUTPUT_FILE = 'public/data/tasks-index.json'

interface TaskEntry {
  name: string
  type: string
  description: string
  file: string
}

function extractTasks(): TaskEntry[] {
  const tasksDir = path.join(SOURCE_DIR, 'tasks')
  const tasks: TaskEntry[] = []

  if (!fs.existsSync(tasksDir)) {
    console.log('Tasks directory not found')
    return []
  }

  const entries = fs.readdirSync(tasksDir, { withFileTypes: true })
  for (const entry of entries) {
    if (entry.isFile() && (entry.name.endsWith('.ts') || entry.name.endsWith('.tsx'))) {
      const name = path.basename(entry.name, path.extname(entry.name))
      tasks.push({
        name,
        type: 'task',
        description: `Task: ${name}`,
        file: `src/tasks/${entry.name}`,
      })
    }
  }

  return tasks
}

const tasks = extractTasks()

fs.writeFileSync(OUTPUT_FILE, JSON.stringify({ tasks }, null, 2))
console.log(`✅ Generated ${OUTPUT_FILE} with ${tasks.length} tasks`)
