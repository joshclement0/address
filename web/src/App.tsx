import React, { useState } from 'react';
import './App.css';
import AddressBook from './pages/AddressBook';
import userContext from './lib/context/authcontext';
import { ChakraProvider } from '@chakra-ui/react';

function App() {
  const [userID,setUserID] = useState(0)
  const [isLoggedIn,setLoggedIn] = useState(true)

  const contextvalue = {userID,setUserID,isLoggedIn,setLoggedIn}
  return (
    <div className="App">
      <userContext.Provider value={contextvalue}>
        <header className="App-header">
          <ChakraProvider>
          
          <AddressBook/>
          </ChakraProvider>
        </header>
      </userContext.Provider>
    </div>
  );
}

export default App;
