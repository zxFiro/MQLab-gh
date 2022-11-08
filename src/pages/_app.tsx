import '../styles/globals.css'
import type { AppProps } from 'next/app'
// 1. import `ChakraProvider` component
import { ChakraProvider } from '@chakra-ui/react'
import { ApolloProvider } from '@apollo/client'
import apolloClient from '../../lib/apollo'

function MyApp({ Component, pageProps }: AppProps) {
  // 2. Wrap ChakraProvider at the root of your app
  return (
    <ApolloProvider client={apolloClient}>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </ApolloProvider>
  )
}

export default MyApp