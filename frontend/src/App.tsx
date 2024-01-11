/* eslint-disable react-hooks/exhaustive-deps */
import MainRouter from './routes/MainRouter';
import LoginRouter from './routes/LoginRouter';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Spinner } from 'react-bootstrap';
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
      dispatch(
        updatedLoginState(
          res.authenticated ? LoginStates.LOGGED_IN : LoginStates.LOGGED_OUT
        )
      );
    } catch {
      dispatch(updatedLoginState(false));
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  if (loginState === LoginStates.LOADING) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: '100vh' }}
      >
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <>
      {loginState === LoginStates.LOGGED_IN ? <MainRouter /> : <LoginRouter />}
    </>
  );
}

export default App;
