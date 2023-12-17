import { useFormik } from 'formik';
import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import * as Yup from 'yup';
import { useAPIClient } from '../../api';
import CustomModal from '../../components/modal/Modal';
import { bloodGroups } from '../../helpers/bloodGroups';

const schema = Yup.object().shape({
  name: Yup.string().required(' Donar name is required'),
  bloodGroup: Yup.string().required('Blood group is required'),
  units: Yup.string().required('Units is required'),
  city: Yup.string().required('City  is required'),
  address: Yup.string().required('Address is required'),
});

const Donar = () => {
  const { post } = useAPIClient();
  const [isOpen, setOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMEssage] = useState<string>('');

  const addDonar = async (values: any) => {
    try {
      const { name, bloodGroup, weight, ...rest } = values;
      await post('/donate-blood/', {
        donar: name,
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
      city: '',
      address: '',
    },
    enableReinitialize: true,
    validationSchema: schema,
    onSubmit: (values) => {
      addDonar(values);
    },
  });

  const onModalClose = () => {
    if (errorMessage) {
      setErrorMEssage('');
    } else setOpen(false);
  };

  return (
    <div className="donar-page">
      <div className="container">
        <CustomModal
          isOpen={isOpen || !!errorMessage}
          heading={errorMessage ? 'Error' : 'Success'}
          body={
            errorMessage ? errorMessage : 'Donar details added successfully'
          }
          handleClose={onModalClose}
          handleSubmit={onModalClose}
        />
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
              isInvalid={!formik.values.bloodGroup && formik.touched.bloodGroup}
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
      </div>
    </div>
  );
};

export default Donar;
