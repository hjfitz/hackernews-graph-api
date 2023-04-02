import type { AppProps } from 'next/app'
import { 
  ApolloClient,
  InMemoryCache,
  ApolloProvider
} from '@apollo/client';
import { useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Nav } from '../components/Nax';

// TODO: setup http link for uri
// TODO VEE TOO: set up ssr friendly token handling so that we can use auth link and plug a header
const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_GRAPH_API_URL,
  cache: new InMemoryCache(),
});

const App = ({ Component, pageProps }: AppProps) => {
  const [username, setUsername] = useState<string>('')
  const [token, setToken] = useState<string>('')
  return (
    <ApolloProvider client={client}>
      <AuthContext.Provider value={{username, setUsername, token, setToken}}>
        <Nav />
        <Component {...pageProps} />
      </AuthContext.Provider>
    </ApolloProvider>
  )
}

export default App
