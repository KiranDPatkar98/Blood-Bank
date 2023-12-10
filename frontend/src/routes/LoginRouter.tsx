import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Login from '../views/login/Login';
import Register from '../views/register/Register';

const LoginRouter = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/register" element={<Register />}></Route>
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default LoginRouter;
