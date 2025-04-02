import { EndpointSectionProps } from '@/interfaces/api-docs.interface';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { useState } from 'react';

export default function EndpointItem({ endpoint }: { endpoint: EndpointSectionProps['endpoints'][0] }) {
  const [isOpen, setIsOpen] = useState(false);

  const getMethodColor = (method: string) => {
    switch (method) {
      case 'GET':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100';
      case 'POST':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100';
      case 'PATCH':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-100';
      case 'DELETE':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100';
    }
  };

  return (
    <div className="p-4">
      <div className="flex items-center cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
        <div className={`px-2 py-1 rounded text-xs font-bold ${getMethodColor(endpoint.method)}`}>
          {endpoint.method}
        </div>
        <div className="ml-2 font-mono text-sm">{endpoint.path}</div>
        <div className="ml-4 text-sm text-slate-600 dark:text-slate-400">{endpoint.summary}</div>
        <div className="ml-auto">
          {isOpen ? (
            <ChevronDown className="h-5 w-5 text-slate-400" />
          ) : (
            <ChevronRight className="h-5 w-5 text-slate-400" />
          )}
        </div>
      </div>

      {isOpen && (
        <div className="mt-4 pl-10">
          <div className="mb-4">
            <p className="text-sm text-slate-600 dark:text-slate-400">{endpoint.description}</p>
          </div>

          {endpoint.parameters && endpoint.parameters.length > 0 && (
            <div className="mb-4">
              <h3 className="text-sm font-semibold mb-2">Parameters</h3>
              <div className="bg-slate-50 rounded-md p-4 dark:bg-slate-800">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left border-b dark:border-slate-700">
                      <th className="pb-2 pr-4 font-medium">Name</th>
                      <th className="pb-2 pr-4 font-medium">Location</th>
                      <th className="pb-2 pr-4 font-medium">Type</th>
                      <th className="pb-2 font-medium">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {endpoint.parameters.map((param, idx) => (
                      <tr key={idx} className="border-b last:border-0 dark:border-slate-700">
                        <td className="py-2 pr-4 font-mono">
                          {param.name}
                          {param.required && <span className="text-red-500 ml-1">*</span>}
                        </td>
                        <td className="py-2 pr-4">{param.in}</td>
                        <td className="py-2 pr-4">{param.schema.type}</td>
                        <td className="py-2">{param.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {endpoint.requestBody && (
            <div className="mb-4">
              <h3 className="text-sm font-semibold mb-2">Request Body</h3>
              <div className="bg-slate-50 rounded-md p-4 dark:bg-slate-800">
                <div className="mb-2 flex items-center">
                  <span className="text-xs font-medium mr-2">Content Type:</span>
                  <span className="text-xs font-mono">application/json</span>
                </div>
                <div className="mb-2">
                  <span className="text-xs font-medium">Schema:</span>
                </div>
                <pre className="text-xs overflow-auto p-2 bg-white rounded border dark:bg-slate-900 dark:border-slate-700">
                  {JSON.stringify(endpoint.requestBody.content['application/json'].schema, null, 2)}
                </pre>
              </div>
            </div>
          )}

          <div>
            <h3 className="text-sm font-semibold mb-2">Responses</h3>
            <div className="space-y-2">
              {endpoint.responses.map((response, idx) => (
                <div key={idx} className="bg-slate-50 rounded-md p-4 dark:bg-slate-800">
                  <div className="flex items-center mb-2">
                    <div
                      className={`px-2 py-0.5 rounded text-xs font-bold ${
                        response.status.startsWith('2')
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100'
                          : response.status.startsWith('4')
                            ? 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-100'
                            : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100'
                      }`}
                    >
                      {response.status}
                    </div>
                    <span className="ml-2 text-sm">{response.description}</span>
                  </div>
                  <div className="mb-2 flex items-center">
                    <span className="text-xs font-medium mr-2">Content Type:</span>
                    <span className="text-xs font-mono">application/json</span>
                  </div>
                  <pre className="text-xs overflow-auto p-2 bg-white rounded border dark:bg-slate-900 dark:border-slate-700">
                    {JSON.stringify(response.content['application/json'].schema, null, 2)}
                  </pre>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
