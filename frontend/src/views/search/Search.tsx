import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAPIClient } from '../../api';
import { Button, Form, Table } from 'react-bootstrap';
import { bloodGroups } from '../../helpers/bloodGroups';
import { useState } from 'react';

const schema = Yup.object().shape({
  bloodGroup: Yup.string().required('Blood group is required'),
  city: Yup.string().required('City is required'),
});

type searchUser = {
  donar: string;
  city: string;
  blood_group: string;
  address: string;
  phone_number: string;
  email: string;
};

const Search = () => {
  const { makeRequest } = useAPIClient();
  const [donars, setDonars] = useState<searchUser[] | null>(null);

  const searchDonar = async (values: any) => {
    try {
      const { city, bloodGroup } = values;
      console.log(bloodGroup, 'bloodGroup');

      const res = await makeRequest(
        `/search-donor/?city=${city}&blood_group=${encodeURIComponent(
          bloodGroup
        )}`
      );
      setDonars(res.data);
    } catch (e) {
      //   const error = JSON.parse((e as Error).message);
    }
  };

  const formik = useFormik({
    initialValues: {
      bloodGroup: '',
      city: '',
    },
    enableReinitialize: true,
    validationSchema: schema,
    onSubmit: (values) => {
      searchDonar(values);
    },
  });

  return (
    <div className="container">
      <Form className="card p-3" onSubmit={formik.handleSubmit}>
        <div className="row">
          <div className="col-md-6 mb-3">
            <Form.Group controlId="bloodGroup">
              <Form.Label>Blood group</Form.Label>
              <Form.Control
                id="bloodGroup"
                as="select"
                placeholder="Enter the blood group"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.bloodGroup}
                isInvalid={
                  !formik.values.bloodGroup && formik.touched.bloodGroup
                }
              >
                <option value="">Select...</option>
                {bloodGroups.map((value) => (
                  <option key={value.name} value={value.name}>
                    {value.name}
                  </option>
                ))}
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                {formik.touched.bloodGroup && formik.errors.bloodGroup}
              </Form.Control.Feedback>
            </Form.Group>
          </div>
          <div className="col-md-6 mb-3">
            <Form.Group controlId="city">
              <Form.Label>City</Form.Label>
              <Form.Control
                id="city"
                type="text"
                placeholder="Enter the city"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.city}
                isInvalid={!formik.values.city && formik.touched.city}
              />
              <Form.Control.Feedback type="invalid">
                {formik.touched.city && formik.errors.city}
              </Form.Control.Feedback>
            </Form.Group>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <Button type="submit">Search</Button>
          </div>
        </div>
      </Form>
      {donars && (
        <Table className="mt-4">
          <thead>
            <tr>
              <th>Sl. No</th>
              <th>Donar name</th>
              <th>Phone number</th>
              <th>Email</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            {donars.length > 0 ? (
              donars.map((value, idx) => (
                <tr>
                  <td>{idx + 1}</td>
                  <td>{value.donar}</td>
                  <td>{value.phone_number}</td>
                  <td>{value.email}</td>
                  <td>{value.address}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center">
                  No records found.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default Search;
