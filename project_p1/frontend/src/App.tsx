import React, { ComponentType } from 'react';
import logo from './logo.svg';
import LAZY from './utils/Lazy';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import { APP_ROUTES } from './utils/Constants';
import { JsxElement } from 'typescript';
import { Provider } from 'react-redux';
import { store } from './redux/store';
// import { Provider } from 'react-redux';
// import { store } from './redux/store';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path={APP_ROUTES.LANDING} Component={LAZY.LANDING_PAGE} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
