import '@/styles/globals.scss'
import '@/styles/app.scss'
import "@/styles/selfie.scss"

import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
