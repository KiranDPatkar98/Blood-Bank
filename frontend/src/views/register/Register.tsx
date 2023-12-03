import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import './register.scss';

const schema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string()
    .email('Invalid email address format')
    .required('Email is required'),
  phoneNumber: Yup.string().required('Password is required'),
  username: Yup.string()
    .min(3, 'Username must be 3 characters at minimum')
    .required('Username is required'),
  password: Yup.string()
    .min(3, 'Password must be 3 characters at minimum')
    .required('Password is required'),
});

const Register = () => {
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      phoneNumber: '',
      username: '',
      password: '',
    },
    validationSchema: schema,
    onSubmit: () => {
      console.log('Inside submit');
    },
  });

  console.log(formik.errors, 'iam formik');

  return (
    <div className="registration-page">
      <div className="container">
        <Form className="card p-3 mx-auto col-6" onSubmit={formik.handleSubmit}>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              id="name"
              type="text"
              placeholder="Enter the name"
              isInvalid={!formik.values.name && formik.touched.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <Form.Control.Feedback type="invalid">
              {formik.touched.name && formik.errors.name}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              id="email"
              type="email"
              placeholder="Enter the email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={!formik.values.email && formik.touched.email}
            />
            <Form.Control.Feedback type="invalid">
              {formik.touched.email && formik.errors.email}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="phoneNumber">
            <Form.Label>Phone number</Form.Label>
            <Form.Control
              id="phoneNumber"
              type="text"
              placeholder="Enter the phone number"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={
                !formik.values.phoneNumber && formik.touched.phoneNumber
              }
            />
            <Form.Control.Feedback type="invalid">
              {formik.touched.phoneNumber && formik.errors.phoneNumber}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control
              id="username"
              type="text"
              placeholder="Enter the username"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={!formik.values.username && formik.touched.username}
            />
            <Form.Control.Feedback type="invalid">
              {formik.touched.username && formik.errors.username}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              id="password"
              type="password"
              placeholder="*****"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={!formik.values.password && formik.touched.password}
            />
            <Form.Control.Feedback type="invalid">
              {formik.touched.password && formik.errors.password}
            </Form.Control.Feedback>
          </Form.Group>
          <p>
            Already have an account ? <Link to="/login">Login </Link>
          </p>
          <Button type="submit">Register</Button>
        </Form>
      </div>
    </div>
  );
};

export default Register;
