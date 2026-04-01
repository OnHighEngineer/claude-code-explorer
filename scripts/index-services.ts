import * as fs from 'fs'
import * as path from 'path'

const SOURCE_DIR = 'C:\\Users\\manju\\Downloads\\src\\src'
const OUTPUT_FILE = 'public/data/services-index.json'

interface ServiceEntry {
  name: string
  file: string
  description: string
  category: string
  responsibilities?: string[]
}

function extractServices(): ServiceEntry[] {
  const servicesDir = path.join(SOURCE_DIR, 'services')
  const services: ServiceEntry[] = []

  if (!fs.existsSync(servicesDir)) {
    console.log('Services directory not found')
    return []
  }

  const entries = fs.readdirSync(servicesDir, { withFileTypes: true })
  for (const entry of entries) {
    if (entry.isDirectory()) {
      services.push({
        name: entry.name.charAt(0).toUpperCase() + entry.name.slice(1),
        file: `src/services/${entry.name}/`,
        description: `Service: ${entry.name}`,
        category: entry.name,
      })
    }
  }

  return services
}

const services = extractServices()

fs.writeFileSync(OUTPUT_FILE, JSON.stringify({ services }, null, 2))
console.log(`✅ Generated ${OUTPUT_FILE} with ${services.length} services`)
