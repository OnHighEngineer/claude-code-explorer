import { Server, Layers, Shield, Zap, Package, Settings } from 'lucide-react'
import { Badge } from '@/components/Badge'

interface ServicesPageProps {
  services: { name: string; file: string; description: string; category: string; responsibilities?: string[] }[]
}

const iconMap: Record<string, React.ReactNode> = {
  api: <Server className="w-5 h-5" />,
  mcp: <Layers className="w-5 h-5" />,
  permissions: <Shield className="w-5 h-5" />,
  analytics: <Zap className="w-5 h-5" />,
  plugins: <Package className="w-5 h-5" />,
  settings: <Settings className="w-5 h-5" />,
}

export function ServicesPage({ services }: ServicesPageProps) {
  const defaultServices = [
    { name: 'API Client', category: 'api', file: 'src/services/api/', description: 'Anthropic API communication, token counting, streaming responses', responsibilities: ['HTTP request management', 'Token counting and context window tracking', 'Streaming response handling', 'Error handling and retries'] },
    { name: 'MCP (Model Context Protocol)', category: 'mcp', file: 'src/services/mcp/', description: 'Third-party tool and resource server integration', responsibilities: ['MCP server lifecycle management', 'Resource and tool discovery', 'Configuration management', 'Authentication handling'] },
    { name: 'Permission System', category: 'permissions', file: 'src/services/permissions/', description: 'Tool permission checking, denial rules, user approval flow', responsibilities: ['Tool filtering by permission context', 'Deny rule application', 'User approval dialogs', 'Permission mode management'] },
    { name: 'Analytics', category: 'analytics', file: 'src/services/analytics/', description: 'GrowthBook feature flags, telemetry, event logging', responsibilities: ['Feature flag evaluation', 'Telemetry collection', 'Event logging', 'A/B test management'] },
    { name: 'Plugin System', category: 'plugins', file: 'src/services/plugins/', description: 'Load, manage, and execute user/third-party plugins', responsibilities: ['Plugin discovery and loading', 'Lifecycle management', 'Command and tool injection', 'Version compatibility checks'] },
    { name: 'Settings', category: 'settings', file: 'src/services/settings/', description: 'Multi-source configuration with hot-reload', responsibilities: ['Global, project, and policy settings', 'Hot-reload on file changes', 'Settings hierarchy resolution', 'MDM and remote-managed settings'] },
  ]

  const displayServices = services.length > 0 ? services : defaultServices

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Services</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        The service layer that powers Claude Code's core functionality.
      </p>

      <div className="space-y-6">
        {displayServices.map((service) => {
          const Icon = (iconMap as any)[service.category] || <Server className="w-5 h-5" />
          return (
            <div key={service.name} className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-gray-700 dark:text-gray-300">{Icon}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white">{service.name}</h2>
                    <Badge>{service.category}</Badge>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 font-mono">{service.file}</p>
                </div>
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-4">{service.description}</p>
              {service.responsibilities && service.responsibilities.length > 0 && (
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300">
                  {service.responsibilities.map((r) => <li key={r}>{r}</li>)}
                </ul>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
