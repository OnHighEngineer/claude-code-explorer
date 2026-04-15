# Claude Code Explorer

An interactive web-based explorer for understanding the Claude Code codebase. Search tools, commands, files, and learn how Claude Code works internally through visual diagrams and educational learning paths.

## Features

- **🔍 Full-Text Search** - Search across 1,900+ files, functions, tools, and commands
- **🔨 Tools Catalog** - Browse all 40+ tools with descriptions, permissions, and safety features
- **⌘ Commands Registry** - Explore 50+ slash commands with usage examples
- **📁 Files Browser** - Tree view of the entire `src/` directory with metadata
- **🔄 Execution Flow** - Visual guide to how queries are processed
- **🏗️ Architecture** - Understand the service layer and system design
- **📚 Learning Paths** - Guided tours for different learning objectives
- **⭐ Favorites** - Bookmark tools and files for quick access

## Tech Stack

- **Frontend**: React 18 + TypeScript + Tailwind CSS
- **Search**: Lunr.js (full-text search in browser)
- **Build**: Vite
- **No Backend**: Pure static files, zero server needed

## Getting Started

### Prerequisites

- Node.js 18+ (or Bun 1.0+)
- npm or bun package manager

### Installation

```bash
# Clone and enter the directory
cd claude-code-explorer

# Install dependencies
npm install
# or with bun:
bun install
```

### Building the Index

Generate searchable metadata from the Claude Code codebase:

```bash
npm run index
```

This scans the source code at:
```
c:/Users/manju/.gemini/antigravity/scratch/claude-code/src
```

And generates:
- `public/data/file-index.json` - All files + metadata
- `public/data/tools-index.json` - Tool catalog
- `public/data/commands-index.json` - Command registry

### Development

Start the dev server with hot reload:

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

### Production Build

```bash
npm run build
```

This runs indexing + Vite build and outputs to `dist/`

### Deployment

Deploy the static files to any host:

#### GitHub Pages

```bash
npm run build
# Push dist/ to gh-pages branch
npx gh-pages -d dist
```

#### Vercel

```bash
npm run build
# Deploy dist/ folder
vercel --prod
```

#### S3/CloudFront

```bash
npm run build
aws s3 sync dist/ s3://your-bucket/
```

## Project Structure

```
claude-code-explorer/
├── public/
│   └── data/ (generated files)
│       ├── file-index.json
│       ├── tools-index.json
│       └── commands-index.json
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── components/
│   │   ├── SearchBox.tsx
│   │   ├── Sidebar.tsx
│   │   ├── CodeSnippet.tsx
│   │   └── ToolCard.tsx
│   ├── pages/
│   │   ├── SearchPage.tsx
│   │   ├── ToolsPage.tsx
│   │   ├── CommandsPage.tsx
│   │   ├── FilesPage.tsx
│   │   ├── ExecutionFlowPage.tsx
│   │   ├── ArchitecturePage.tsx
│   │   └── Learning.tsx
│   ├── hooks/
│   │   ├── useIndexData.ts
│   │   ├── useSearch.ts
│   │   └── useFavorites.ts
│   ├── types/
│   │   └── index.ts
│   └── styles/
│       └── globals.css
├── scripts/
│   ├── index-codebase.ts
│   ├── extract-tools.ts
│   ├── extract-commands.ts
│   └── generate-index.ts
├── index.html
├── vite.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

## How It Works

### Build Time

1. **Indexing Scripts** scan the source code
2. Extract metadata (classes, functions, exports, imports)
3. Generate JSON index files
4. Vite bundles React app with embedded indices
5. All data is compiled into the app at build time

### Runtime

- Browser loads HTML + JS bundle
- Lunr.js index loads into memory
- Search is instant, fully offline
- No API calls needed

## Features

### Search

- Search by file name, function name, tool name, or command
- Results show type, description, and source file
- Click to navigate to relevant page

### Tools Catalog

- Grid/list of all 40+ tools
- Filter by category or search
- View permissions, inputs, and safety features
- Link to GitHub source

### Commands Registry

- Table of all 50+ slash commands
- Search and filter by category
- Usage examples and aliases
- Link to implementations

### Files Browser

- Tree view of `src/` directory
- Click files to view:
  - Line count and category
  - Exported classes and functions
  - Import list
  - Related metadata

### Execution Flow

- Step-by-step breakdown of query processing
- Links to relevant source files
- Code snippets with syntax highlighting
- Deep dive into each stage

### Architecture

- System overview diagram
- Service layer explanations
- Key file locations
- Important concepts

### Learning

- 5 guided learning paths
- Covers:
  - Query processing flow
  - Tool system design
  - Permission model
  - Command system
  - Architecture overview
- Each path: 5-15 min duration

## Customization

### Change Source Path

Edit `scripts/index-codebase.ts`:

```typescript
const CLAUDE_CODE_SRC = 'path/to/your/codebase/src'
```

### Add More Learning Paths

Edit `src/pages/Learning.tsx` and add to the `paths` array.

### Customize Styling

Edit `src/styles/globals.css` and `tailwind.config.ts`.

## Performance

- Load time: < 2 seconds
- Search results: < 500ms
- Fully offli
- Works on older browsers (ES2020+)

## License

This project is built to explore and understand the Claude Code codebase for educational purposes.
