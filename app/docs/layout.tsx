// app/docs/layout.tsx
import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Docs',
  description: 'Todo 프로젝트 문서 페이지입니다.',
};

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-slate-50 dark:bg-slate-950">{children}</div>;
}
