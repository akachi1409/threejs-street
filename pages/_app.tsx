import '../styles/globals.scss'
import '../styles/animation.scss'
import React from "react";
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp