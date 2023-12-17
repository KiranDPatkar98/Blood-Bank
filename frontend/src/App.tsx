import MainRouter from './routes/MainRouter';
import LoginRouter from './routes/LoginRouter';

function App() {
  const isLoggedin = true;
  return <>{isLoggedin ? <MainRouter /> : <LoginRouter />}</>;
}

export default App;
