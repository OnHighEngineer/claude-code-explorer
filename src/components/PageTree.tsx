import { useState } from 'react'
import type { PageNode } from '@/types'
import * as Icons from 'lucide-react'

interface TreeNodeProps {
  node: PageNode
  currentPage: string
  onNavigate: (pageId: string) => void
  depth: number
}

function TreeNode({ node, currentPage, onNavigate, depth }: TreeNodeProps) {
  const [expanded, setExpanded] = useState(depth === 0)
  const hasChildren = node.children && node.children.length > 0
  const isActive = node.pageId === currentPage
  const Icon = (Icons as any)[node.icon || 'FileText'] || Icons.FileText

  return (
    <div>
      <button
        onClick={() => {
          if (node.pageId) onNavigate(node.pageId)
          if (hasChildren) setExpanded(!expanded)
        }}
        className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-sm transition-colors text-left ${
          isActive
            ? 'bg-gray-200 dark:bg-gray-800 font-semibold text-gray-900 dark:text-white'
            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900'
        }`}
        style={{ paddingLeft: `${depth * 12 + 8}px` }}
      >
        {hasChildren ? (
          <span className="w-4 h-4 flex items-center justify-center flex-shrink-0">
            {expanded ? (
              <Icons.ChevronDown className="w-3 h-3" />
            ) : (
              <Icons.ChevronRight className="w-3 h-3" />
            )}
          </span>
        ) : (
          <span className="w-4 flex-shrink-0" />
        )}
        <Icon className="w-4 h-4 flex-shrink-0" />
        <span className="truncate">{node.title}</span>
      </button>

      {hasChildren && expanded && (
        <PageTree
          tree={node.children!}
          currentPage={currentPage}
          onNavigate={onNavigate}
          depth={depth + 1}
        />
      )}
    </div>
  )
}

interface PageTreeProps {
  tree: PageNode[]
  currentPage: string
  onNavigate: (pageId: string) => void
  depth?: number
}

export function PageTree({ tree, currentPage, onNavigate, depth = 0 }: PageTreeProps) {
  return (
    <nav className="space-y-0.5">
      {tree.map((node) => (
        <TreeNode
          key={node.id}
          node={node}
          currentPage={currentPage}
          onNavigate={onNavigate}
          depth={depth}
        />
      ))}
    </nav>
  )
}
