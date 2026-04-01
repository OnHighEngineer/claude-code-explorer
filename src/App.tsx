import { useState, useEffect } from 'react'
import { DocLayout } from '@/components/DocLayout'
import { SearchBox } from '@/components/SearchBox'
import { PrevNextNav } from '@/components/PrevNextNav'
import { OverviewPage } from '@/pages/OverviewPage'
import { ToolsPage } from '@/pages/ToolsPage'
import { CommandsPage } from '@/pages/CommandsPage'
import { FilesPage } from '@/pages/FilesPage'
import { ExecutionFlowPage } from '@/pages/ExecutionFlowPage'
import { ArchitecturePage } from '@/pages/ArchitecturePage'
import { LearningPage } from '@/pages/Learning'
import { CoreEnginePage } from '@/pages/CoreEnginePage'
import { ScreensPage } from '@/pages/ScreensPage'
import { ComponentsPage } from '@/pages/ComponentsPage'
import { ServicesPage } from '@/pages/ServicesPage'
import { TasksPage } from '@/pages/TasksPage'
import { SkillsPage } from '@/pages/SkillsPage'
import { PluginsPage } from '@/pages/PluginsPage'
import { MCPPage } from '@/pages/MCPPage'
import { PermissionsPage } from '@/pages/PermissionsPage'
import { SettingsPage } from '@/pages/SettingsPage'
import { FeatureFlagsPage } from '@/pages/FeatureFlagsPage'
import { MultiClientPage } from '@/pages/MultiClientPage'
import { useIndexData } from '@/hooks/useIndexData'
import { useSearch } from '@/hooks/useSearch'
import { usePageNavigation } from '@/hooks/usePageNavigation'

function App() {
  const [currentPage, setCurrentPage] = useState(() => {
    const hash = window.location.hash.slice(1)
    return hash || 'overview'
  })
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const { files, tools, commands, screens, components, services, featureFlags, loading, error } = useIndexData()
  const { results, performSearch } = useSearch(files, tools, commands, screens, components, services)
  const { prev, next } = usePageNavigation(currentPage)

  useEffect(() => {
    window.location.hash = currentPage
  }, [currentPage])

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1)
      if (hash) setCurrentPage(hash)
    }
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  const handleSearchSelect = (result: any) => {
    if (result.type === 'tool') setCurrentPage('tools')
    else if (result.type === 'command') setCurrentPage('commands')
    else if (result.type === 'file') setCurrentPage('files')
    else if (result.type === 'screen') setCurrentPage('screens')
    else if (result.type === 'component') setCurrentPage('components')
    else if (result.type === 'service') setCurrentPage('services')
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white dark:bg-black">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-2 border-gray-900 dark:border-white border-t-transparent"></div>
          <p className="mt-4 text-gray-900 dark:text-white font-medium">Loading...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white dark:bg-black">
        <div className="text-center px-6">
          <p className="text-gray-900 dark:text-white font-semibold mb-2">Error loading data</p>
          <p className="text-gray-600 dark:text-gray-400">{error}</p>
          <p className="text-sm text-gray-500 mt-2">Run: npm run index</p>
        </div>
      </div>
    )
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'overview':
        return <OverviewPage onNavigate={setCurrentPage} toolCount={tools.length} commandCount={commands.length} />
      case 'tools':
        return <ToolsPage tools={tools} />
      case 'commands':
        return <CommandsPage commands={commands} />
      case 'files':
        return <FilesPage files={files} />
      case 'flow':
        return <ExecutionFlowPage />
      case 'architecture':
        return <ArchitecturePage />
      case 'learning':
        return <LearningPage />
      case 'core-engine':
        return <CoreEnginePage />
      case 'screens':
        return <ScreensPage screens={screens} />
      case 'components':
        return <ComponentsPage components={components} />
      case 'services':
        return <ServicesPage services={services} />
      case 'tasks':
        return <TasksPage />
      case 'skills':
        return <SkillsPage />
      case 'plugins':
        return <PluginsPage />
      case 'mcp':
        return <MCPPage />
      case 'permissions':
        return <PermissionsPage />
      case 'settings':
        return <SettingsPage />
      case 'feature-flags':
        return <FeatureFlagsPage flags={featureFlags} />
      case 'multi-client':
        return <MultiClientPage />
      default:
        return <OverviewPage onNavigate={setCurrentPage} toolCount={tools.length} commandCount={commands.length} />
    }
  }

  return (
    <DocLayout
      currentPage={currentPage}
      onNavigate={setCurrentPage}
      sidebarOpen={sidebarOpen}
      onSidebarToggle={() => setSidebarOpen(!sidebarOpen)}
    >
      <div className="mb-6">
        <SearchBox
          onSearch={performSearch}
          results={results}
          onSelectResult={handleSearchSelect}
        />
      </div>

      {renderPage()}

      <PrevNextNav
        prev={prev}
        next={next}
        onNavigate={setCurrentPage}
      />
    </DocLayout>
  )
}

export default App
