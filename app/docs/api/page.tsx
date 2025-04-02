'use client';

import EndpointSection from '@/components/docs/api/endpoint-section';
import Header from '@/components/docs/shared/header';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { authEndpoints, flowDiagramMermaid, todoEndpoints, todoSchema } from '@/statics/docs/endpoint.statics';
import { ExternalLink } from 'lucide-react';

export default function ApiDocsPage() {
  return (
    <>
      <Header
        title="API 명세"
        version="v1.0.0"
        links={[{ label: '요구 사항', href: '/docs/requirements', icon: <ExternalLink className="h-4 w-4" /> }]}
      />

      <main className="px-4 py-6">
        <div className="mb-8 rounded-lg border bg-white p-6 dark:bg-slate-900 dark:border-slate-800">
          <h2 className="text-lg font-bold mb-2">API 설명</h2>
          <p className="text-slate-600 dark:text-slate-400">
            이 API는 로그인/회원가입과 Todo 리스트 CRUD 기능을 제공합니다.
          </p>
          <div className="mt-4">
            <h3 className="font-medium mb-2">서버 URL</h3>
            <div className="flex items-center gap-2 rounded-md bg-slate-100 p-2 dark:bg-slate-800">
              <span className="text-sm font-mono">http://localhost:3000</span>
            </div>
          </div>
        </div>

        <Tabs defaultValue="endpoints" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="endpoints">엔드포인트</TabsTrigger>
            <TabsTrigger value="schema">스키마</TabsTrigger>
            <TabsTrigger value="flow">API 흐름</TabsTrigger>
          </TabsList>

          <TabsContent value="endpoints">
            <div className="space-y-6">
              <EndpointSection title="인증 API" endpoints={authEndpoints} />
              <EndpointSection title="Todo API" endpoints={todoEndpoints} />
            </div>
          </TabsContent>

          <TabsContent value="schema">
            <div className="rounded-lg border bg-white p-6 dark:bg-slate-900 dark:border-slate-800">
              <h2 className="text-lg font-bold mb-4">스키마</h2>
              <div className="rounded-md bg-slate-50 p-4 dark:bg-slate-800">
                <pre className="text-sm overflow-auto">{todoSchema}</pre>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="flow">
            <div className="rounded-lg border bg-white p-6 dark:bg-slate-900 dark:border-slate-800">
              <h2 className="text-lg font-bold mb-4">API 흐름 다이어그램</h2>
              <div className="overflow-auto">
                <pre className="text-sm font-mono overflow-auto whitespace-pre-wrap">{flowDiagramMermaid}</pre>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </>
  );
}
