import React, { ComponentType } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import { Provider } from 'react-redux';
import Store from './store/store';
import Test from './pages/Test';
import Router from './Router';
// import { Provider } from 'react-redux';
// import { store } from './redux/store';

function App() {

  return (
    <React.Fragment>
      <Provider store={Store}>
        <Router />
      </Provider>
    </React.Fragment>
  );
}

export default App;
