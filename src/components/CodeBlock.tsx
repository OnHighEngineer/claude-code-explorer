import React, { useState } from 'react'
import { Copy, Check } from 'lucide-react'

interface CodeBlockProps {
  language: string
  code: string
}

export function CodeBlock({ language, code }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative my-4 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between px-4 py-2 bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
          {language}
        </span>
        <button
          onClick={handleCopy}
          className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        >
          {copied ? (
            <Check className="w-4 h-4 text-green-600" />
          ) : (
            <Copy className="w-4 h-4 text-gray-500" />
          )}
        </button>
      </div>
      <pre className="p-4 bg-gray-900 text-gray-100 text-sm overflow-x-auto">
        <code>{code}</code>
      </pre>
    </div>
  )
}
