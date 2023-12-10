import React from 'react';
import './App.scss';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainRouter from './routes/MainRouter';
import LoginRouter from './routes/LoginRouter';

function App() {
  const isLoggedin = true;
  return <>{isLoggedin ? <MainRouter /> : <LoginRouter />}</>;
}

export default App;
