import React from 'react';
import { ApolloProvider } from '@apollo/client';
import client from './context/MainContext';
import HomePage from './pages/Home';

const App = () => {
  return (
    <ApolloProvider client={client}>
      <HomePage />
    </ApolloProvider>
  );
};

export default App;