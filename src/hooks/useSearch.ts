import { useMemo, useState, useCallback } from 'react'
import lunr from 'lunr'
import type { FileEntry, ToolEntry, CommandEntry, ScreenEntry, ComponentEntry, ServiceEntry, SearchResult } from '@/types'

export function useSearch(
  files: FileEntry[],
  tools: ToolEntry[],
  commands: CommandEntry[],
  screens: ScreenEntry[] = [],
  components: ComponentEntry[] = [],
  services: ServiceEntry[] = [],
) {
  const [results, setResults] = useState<SearchResult[]>([])
  const [query, setQuery] = useState('')

  const searchIndex = useMemo(() => {
    const documents: Record<string, any> = {}
    let docId = 0

    files.forEach((file) => {
      const id = `file-${docId++}`
      documents[id] = {
        type: 'file',
        name: file.path,
        description: file.category || '',
        searchText: [file.path, ...file.exports, ...file.functions, ...file.classes, file.category].join(' '),
      }
    })

    tools.forEach((tool) => {
      const id = `tool-${docId++}`
      documents[id] = {
        type: 'tool',
        name: tool.name,
        description: tool.description,
        searchText: [tool.name, tool.description, tool.category || 'tool', ...(tool.permissions || [])].join(' '),
      }
    })

    commands.forEach((cmd) => {
      const id = `cmd-${docId++}`
      documents[id] = {
        type: 'command',
        name: cmd.name,
        description: cmd.description,
        searchText: [cmd.name, cmd.description, cmd.category || 'command'].join(' '),
      }
    })

    screens.forEach((screen) => {
      const id = `screen-${docId++}`
      documents[id] = {
        type: 'screen',
        name: screen.name,
        description: screen.description,
        searchText: [screen.name, screen.description, screen.purpose].join(' '),
      }
    })

    components.forEach((comp) => {
      const id = `comp-${docId++}`
      documents[id] = {
        type: 'component',
        name: comp.name,
        description: comp.description,
        searchText: [comp.name, comp.description, comp.category].join(' '),
      }
    })

    services.forEach((svc) => {
      const id = `svc-${docId++}`
      documents[id] = {
        type: 'service',
        name: svc.name,
        description: svc.description,
        searchText: [svc.name, svc.description, svc.category].join(' '),
      }
    })

    try {
      const builder = new lunr.Builder()
      builder.ref('id')
      builder.field('searchText', { boost: 10 })
      builder.field('name', { boost: 100 })
      builder.field('description')

      Object.entries(documents).forEach(([id, doc]) => {
        builder.add({ id, ...doc })
      })

      return builder.build()
    } catch (err) {
      console.error('Error building search index:', err)
      return null
    }
  }, [files, tools, commands, screens, components, services])

  const performSearch = useCallback(
    (searchQuery: string) => {
      setQuery(searchQuery)

      if (!searchQuery.trim() || !searchIndex) {
        setResults([])
        return
      }

      try {
        const searchResults = searchIndex.search(searchQuery)
        const results: SearchResult[] = searchResults.map((result) => {
          const parts = result.ref.split('-')
          const type = parts[0]
          const index = parseInt(parts.slice(1).join('-'))

          switch (type) {
            case 'file':
              return { type: 'file', name: files[index]?.path || result.ref, file: files[index]?.path || '', category: files[index]?.category, description: `${files[index]?.functions.length || 0} functions, ${files[index]?.classes.length || 0} classes` }
            case 'tool':
              return { type: 'tool', name: tools[index]?.name || result.ref, file: tools[index]?.file || '', description: tools[index]?.description }
            case 'cmd':
              return { type: 'command', name: commands[index]?.name || result.ref, file: commands[index]?.file || '', description: commands[index]?.description }
            case 'screen':
              return { type: 'screen', name: screens[index]?.name || result.ref, file: screens[index]?.file || '', description: screens[index]?.description }
            case 'comp':
              return { type: 'component', name: components[index]?.name || result.ref, file: components[index]?.file || '', description: components[index]?.description }
            case 'svc':
              return { type: 'service', name: services[index]?.name || result.ref, file: services[index]?.file || '', description: services[index]?.description }
            default:
              return { type: 'file', name: result.ref, file: result.ref }
          }
        })

        setResults(results.slice(0, 20))
      } catch (err) {
        console.error('Search error:', err)
      }
    },
    [searchIndex, files, tools, commands, screens, components, services]
  )

  return { query, results, performSearch }
}
