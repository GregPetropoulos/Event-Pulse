import React, { PropsWithChildren } from "react"
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
const queryClient = new QueryClient(
{
  defaultOptions: {
    queries: {
      retry: (failureCount, error) => {
        // don't retry on 429
        const status = (error as any)?.status || (error as any)?.response?.status;
        if (status === 429) return false;
        return failureCount < 1; // one retry for network flakiness
      },
      staleTime: 60_000, // 1 minute
      gcTime: 1000 * 60 * 10, // 10 minutes
      refetchOnReconnect: true,
      refetchOnWindowFocus: false,
    },
  },
}
);
export const QueryProvider =({children}:PropsWithChildren)=>{
return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}