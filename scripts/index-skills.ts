import * as fs from 'fs'
import * as path from 'path'

const SOURCE_DIR = 'C:\\Users\\manju\\Downloads\\src\\src'
const OUTPUT_FILE = 'public/data/skills-index.json'

interface SkillEntry {
  name: string
  file: string
  description: string
  category: string
}

function extractSkills(): SkillEntry[] {
  const skillsDir = path.join(SOURCE_DIR, 'skills')
  const skills: SkillEntry[] = []

  if (!fs.existsSync(skillsDir)) {
    console.log('Skills directory not found')
    return []
  }

  const entries = fs.readdirSync(skillsDir, { withFileTypes: true })
  for (const entry of entries) {
    if (entry.isDirectory()) {
      skills.push({
        name: entry.name,
        file: `src/skills/${entry.name}/`,
        description: `Skill: ${entry.name}`,
        category: 'skill',
      })
    }
  }

  return skills
}

const skills = extractSkills()

fs.writeFileSync(OUTPUT_FILE, JSON.stringify({ skills }, null, 2))
console.log(`✅ Generated ${OUTPUT_FILE} with ${skills.length} skills`)
