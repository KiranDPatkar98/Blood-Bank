/* eslint-disable react-hooks/exhaustive-deps */
import MainRouter from './routes/MainRouter';
import LoginRouter from './routes/LoginRouter';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { LoginStates } from './types/LoginState';
import { useAPIClient } from './api';
import { updatedLoginState } from './redux/slices/authSlice';

function App() {
  const { makeRequest } = useAPIClient();
  const { loginState } = useSelector((s: any) => s.app);
  const dispatch = useDispatch();

  const checkAuth = async () => {
    try {
      const res = await makeRequest('/check-auth/');
      dispatch(updatedLoginState(res.data.authenticated));
    } catch {
      dispatch(updatedLoginState(false));
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  if (loginState === LoginStates.LOADING) {
    return <h1>Loading</h1>;
  }

  return (
    <>
      {loginState === LoginStates.LOGGED_IN ? <MainRouter /> : <LoginRouter />}
    </>
  );
}

export default App;
