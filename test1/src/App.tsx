import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import FirstPage from './pages/FirstPage';
function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' Component={FirstPage} />
      </Routes>
    </Router>
  );
}

export default App;
