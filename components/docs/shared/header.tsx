'use client';

import Link from 'next/link';
import { Home } from 'lucide-react';
import { ExternalLink } from 'lucide-react';
import { ReactNode } from 'react';

interface HeaderProps {
  title: string;
  version?: string;
  links?: {
    label: string;
    href: string;
    icon?: ReactNode;
  }[];
}

export default function Header({ title, version = 'v1.0.0', links = [] }: HeaderProps) {
  return (
    <header className="sticky top-0 z-10 border-b bg-white dark:bg-slate-900 dark:border-slate-800 p-4 h-16 content-center">
      <div className="mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Link href="/" title="홈">
            <Home />
          </Link>
          <h1 className="text-xl font-bold">{title}</h1>
          {version && (
            <span className="ml-2 rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-100">
              {version}
            </span>
          )}
        </div>
        {links.length > 0 && (
          <div className="ml-auto flex items-center gap-4">
            {links.map((link, i) => (
              <Link
                key={i}
                href={link.href}
                className="flex items-center gap-1 text-sm text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
              >
                {link.icon || <ExternalLink className="h-4 w-4" />}
                <span>{link.label}</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
