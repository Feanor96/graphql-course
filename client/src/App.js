import './App.css';
import DisplayData from './DisplayData';

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const App = () => {
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: 'http://localhost:4000/graphql'
  });
  return (
    <ApolloProvider client={client}>
      <div className="container">
        <h2>List of users</h2>
        <DisplayData />
      </div>
    </ApolloProvider>
  )
}

export default App;
