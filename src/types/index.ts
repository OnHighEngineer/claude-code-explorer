export interface FileEntry {
  path: string
  lines: number
  exports: string[]
  functions: string[]
  classes: string[]
  interfaces: string[]
  types: string[]
  imports: string[]
  category: 'core' | 'tool' | 'command' | 'service' | 'component' | 'util' | 'hook' | 'other'
  description?: string
}

export interface FileIndex {
  files: FileEntry[]
  lastUpdated: string
}

export interface ToolInput {
  [key: string]: {
    type: string
    description?: string
    required?: boolean
  }
}

export interface ToolEntry {
  name: string
  file: string
  description: string
  inputs?: ToolInput
  outputs?: string
  permissions?: string[]
  safety?: string[]
  category?: string
}

export interface ToolsIndex {
  tools: ToolEntry[]
}

export interface CommandEntry {
  name: string
  file: string
  description: string
  aliases?: string[]
  usage?: string
  relatedTools?: string[]
  category?: string
}

export interface CommandsIndex {
  commands: CommandEntry[]
}

export interface ScreenEntry {
  name: string
  file: string
  description: string
  purpose: string
  features?: string[]
  relatedComponents?: string[]
}

export interface ScreensIndex {
  screens: ScreenEntry[]
}

export interface ComponentEntry {
  name: string
  file: string
  description: string
  category: string
  props?: string[]
  usedBy?: string[]
}

export interface ComponentsIndex {
  components: ComponentEntry[]
}

export interface ServiceEntry {
  name: string
  file: string
  description: string
  category: string
  responsibilities?: string[]
  dependencies?: string[]
}

export interface ServicesIndex {
  services: ServiceEntry[]
}

export interface TaskEntry {
  name: string
  type: string
  description: string
  file: string
  lifecycle?: string[]
}

export interface TasksIndex {
  tasks: TaskEntry[]
}

export interface SkillEntry {
  name: string
  file: string
  description: string
  category: string
  triggers?: string[]
}

export interface SkillsIndex {
  skills: SkillEntry[]
}

export interface PluginEntry {
  name: string
  file: string
  description: string
  capabilities?: string[]
}

export interface PluginsIndex {
  plugins: PluginEntry[]
}

export interface FeatureFlagEntry {
  name: string
  description: string
  defaultEnabled: boolean
  file: string
}

export interface FeatureFlagsIndex {
  flags: FeatureFlagEntry[]
}

export interface GraphNode {
  id: string
  type: 'class' | 'function' | 'interface' | 'type' | 'file' | 'tool' | 'service'
  file: string
  description?: string
}

export interface GraphEdge {
  source: string
  target: string
  relation: 'imports' | 'exports' | 'uses' | 'calls' | 'extends' | 'implements'
}

export interface ModuleGraph {
  nodes: GraphNode[]
  edges: GraphEdge[]
}

export interface SearchResult {
  type: 'file' | 'function' | 'tool' | 'command' | 'class' | 'screen' | 'component' | 'service' | 'task' | 'skill' | 'plugin' | 'feature-flag'
  name: string
  file: string
  description?: string
  line?: number
  category?: string
}

export interface PageNode {
  id: string
  title: string
  icon?: string
  children?: PageNode[]
  pageId?: string
}

export interface DocSection {
  id: string
  title: string
  content: DocContent[]
}

export type DocContent =
  | { type: 'paragraph'; text: string }
  | { type: 'heading'; level: number; text: string; id: string }
  | { type: 'code'; language: string; code: string }
  | { type: 'list'; items: string[]; ordered?: boolean }
  | { type: 'callout'; variant: 'info' | 'warning' | 'tip'; title: string; text: string }
  | { type: 'table'; headers: string[]; rows: string[][] }
  | { type: 'cross-ref'; pageId: string; text: string }
