import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "../src/chakra/theme";
import { ApolloProvider } from "@apollo/client";
import { client } from "../src/graphql/apollo-client";
import { Toaster } from "react-hot-toast";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <SessionProvider session={pageProps.session}>
        <ChakraProvider theme={theme}>
          <Component {...pageProps} />
          <Toaster position="top-center" reverseOrder={false} />
        </ChakraProvider>
      </SessionProvider>
    </ApolloProvider>
  );
}

export default MyApp;
