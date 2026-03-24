'use client';

import { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient();

type Props = { children: ReactNode };
export default function ReactQueryProvider({ children }: Props) {
  const mode = process.env.NODE_ENV;

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {mode === 'development' ? <ReactQueryDevtools /> : null}
    </QueryClientProvider>
  );
}
