import React from 'react';
import Layout from '../views/layout/Layout';
import { Navigate, Route, Routes } from 'react-router-dom';
import Dashboard from '../views/dashboard/Dashboard';
import Users from '../views/users/Users';

const MainRouter = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/users" element={<Users />}></Route>
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
    </Layout>
  );
};

export default MainRouter;
