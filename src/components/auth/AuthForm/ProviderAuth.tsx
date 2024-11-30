'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode, useState } from 'react';

interface PropsProvidersAuth {
  children: ReactNode;
}

function ProviderAuth({ children }: PropsProvidersAuth) {
  const [client] = useState(() => new QueryClient());

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}

export default ProviderAuth;
