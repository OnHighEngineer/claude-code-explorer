import React from 'react'
import { PageTree } from './PageTree'
import { Breadcrumbs } from './Breadcrumbs'
import { TableOfContents } from './TableOfContents'
import { pageTree } from '@/data/pageTree'

interface DocLayoutProps {
  currentPage: string
  onNavigate: (page: string) => void
  children: React.ReactNode
  sections?: { id: string; title: string }[]
  sidebarOpen?: boolean
  onSidebarToggle?: () => void
}

export function DocLayout({
  currentPage,
  onNavigate,
  children,
  sections = [],
  sidebarOpen = false,
  onSidebarToggle,
}: DocLayoutProps) {
  return (
    <div className="flex h-screen bg-white dark:bg-black">
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={onSidebarToggle}
        />
      )}

      <aside
        className={`fixed md:static top-0 left-0 h-screen w-72 bg-gray-50 dark:bg-gray-950 border-r border-gray-200 dark:border-gray-800 overflow-y-auto transition-transform md:translate-x-0 z-40 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-4 pt-6">
          <div className="mb-4">
            <h1 className="text-lg font-bold text-gray-900 dark:text-white">Claude Code</h1>
            <p className="text-xs text-gray-500 dark:text-gray-400">Documentation</p>
          </div>
          <PageTree
            tree={pageTree}
            currentPage={currentPage}
            onNavigate={(id) => {
              onNavigate(id)
              onSidebarToggle?.()
            }}
          />
        </div>
      </aside>

      <main className="flex-1 flex flex-col overflow-hidden">
        <div className="sticky top-0 z-10 bg-white/80 dark:bg-black/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800 px-6 py-3 flex items-center gap-4">
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            onClick={onSidebarToggle}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <Breadcrumbs currentPage={currentPage} tree={pageTree} />
        </div>

        <div className="flex-1 overflow-auto">
          <div className="max-w-4xl mx-auto px-6 py-8">
            {children}
          </div>
        </div>
      </main>

      {sections.length > 0 && (
        <div className="hidden xl:block w-64 border-l border-gray-200 dark:border-gray-800 overflow-y-auto">
          <div className="p-4 sticky top-0">
            <TableOfContents sections={sections} />
          </div>
        </div>
      )}
    </div>
  )
}
