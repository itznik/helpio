'use client';

import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ThemeProvider } from '@/components/shared/ThemeProvider';
import { Toaster } from 'sonner';

export default function Providers({ children }: { children: React.ReactNode }) {
  // 1. Create a Query Client with Optimized Defaults
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        // Data is considered fresh for 1 minute. 
        // If a user navigates away and back within 1 min, no new API call is made.
        staleTime: 60 * 1000, 
        
        // Don't refetch just because the window gained focus (saves bandwidth/battery)
        refetchOnWindowFocus: false, 
        
        // Retry failed requests 1 time before showing error
        retry: 1,
      },
    },
  }));

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
        <Toaster position="bottom-right" theme="system" richColors closeButton />
      </ThemeProvider>
      
      {/* DevTools only show in development */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
