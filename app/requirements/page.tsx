'use client';

import { ExternalLink } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { requirementsDoc } from '@/statics/requirements.statics';
import Link from 'next/link';

export default function RequirementsPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <header className="sticky top-0 z-10 border-b bg-white dark:bg-slate-900 dark:border-slate-800 p-4 h-16 content-center">
        <div className="mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold">API 요구사항</h1>
            <span className="ml-2 rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-100">
              v1.0.0
            </span>
          </div>
          <div className="ml-auto flex items-center gap-4">
            <Link
              href="/api-docs"
              className="flex items-center gap-1 text-sm text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
            >
              <ExternalLink className="h-4 w-4" />
              <span>API Docs</span>
            </Link>
          </div>
        </div>
      </header>

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
    </div>
  );
}
