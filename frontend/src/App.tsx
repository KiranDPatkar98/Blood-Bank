import React from 'react';
import './App.scss';
import { Routes, Route, Navigate } from 'react-router-dom';

import Login from './views/login/Login';
import Register from './views/register/Register';

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </>
  );
}

export default App;
