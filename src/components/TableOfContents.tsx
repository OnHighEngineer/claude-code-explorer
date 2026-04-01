import React from 'react'

interface TableOfContentsProps {
  sections: { id: string; title: string }[]
}

export function TableOfContents({ sections }: TableOfContentsProps) {
  return (
    <div>
      <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
        On this page
      </h3>
      <nav className="space-y-1">
        {sections.map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            className="block text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors py-0.5"
          >
            {section.title}
          </a>
        ))}
      </nav>
    </div>
  )
}
