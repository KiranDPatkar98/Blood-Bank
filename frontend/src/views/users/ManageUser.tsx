import { Form, Button, Alert, Modal } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useAPIClient } from '../../api';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

type Props = {
  action?: string;
};

const ManageUser = ({ action }: Props) => {
  const { post, put } = useAPIClient();
  const [errorMessage, setErrorMEssage] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');
  const uid = useParams().uid ?? null;
  const navigate = useNavigate();

  const schema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string()
      .email('Invalid email address format')
      .required('Email is required'),
    phoneNumber: Yup.string().required('Password is required'),
    username: Yup.string()
      .min(3, 'Username must be 3 characters at minimum')
      .required('Username is required'),
    password:
      action === 'add'
        ? Yup.string()
            .min(3, 'Password must be 3 characters at minimum')
            .required('Password is required')
        : Yup.string().notRequired(),
  });

  const userInfo =
    useSelector((s: any) =>
      s.users.users.find((values: any) => values.uid === uid)
    ) ?? null;

  const createUser = async (data: any) => {
    try {
      data['phone_number'] = data['phoneNumber'];
      delete data['phoneNumber'];
      await post('/create-user/', data);
      setSuccessMessage('User created successfully');
    } catch (e) {
      const error = JSON.parse((e as Error).message);
      setErrorMEssage(error.message);
    }
  };

  const updateUser = async (data: any) => {
    try {
      const { password, ...body } = data;
      body['phone_number'] = body['phoneNumber'];

      delete body['phoneNumber'];
      await put(`/update-user/?uid=${userInfo.uid}`, body);
      setSuccessMessage('User updated successfully');
    } catch (e) {
      const error = JSON.parse((e as Error).message);
      setErrorMEssage(error.message);
    }
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      phoneNumber: '',
      username: '',
      password: '',
    },
    validationSchema: schema,
    enableReinitialize: true,
    onSubmit: (values) => {
      if (action === 'add') {
        createUser(values);
      } else {
        updateUser(values);
      }
    },
  });

  const getUserData = () => {
    formik.setFieldValue('name', userInfo?.name);
    formik.setFieldValue('email', userInfo?.email);
    formik.setFieldValue('phoneNumber', userInfo?.phone_number);
    formik.setFieldValue('username', userInfo?.username);
  };

  useEffect(() => {
    if (action === 'edit') {
      getUserData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo]);

  const handleClose = () => {
    navigate('-1');
  };

  return (
    <div className="container">
      <div className="">
        <Modal show={!!successMessage} onHide={handleClose}>
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body className="text-center">{successMessage}</Modal.Body>
        </Modal>
        <div className="mb-3">
          <Button onClick={() => navigate(-1)}>Go back</Button>
        </div>
        <Form
          className="card p-3 col-lg-6 col-md-12"
          onSubmit={formik.handleSubmit}
        >
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              id="name"
              type="text"
              placeholder="Enter the name"
              isInvalid={!formik.values.name && formik.touched.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
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
              value={formik.values.email}
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
              value={formik.values.phoneNumber}
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
              onBlur={(e) => {
                formik.handleBlur(e);
              }}
              isInvalid={!formik.values.username && formik.touched.username}
              value={formik.values.username}
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
              value={formik.values.password}
            />
            <Form.Control.Feedback type="invalid">
              {formik.touched.password && formik.errors.password}
            </Form.Control.Feedback>
          </Form.Group>
          {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
          <Button type="submit">{action === 'add' ? 'Add' : 'Update'}</Button>
        </Form>
      </div>
    </div>
  );
};

export default ManageUser;
