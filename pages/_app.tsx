import { ApolloProvider } from "@apollo/client"
import client from "../lib/apollo-client"
import type { AppProps } from "next/app"
import "../styles/global.css"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}

export default MyApp
