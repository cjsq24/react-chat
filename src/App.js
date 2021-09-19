import AuthProvider from './auth/AuthProvider';
import './App.css';
import Navigator from './Navigator';
import socket from './socket'

import { useEffect } from 'react';
import { Provider } from 'react-redux';
import storeConfig from './redux/store'

const store = storeConfig()

socket(store)


function App() {
  useEffect(() => {
    //ioClient.emit('hello', 'Te saludo desde react')
  }, [])

  return (
    <Provider store={store}>
      <AuthProvider>
        <Navigator />
      </AuthProvider>
    </Provider>
  );
}

export default App;
