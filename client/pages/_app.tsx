import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider } from "@chakra-ui/react";
import { ApolloProvider } from "@apollo/client";
import { SessionProvider } from "next-auth/react";
import { client } from "../apollo-client";
import Header from '../components/header';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  
  return (
    <ChakraProvider>
      <ApolloProvider client={client}>
        <SessionProvider session={session}>
          <Header />
          <Component {...pageProps} />
        </SessionProvider>
      </ApolloProvider>
    </ChakraProvider>
  );
}

export default MyApp
