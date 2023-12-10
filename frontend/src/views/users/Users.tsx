import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { useAPIClient } from '../../api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type UsersType = {
  name: string;
  username: string;
  email: string;
  phone_number: number;
};

const Users = () => {
  const [users, setUsers] = useState<UsersType[] | []>([]);
  const { makeRequest } = useAPIClient();

  const getUsers = async () => {
    try {
      const res = await makeRequest('/users/');
      setUsers(res.data);
    } catch (error) {}
  };

  useEffect(() => {
    getUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
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
                <td>{value?.name}</td>
                <td>{value?.username}</td>
                <td>{value?.email}</td>
                <td>{value?.phone_number}</td>
                <td>
                  <FontAwesomeIcon icon={['fas', 'user-edit']} />
                </td>
              </tr>
            );
          })}
      </tbody>
    </Table>
  );
};

export default Users;
