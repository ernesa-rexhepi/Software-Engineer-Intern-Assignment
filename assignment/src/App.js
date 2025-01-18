import React from "react";
import { ApolloProvider } from '@apollo/client';
import client from './context/MainContext';
import HomePage from './pages/Home';
import Footer from './components/Footer';
import i18n from './components/i18n'; // or wherever your i18n config is located


const App = () => {
  return (
    <ApolloProvider client={client}>
      <HomePage />
      <Footer />
    </ApolloProvider>
  );
};

export default App;
