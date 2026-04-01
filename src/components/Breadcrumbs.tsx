import React from 'react'
import type { PageNode } from '@/types'

interface BreadcrumbsProps {
  currentPage: string
  tree: PageNode[]
}

export function Breadcrumbs({ currentPage, tree }: BreadcrumbsProps) {
  const path = findPath(tree, currentPage)

  if (path.length === 0) return null

  return (
    <nav className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
      {path.map((item, idx) => (
        <React.Fragment key={item.id}>
          {idx > 0 && <span className="mx-1">/</span>}
          <span className={idx === path.length - 1 ? 'text-gray-900 dark:text-white font-medium' : ''}>
            {item.title}
          </span>
        </React.Fragment>
      ))}
    </nav>
  )
}

function findPath(tree: PageNode[], targetId: string): PageNode[] {
  for (const node of tree) {
    if (node.pageId === targetId) return [node]
    if (node.children) {
      const childPath = findPath(node.children, targetId)
      if (childPath.length > 0) return [node, ...childPath]
    }
  }
  return []
}
