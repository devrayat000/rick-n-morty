import { QueryClient, type QueryClientConfig } from "@tanstack/react-query";

export function createRQClient(opts?: QueryClientConfig) {
  return new QueryClient({
    queryCache: opts?.queryCache,
    mutationCache: opts?.mutationCache,
    logger: opts?.logger,
    defaultOptions: {
      mutations: opts?.defaultOptions?.mutations,
      queries: {
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        ...opts?.defaultOptions?.queries,
      },
    },
  });
}

export default createRQClient();
