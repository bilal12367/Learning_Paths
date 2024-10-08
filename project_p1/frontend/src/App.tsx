import React, { ComponentType } from 'react';
import logo from './logo.svg';
import {LAZY, Fallback} from './utils/Lazy';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Navigate, Route, Router, Routes } from 'react-router-dom';
import { APP_ROUTES } from './utils/Constants';
import { JsxElement } from 'typescript';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import './App.css'
// import { Provider } from 'react-redux';
// import { store } from './redux/store';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes >
          <Route path={APP_ROUTES.LANDING} element={<Navigate to={APP_ROUTES.SEARCH} replace />} />
          <Route path={APP_ROUTES.SEARCH} element={<Fallback>{LAZY.SEARCH_PAGE}</Fallback>}>
            <Route index path={APP_ROUTES.SEARCH_FLIGHTS} element={<Fallback>{LAZY.SEARCH_FLIGHTS}</Fallback>}/>
            <Route path={APP_ROUTES.SEARCH_HOTELS} element={<Fallback>{LAZY.SEARCH_HOTELS}</Fallback>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
