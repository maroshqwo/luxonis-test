import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Landing from './views/Landing';

function App() {
  return (
    <BrowserRouter>
      <ChakraProvider>
        <Landing />
      </ChakraProvider>
    </BrowserRouter>
  );
}

export default App;
