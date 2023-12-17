import React from 'react';
import Layout from '../views/layout/Layout';
import { Navigate, Route, Routes } from 'react-router-dom';
import Dashboard from '../views/dashboard/Dashboard';
import Users from '../views/users/Users';
import Donar from '../views/donar/Donar';
import RequestBlood from '../views/requestBlood/RequestBlood';
import Search from '../views/search/Search';

const MainRouter = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/donar" element={<Donar />}></Route>
        <Route path="/blood-request" element={<RequestBlood />}></Route>
        <Route path="/search-donar" element={<Search />}></Route>
        <Route path="/users" element={<Users />}></Route>

        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
    </Layout>
  );
};

export default MainRouter;
