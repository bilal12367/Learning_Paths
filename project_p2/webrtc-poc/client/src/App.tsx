import React, { ComponentType } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import { Provider } from 'react-redux';
import Router from './Router';
import SocketProvider from './context/socket_context';
// import { Provider } from 'react-redux';
// import { store } from './redux/store';

function App() {

  return (
    <React.Fragment>
      <SocketProvider>
        <Router />
      </SocketProvider>
    </React.Fragment>
  );
}

export default App;
