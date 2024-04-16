import './App.css';

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import AlertsComponent from './AlertsComponent';

const client = new ApolloClient({
  uri: 'http://localhost:4003/graphql', // Set this to your actual GraphQL endpoint
  cache: new InMemoryCache(),
  credentials: 'include'
});

function App() {

  return (
    <div className='App'>
      <ApolloProvider client={client}>
        <AlertsComponent/>
      </ApolloProvider>
    </div>
  );
}

export default App;
