'use client';

import React from 'react';
import { QueryClient, QueryClientProvider as TanstackQueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient();

export default function QueryClientProvider({ children }: { children: React.ReactNode }) {
  return (
    <TanstackQueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools />
    </TanstackQueryClientProvider>
  );
}

// docs: https://tanstack.com/query/latest/docs/framework/react/quick-start
