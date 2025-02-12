import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignupSignin from './components/SignupSignin';
import Home from './components/Home';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<SignupSignin />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;