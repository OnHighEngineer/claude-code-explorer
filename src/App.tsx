import { useState, useEffect } from 'react'
import { HeroSection } from '@/components/HeroSection'
import { AgentLoop } from '@/components/AgentLoop'
import { ArchitectureExplorer } from '@/components/ArchitectureExplorer'
import { ToolSystem } from '@/components/ToolSystem'
import { CommandCatalog } from '@/components/CommandCatalog'
import { HiddenFeatures } from '@/components/HiddenFeatures'
import { SearchBox } from '@/components/SearchBox'
import { DocLayout } from '@/components/DocLayout'
import { PrevNextNav } from '@/components/PrevNextNav'
import { SectionNav } from '@/components/SectionNav'
import { useSectionTracking } from '@/hooks/useSectionTracking'
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
    return hash || 'home'
  })
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const { files, tools, commands, screens, components, services, featureFlags, loading, error } = useIndexData()
  const { results, performSearch } = useSearch(files, tools, commands, screens, components, services)
  const { prev, next } = usePageNavigation(currentPage)
  const { activeSection, heroVisible, scrollToSection } = useSectionTracking()

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

  const handleSectionNav = (sectionId: string) => {
    setCurrentPage('home')
    setTimeout(() => scrollToSection(sectionId), 100)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0d0d0d]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-2 border-[#d4a853] border-t-transparent"></div>
          <p className="mt-4 text-[#e8e4df] font-medium font-heading">Loading...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0d0d0d]">
        <div className="text-center px-6">
          <p className="text-[#e8e4df] font-semibold mb-2">Error loading data</p>
          <p className="text-[#8a8580]">{error}</p>
          <p className="text-sm text-[#8a8580] mt-2">Run: npm run index</p>
        </div>
      </div>
    )
  }

  // Home page with ccunpacked.dev style
  if (currentPage === 'home') {
    return (
      <div className="bg-[#0d0d0d] min-h-screen">
        <SectionNav activeSection={activeSection} heroVisible={heroVisible} onNavigate={handleSectionNav} />

        <HeroSection
          onNavigate={handleSectionNav}
          toolCount={tools.length}
          commandCount={commands.length}
          fileCount={files.length}
        />

        <div className="section-divider" />
        <AgentLoop onNavigate={handleSectionNav} />

        <div className="section-divider" />
        <ArchitectureExplorer onNavigate={handleSectionNav} />

        <div className="section-divider" />
        <ToolSystem tools={tools} onNavigate={handleSectionNav} />

        <div className="section-divider" />
        <CommandCatalog commands={commands} onNavigate={handleSectionNav} />

        <div className="section-divider" />
        <HiddenFeatures onNavigate={handleSectionNav} />

        {/* Footer */}
        <footer className="border-t border-[#2a2520] py-8 px-6">
          <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-4">
            <div className="text-sm text-[#8a8580] font-body">
              <p>Unofficial. Not affiliated with Anthropic.</p>
              <p className="mt-1">Based on publicly available source code.</p>
            </div>
            <div className="flex items-center gap-4">
              <a href="https://github.com/OnHighEngineer/claude-code-explorer" target="_blank" rel="noopener noreferrer" className="text-[#8a8580] hover:text-[#d4a853] transition-colors duration-200">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" /></svg>
              </a>
              <a href="https://x.com/onhigh481198" target="_blank" rel="noopener noreferrer" className="text-[#8a8580] hover:text-[#d4a853] transition-colors duration-200">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
              </a>
            </div>
          </div>
        </footer>
      </div>
    )
  }

  // Doc pages with sidebar layout
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

      {(() => {
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
      })()}

      <PrevNextNav
        prev={prev}
        next={next}
        onNavigate={setCurrentPage}
      />
    </DocLayout>
  )
}

export default App
