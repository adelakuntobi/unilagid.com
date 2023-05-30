import '@/styles/globals.scss'
import '@/styles/app.scss'
import "@/styles/selfie.scss"
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import type { AppProps } from 'next/app'
import { useState } from 'react';

export default function App({ Component, pageProps }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      {/* {Component.public ?  */}
      <Component {...pageProps} />
          {/* : <Protected><Component {...pageProps} /></Protected>} */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
