import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Form, Button, Row, Col, Card } from 'react-bootstrap';
import * as Yup from 'yup';
import { useAPIClient } from '../../api';
import CustomModal from '../../components/modal/Modal';
import { bloodGroups } from '../../helpers/bloodGroups';

const schema = Yup.object().shape({
  name: Yup.string().required(' Donor name is required'),
  bloodGroup: Yup.string().required('Blood group is required'),
  units: Yup.string().required('Units is required'),
  city: Yup.string().required('City  is required'),
  address: Yup.string().required('Address is required'),
});

const donationInfo = [
  {
    title: 'Everyone Could Be a Hero',
    description:
      'From students to professionals, every donor plays a heroic role in saving lives. Join this noble cause and make a difference today!',
  },
  {
    title: 'Your Donation Saves Lives',
    description:
      'Donating blood directly saves lives in emergencies, surgeries, and for patients with medical conditions, offering immediate help and hope to individuals and communities.',
  },
  {
    title: 'Benefits of Being a Donor',
    description:
      'Receive a free health check-up, discover your blood type, and experience the fulfilling reward of contributing to community health.',
  },
];

const Donor = () => {
  const { post } = useAPIClient();
  const [isOpen, setOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMEssage] = useState<string>('');

  const addDonor = async (values: any) => {
    try {
      const { name, bloodGroup, weight, ...rest } = values;
      await post('/donate-blood/', {
        donor: name,
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
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const formik = useFormik({
    initialValues: {
      name: '',
      bloodGroup: '',
      units: '',
      city: '',
      address: '',
    },
    enableReinitialize: true,
    validationSchema: schema,
    onSubmit: (values) => {
      addDonor(values);
    },
  });

  const onModalClose = () => {
    if (errorMessage) {
      setErrorMEssage('');
    } else setOpen(false);
  };

  return (
    <div className="donor-page">
      <div className="container">
        <CustomModal
          isOpen={isOpen || !!errorMessage}
          heading={errorMessage ? 'Error' : 'Success'}
          body={
            errorMessage ? errorMessage : 'Donor details added successfully'
          }
          handleClose={onModalClose}
          handleSubmit={onModalClose}
        />
        <Row className="g-3">
          <Col lg={6} md={12}>
            <Form className="card p-3" onSubmit={formik.handleSubmit}>
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

              <Form.Group className="mb-3" controlId="city">
                <Form.Label>City</Form.Label>
                <Form.Control
                  id="city"
                  type="text"
                  placeholder="Enter the city"
                  onChange={formik.handleChange}
                  onBlur={(e) => {
                    formik.handleBlur(e);
                  }}
                  value={formik.values.city}
                  isInvalid={!formik.values.city && formik.touched.city}
                />
                <Form.Control.Feedback type="invalid">
                  {formik.touched.city && formik.errors.city}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="address">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  id="address"
                  as="textarea"
                  value={formik.values.address}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isInvalid={!formik.values.address && formik.touched.address}
                />
                <Form.Control.Feedback type="invalid">
                  {formik.touched.address && formik.errors.address}
                </Form.Control.Feedback>
              </Form.Group>
              <Button type="submit">Donate</Button>
            </Form>
          </Col>
          <Col lg={6} md={12}>
            {donationInfo.map((value) => (
              <Card className="p-2 mb-2 border border-danger rounded-5 shadow">
                <Card.Body>
                  <Card.Title style={{ color: 'red' }}>
                    {value.title}
                  </Card.Title>
                  <Card.Text>{value.description}</Card.Text>
                </Card.Body>
              </Card>
            ))}
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Donor;
