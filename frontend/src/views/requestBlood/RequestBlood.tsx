import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAPIClient } from '../../api';
import CustomModal from '../../components/modal/Modal';
import { Button, Form, Row, Col, Card, ListGroup } from 'react-bootstrap';
import { bloodGroups } from '../../helpers/bloodGroups';

const schema = Yup.object().shape({
  name: Yup.string().required(' Patient name is required'),
  bloodGroup: Yup.string().required('Blood group is required'),
  units: Yup.string().required('Units is required'),
});

const RequestBlood = () => {
  const { post } = useAPIClient();
  const [isOpen, setOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMEssage] = useState<string>('');

  const requestBlood = async (values: any) => {
    try {
      const { name, bloodGroup, ...rest } = values;
      await post('/request-blood/', {
        requestor: name,
        blood_group: bloodGroup,
        ...rest,
      });
      setOpen(true);
      formik.resetForm();
    } catch (e) {
      const error = JSON.parse((e as Error).message);
      setErrorMEssage(error.message);
    }
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      bloodGroup: '',
      units: '',
    },
    enableReinitialize: true,
    validationSchema: schema,
    onSubmit: (values) => {
      requestBlood(values);
    },
  });

  const onModalClose = () => {
    if (errorMessage) {
      setErrorMEssage('');
    } else setOpen(false);
  };

  return (
    <div className="request-page">
      <div className="container">
        <CustomModal
          isOpen={isOpen || !!errorMessage}
          heading={errorMessage ? 'Error' : 'Success'}
          body={errorMessage ? errorMessage : 'Request has been made'}
          handleClose={onModalClose}
          handleSubmit={onModalClose}
        />
        <Row>
          <Col lg={6} md={12}>
            <Form className="card p-3 " onSubmit={formik.handleSubmit}>
              <Form.Group className="mb-3" controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  id="name"
                  type="text"
                  placeholder="Enter the name"
                  value={formik.values.name}
                  isInvalid={!formik.values.name && formik.touched.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <Form.Control.Feedback type="invalid">
                  {formik.touched.name && formik.errors.name}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="bloodGroup">
                <Form.Label>Blood group</Form.Label>
                <Form.Control
                  id="bloodGroup"
                  as="select"
                  placeholder="Enter the blood-group"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.bloodGroup}
                  isInvalid={
                    !formik.values.bloodGroup && formik.touched.bloodGroup
                  }
                >
                  <option value="">Select...</option>
                  {bloodGroups.map((value) => (
                    <option value={value.name}>{value.name}</option>
                  ))}
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                  {formik.touched.bloodGroup && formik.errors.bloodGroup}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="units">
                <Form.Label>Units</Form.Label>
                <Form.Control
                  id="units"
                  type="text"
                  placeholder="Enter the units"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.units}
                  isInvalid={!formik.values.units && formik.touched.units}
                />
                <Form.Control.Feedback type="invalid">
                  {formik.touched.units && formik.errors.units}
                </Form.Control.Feedback>
              </Form.Group>
              <Button type="submit">Request</Button>
            </Form>
          </Col>
          <Col lg={6} md={12}>
            <Card className="p-2 mb-2 border border-danger rounded-5 shadow">
              <Card.Header>Blood Group Acceptance List</Card.Header>
              <Card.Body>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <strong>A+</strong> can accept from A+, A-, O+, O-
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>A-</strong> can accept from A-, O-
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>B+</strong> can accept from B+, B-, O+, O-
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>B-</strong> can accept from B-, O-
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>AB+</strong> can accept from all blood types
                    (universal acceptor)
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>AB-</strong> can accept from AB-, A-, B-, O-
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>O+</strong> can accept from O+, O-
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>O-</strong> can accept from O-
                  </ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default RequestBlood;
