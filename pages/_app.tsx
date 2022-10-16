import React, { useEffect, useState } from 'react'
import { Layout } from '../components'
import 'tailwindcss/tailwind.css'
import type { AppProps } from 'next/app'
import '../styles/globals.scss'


function MyApp({ Component, pageProps }: { Component: any, pageProps: any }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
