'use client';

import { ExternalLink } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { requirementsDoc } from '@/statics/docs/requirements.statics';
import Header from '@/components/docs/shared/header';

export default function RequirementsPage() {
  return (
    <>
      <Header
        title="API 요구사항"
        version="v1.0.0"
        links={[{ label: 'API Docs', href: '/docs/api', icon: <ExternalLink className="h-4 w-4" /> }]}
      />

      <main className="mx-auto py-6 px-4">
        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="raw">
            <TabsList className="mb-6">
              <TabsTrigger value="raw">원본 문서</TabsTrigger>
            </TabsList>

            <TabsContent value="raw">
              <div className="rounded-lg border bg-white dark:bg-slate-900 dark:border-slate-800 p-6">
                <pre className="whitespace-pre-wrap text-sm text-slate-700 dark:text-slate-300 font-mono">
                  {requirementsDoc}
                </pre>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </>
  );
}
