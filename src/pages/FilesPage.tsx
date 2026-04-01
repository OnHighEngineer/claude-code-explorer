import React, { useMemo, useState } from 'react'
import type { FileEntry } from '@/types'
import { ChevronRight, ChevronDown, FileCode } from 'lucide-react'

interface FilesPageProps {
  files: FileEntry[]
}

interface TreeNode {
  name: string
  path: string
  children: TreeNode[]
  file?: FileEntry
  isDirectory: boolean
}

export function FilesPage({ files }: FilesPageProps) {
  const [expandedDirs, setExpandedDirs] = useState<Set<string>>(new Set(['src']))
  const [selectedFile, setSelectedFile] = useState<FileEntry | null>(null)

  const fileTree = useMemo(() => {
    const root: TreeNode = {
      name: 'src',
      path: 'src',
      children: [],
      isDirectory: true,
    }

    files.forEach((file) => {
      const parts = file.path.split('/')
      let current = root

      parts.forEach((part, idx) => {
        const isLast = idx === parts.length - 1
        let child = current.children.find((c) => c.name === part)

        if (!child) {
          child = {
            name: part,
            path: parts.slice(0, idx + 1).join('/'),
            children: [],
            isDirectory: !isLast,
            file: isLast ? file : undefined,
          }
          current.children.push(child)
        }

        current = child
      })
    })

    root.children.sort((a, b) => {
      if (a.isDirectory !== b.isDirectory) {
        return a.isDirectory ? -1 : 1
      }
      return a.name.localeCompare(b.name)
    })

    return root
  }, [files])

  const toggleDir = (path: string) => {
    const updated = new Set(expandedDirs)
    if (updated.has(path)) {
      updated.delete(path)
    } else {
      updated.add(path)
    }
    setExpandedDirs(updated)
  }

  const FileTreeItem = ({
    node,
    depth = 0,
  }: {
    node: TreeNode
    depth?: number
  }) => {
    const isExpanded = expandedDirs.has(node.path)

    return (
      <div>
        <button
          onClick={() => {
            if (node.isDirectory) {
              toggleDir(node.path)
            } else {
              setSelectedFile(node.file || null)
            }
          }}
          className={`w-full text-left px-2 py-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded flex items-center gap-1 ${
            node.file === selectedFile ? 'bg-gray-100 dark:bg-gray-900 dark:bg-gray-900' : ''
          }`}
          style={{ paddingLeft: `${depth * 1.5}rem` }}
        >
          {node.isDirectory && (
            <>
              {isExpanded ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </>
          )}
          {!node.isDirectory && <FileCode className="w-4 h-4" />}
          <span className="text-sm">{node.name}</span>
        </button>

        {node.isDirectory && isExpanded && (
          <div>
            {node.children.map((child) => (
              <FileTreeItem key={child.path} node={child} depth={depth + 1} />
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="flex-1 max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
          Files Browser
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Browse {files.length} TypeScript files in the codebase
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* File Tree */}
        <div className="md:col-span-1 bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 max-h-96 overflow-y-auto">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
            Directory Tree
          </h3>
          <FileTreeItem node={fileTree} />
        </div>

        {/* File Details */}
        <div className="md:col-span-2">
          {selectedFile ? (
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {selectedFile.path}
              </h2>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">
                    Lines
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {selectedFile.lines.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">
                    Category
                  </p>
                  <p className="text-xl font-bold text-gray-900 dark:text-white capitalize">
                    {selectedFile.category}
                  </p>
                </div>
              </div>

              {selectedFile.exports.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Exports ({selectedFile.exports.length})
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedFile.exports.map((exp) => (
                      <span
                        key={exp}
                        className="px-2 py-1 text-sm bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 rounded"
                      >
                        {exp}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {selectedFile.classes.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Classes ({selectedFile.classes.length})
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedFile.classes.map((cls) => (
                      <span
                        key={cls}
                        className="px-2 py-1 text-sm bg-gray-100 dark:bg-gray-900 dark:bg-gray-900 text-gray-700 dark:text-gray-300 rounded"
                      >
                        {cls}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {selectedFile.functions.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Functions ({selectedFile.functions.length})
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedFile.functions.slice(0, 10).map((fn) => (
                      <span
                        key={fn}
                        className="px-2 py-1 text-sm bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 rounded"
                      >
                        {fn}
                      </span>
                    ))}
                    {selectedFile.functions.length > 10 && (
                      <span className="px-2 py-1 text-sm text-gray-600 dark:text-gray-400">
                        +{selectedFile.functions.length - 10} more
                      </span>
                    )}
                  </div>
                </div>
              )}

              {selectedFile.imports.length > 0 && (
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Imports ({selectedFile.imports.length})
                  </h3>
                  <div className="space-y-1">
                    {selectedFile.imports.slice(0, 5).map((imp) => (
                      <div
                        key={imp}
                        className="text-sm text-gray-600 dark:text-gray-400"
                      >
                        {imp}
                      </div>
                    ))}
                    {selectedFile.imports.length > 5 && (
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        +{selectedFile.imports.length - 5} more imports
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 border-2 border-dashed border-gray-300 dark:border-gray-700 text-center">
              <p className="text-gray-600 dark:text-gray-400">
                Select a file from the tree to view details
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
