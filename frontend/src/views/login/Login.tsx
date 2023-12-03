import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './login.scss';

const Login = () => {
  return (
    <div className="login-page">
      <div className="container">
        <Form className="card p-3 mx-auto col-5">
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter the username"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="*****" required />
          </Form.Group>
          <p>
            Don't have account ? <Link to="/register">Register </Link>
          </p>
          <Button type="submit">Login</Button>
        </Form>
      </div>
    </div>
  );
};

export default Login;
