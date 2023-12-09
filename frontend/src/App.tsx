import React from 'react';
import './App.scss';
import { Routes, Route, Navigate } from 'react-router-dom';

import Login from './views/login/Login';
import Register from './views/register/Register';
import Dashboard from './views/dashboard/Dashboard';

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </>
  );
}

export default App;
