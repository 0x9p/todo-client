import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

import Home from '../components/pages/Home';

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: "http://localhost:2106/graphql"
});

export function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  );
}
