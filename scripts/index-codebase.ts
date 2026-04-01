import * as fs from 'fs'
import * as path from 'path'
import * as ts from 'typescript'

const CLAUDE_CODE_SRC = 'c:/Users/manju/.gemini/antigravity/scratch/claude-code/src'
const OUTPUT_DIR = 'public/data'

interface FileData {
  path: string
  lines: number
  exports: string[]
  functions: string[]
  classes: string[]
  interfaces: string[]
  types: string[]
  imports: string[]
  category: string
  description?: string
}

function categorizeFile(filePath: string): string {
  if (filePath.includes('/tools/')) return 'tool'
  if (filePath.includes('/commands/')) return 'command'
  if (filePath.includes('/services/')) return 'service'
  if (filePath.includes('/components/')) return 'component'
  if (filePath.includes('/hooks/')) return 'hook'
  if (filePath.includes('/utils/')) return 'util'
  if (
    filePath === 'QueryEngine.ts' ||
    filePath === 'Tool.ts' ||
    filePath === 'commands.ts' ||
    filePath === 'tools.ts' ||
    filePath === 'main.tsx'
  )
    return 'core'
  return 'other'
}

function extractMetadata(filePath: string, content: string): FileData {
  const sourceFile = ts.createSourceFile(
    filePath,
    content,
    ts.ScriptTarget.Latest,
    true
  )

  const data: FileData = {
    path: filePath,
    lines: content.split('\n').length,
    exports: [],
    functions: [],
    classes: [],
    interfaces: [],
    types: [],
    imports: [],
    category: categorizeFile(filePath),
  }

  interface NamedNode extends ts.Node {
    name?: ts.Identifier | ts.PrivateIdentifier
  }

  function visit(node: ts.Node) {
    const modifiers = ts.getModifiers(node) || []
    const isExported = modifiers.some((m) => m.kind === ts.SyntaxKind.ExportKeyword)

    if (ts.isClassDeclaration(node) && node.name) {
      data.classes.push(node.name.text)
      if (isExported) {
        data.exports.push(node.name.text)
      }
    } else if (ts.isFunctionDeclaration(node) && node.name) {
      data.functions.push(node.name.text)
      if (isExported) {
        data.exports.push(node.name.text)
      }
    } else if (ts.isInterfaceDeclaration(node) && node.name) {
      data.interfaces.push(node.name.text)
      if (isExported) {
        data.exports.push(node.name.text)
      }
    } else if (ts.isTypeAliasDeclaration(node) && node.name) {
      data.types.push(node.name.text)
      if (isExported) {
        data.exports.push(node.name.text)
      }
    } else if (ts.isImportDeclaration(node)) {
      if (node.importClause && node.moduleSpecifier) {
        const moduleSpecifier = ts.isStringLiteral(node.moduleSpecifier)
          ? node.moduleSpecifier.text
          : ''
        if (moduleSpecifier) {
          data.imports.push(moduleSpecifier)
        }
      }
    } else if (ts.isExportAssignment(node)) {
      // Handle export default / export =
      if ('expression' in node) {
        const expr = (node as any).expression
        if (expr && 'name' in expr && 'text' in expr.name) {
          data.exports.push(expr.name.text)
        }
      }
    }

    ts.forEachChild(node, visit)
  }

  visit(sourceFile)

  return data
}

function scanDirectory(dir: string, baseDir: string = dir): FileData[] {
  const results: FileData[] = []

  try {
    const entries = fs.readdirSync(dir, { withFileTypes: true })

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name)
      const relativePath = path.relative(baseDir, fullPath)

      if (entry.isDirectory()) {
        if (!entry.name.startsWith('.') && entry.name !== 'node_modules') {
          results.push(...scanDirectory(fullPath, baseDir))
        }
      } else if (entry.name.endsWith('.ts') || entry.name.endsWith('.tsx')) {
        try {
          const content = fs.readFileSync(fullPath, 'utf-8')
          const metadata = extractMetadata(relativePath, content)
          results.push(metadata)
        } catch (err) {
          console.error(`Error processing ${fullPath}:`, err)
        }
      }
    }
  } catch (err) {
    console.error(`Error scanning directory ${dir}:`, err)
  }

  return results
}

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true })
}

console.log('Scanning claude-code repository...')
const files = scanDirectory(CLAUDE_CODE_SRC)

console.log(`Found ${files.length} TypeScript files`)

const indexData = {
  files: files,
  lastUpdated: new Date().toISOString(),
}

fs.writeFileSync(
  path.join(OUTPUT_DIR, 'file-index.json'),
  JSON.stringify(indexData, null, 2)
)

console.log(`✓ Generated file-index.json (${files.length} files)`)
