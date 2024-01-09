import React, { useEffect, useState } from 'react';
import { Table, Container, Row, Col, Button } from 'react-bootstrap';
import { useAPIClient } from '../../api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import './users.scss';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { receivedUsers } from '../../redux/slices/userSlice';

type UsersType = {
  uid: string;
  name: string;
  username: string;
  email: string;
  phone_number: number;
};

const Users = () => {
  const [users, setUsers] = useState<UsersType[] | []>([]);
  const { makeRequest, remove } = useAPIClient();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getUsers = async () => {
    try {
      const res = await makeRequest('/get-users/');
      dispatch(receivedUsers(res.data));
      setUsers(res.data);
    } catch (e) {
      const error = JSON.parse((e as Error).message);
      if (error.status === 401) {
        console.log('tOKEN IS EXPIRD');
      }
    }
  };

  const deleteUser = async (id: any) => {
    try {
      await remove(`/delete-user/?uid=${id}`);
    } catch {}
  };

  useEffect(() => {
    getUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <Row>
        <Col>
          <div className="new-user mb-2">
            <Button onClick={() => navigate('/users/add')}>Add new </Button>
          </div>
          <Table striped bordered hover variant="light">
            <thead>
              <tr>
                <th>Sl. No</th>
                <th>Name</th>
                <th>Username</th>
                <th>Email</th>
                <th>Phone number</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users &&
                users.map((value, idx) => {
                  return (
                    <tr>
                      <td>{idx + 1}</td>
                      <td>{value?.name || 'NA'}</td>
                      <td>{value?.username}</td>
                      <td>{value?.email}</td>
                      <td>{value?.phone_number || 'NA'}</td>
                      <td>
                        <FontAwesomeIcon
                          className="action-icon mx-2"
                          icon={faUserPen}
                          onClick={() => navigate(`/users/edit/${value.uid}`)}
                        />
                        <FontAwesomeIcon
                          className="action-icon mx-2"
                          icon={faTrash}
                          onClick={() => deleteUser(value.uid)}
                        />
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default Users;
