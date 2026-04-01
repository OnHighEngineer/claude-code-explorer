import { useMemo } from 'react'
import { pageTree } from '@/data/pageTree'

export function usePageNavigation(currentPage: string) {
  const flatPages = useMemo(() => {
    const pages: { id: string; title: string }[] = []
    function flatten(nodes: typeof pageTree) {
      for (const node of nodes) {
        if (node.pageId) {
          pages.push({ id: node.pageId, title: node.title })
        }
        if (node.children) flatten(node.children)
      }
    }
    flatten(pageTree)
    return pages
  }, [])

  const currentIndex = flatPages.findIndex((p) => p.id === currentPage)

  const prev = currentIndex > 0 ? flatPages[currentIndex - 1] : undefined
  const next = currentIndex < flatPages.length - 1 ? flatPages[currentIndex + 1] : undefined

  return { prev, next, flatPages }
}
