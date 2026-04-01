import { useEffect, useState } from 'react'
import type { FileEntry, ToolEntry, CommandEntry, ScreenEntry, ComponentEntry, ServiceEntry, TaskEntry, SkillEntry, PluginEntry, FeatureFlagEntry } from '@/types'

export function useIndexData() {
  const [files, setFiles] = useState<FileEntry[]>([])
  const [tools, setTools] = useState<ToolEntry[]>([])
  const [commands, setCommands] = useState<CommandEntry[]>([])
  const [screens, setScreens] = useState<ScreenEntry[]>([])
  const [components, setComponents] = useState<ComponentEntry[]>([])
  const [services, setServices] = useState<ServiceEntry[]>([])
  const [tasks, setTasks] = useState<TaskEntry[]>([])
  const [skills, setSkills] = useState<SkillEntry[]>([])
  const [plugins, setPlugins] = useState<PluginEntry[]>([])
  const [featureFlags, setFeatureFlags] = useState<FeatureFlagEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true)

        const endpoints = [
          '/data/file-index.json',
          '/data/tools-index.json',
          '/data/commands-index.json',
          '/data/screens-index.json',
          '/data/components-index.json',
          '/data/services-index.json',
          '/data/tasks-index.json',
          '/data/skills-index.json',
          '/data/plugins-index.json',
          '/data/feature-flags-index.json',
        ]

        const responses = await Promise.all(endpoints.map((url) => fetch(url)))

        const data = await Promise.all(
          responses.map(async (res) => {
            if (!res.ok) return null
            return res.json()
          })
        )

        setFiles(data[0]?.files || [])
        setTools(data[1]?.tools || [])
        setCommands(data[2]?.commands || [])
        setScreens(data[3]?.screens || [])
        setComponents(data[4]?.components || [])
        setServices(data[5]?.services || [])
        setTasks(data[6]?.tasks || [])
        setSkills(data[7]?.skills || [])
        setPlugins(data[8]?.plugins || [])
        setFeatureFlags(data[9]?.flags || [])
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  return {
    files, tools, commands, screens, components, services, tasks, skills, plugins, featureFlags,
    loading, error,
  }
}
