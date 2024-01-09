import { Form, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './login.scss';
import * as Yup from 'yup';
// import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { useAPIClient } from '../../api';
import { LoginStates } from '../../types/LoginState';
import { useDispatch } from 'react-redux';
import { updatedLoginState } from '../../redux/slices/authSlice';
import { useState } from 'react';

const Login = () => {
  // const navigate = useNavigate();
  const { post } = useAPIClient();
  const dispatch = useDispatch();
  const [errorMessage, setErrorMEssage] = useState<string>('');

  const login = async (values: any) => {
    try {
      setErrorMEssage('');
      const res = await post('/login/', values);
      localStorage.setItem('access_token', res.access_token);
      // localStorage.setItem('refresh_token', res.refresh_token);
      dispatch(updatedLoginState(LoginStates.LOGGED_IN));
    } catch (e) {
      const error = JSON.parse((e as Error).message);
      setErrorMEssage(error.message);
    }

    // navigate('/dashboard');
  };

  const schema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: schema,
    onSubmit: (values) => {
      login(values);
    },
  });

  return (
    <div className="login-page">
      <div className="container">
        <Form
          className="card p-3 mx-auto col-lg-5 col-md-12"
          onSubmit={formik.handleSubmit}
        >
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Username</Form.Label>
            <Form.Control
              id="username"
              type="text"
              placeholder="Enter the username"
              isInvalid={!formik.values.username && formik.touched.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <Form.Control.Feedback type="invalid">
              {formik.touched.username && formik.errors.username}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
            <Form.Label>Password</Form.Label>
            <Form.Control
              id="password"
              type="password"
              placeholder="*****"
              isInvalid={!formik.values.password && formik.touched.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <Form.Control.Feedback type="invalid">
              {formik.touched.password && formik.errors.password}
            </Form.Control.Feedback>
          </Form.Group>
          <p>
            Don't have account ? <Link to="/register">Register </Link>
          </p>
          {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
          <Button type="submit">Login</Button>
        </Form>
      </div>
    </div>
  );
};

export default Login;
