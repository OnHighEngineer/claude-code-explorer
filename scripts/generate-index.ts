import { spawn } from 'child_process'
import * as fs from 'fs'

async function runScript(script: string): Promise<void> {
  return new Promise((resolve, reject) => {
    console.log(`▶ Running ${script}...`)
    const proc = spawn('tsx', [script], {
      stdio: 'inherit',
      shell: true,
    })

    proc.on('close', (code) => {
      if (code === 0) resolve()
      else reject(new Error(`Script ${script} failed with code ${code}`))
    })
  })
}

async function main() {
  console.log('Starting codebase indexing pipeline...\n')

  try {
    if (!fs.existsSync('public/data')) {
      fs.mkdirSync('public/data', { recursive: true })
    }

    await runScript('scripts/index-codebase.ts')
    await runScript('scripts/extract-tools.ts')
    await runScript('scripts/extract-commands.ts')
    await runScript('scripts/index-screens.ts')
    await runScript('scripts/index-components.ts')
    await runScript('scripts/index-services.ts')
    await runScript('scripts/index-tasks.ts')
    await runScript('scripts/index-skills.ts')
    await runScript('scripts/index-plugins.ts')
    await runScript('scripts/index-feature-flags.ts')

    console.log('\n✅ All indexing complete!')
    console.log('📊 Generated index files:')
    console.log('  - public/data/file-index.json')
    console.log('  - public/data/tools-index.json')
    console.log('  - public/data/commands-index.json')
    console.log('  - public/data/screens-index.json')
    console.log('  - public/data/components-index.json')
    console.log('  - public/data/services-index.json')
    console.log('  - public/data/tasks-index.json')
    console.log('  - public/data/skills-index.json')
    console.log('  - public/data/plugins-index.json')
    console.log('  - public/data/feature-flags-index.json')
  } catch (err) {
    console.error('❌ Indexing failed:', err)
    process.exit(1)
  }
}

main()
