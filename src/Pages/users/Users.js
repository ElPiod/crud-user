// Users.js

import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { EyeFill, PencilFill, TrashFill } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import "./users.scss";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/users');
        setUsers(response.data);
      } catch (error) {
        console.log(error);
      }
    };
  
    fetchData();
  }, []);

  const deleteUser = (userId) => {
    axios.delete(`http://localhost:3001/users/${userId}`)
      .then(res => {
        setUsers(users.filter(user => user.id !== userId));
        // Remove the user from selectedUsers if it's selected
        setSelectedUsers(selectedUsers.filter(id => id !== userId));
      })
      .catch(err => console.log(err));
  };

  const toggleUserSelection = (userId) => {
    if (selectedUsers.includes(userId)) {
      // If the user is already selected, unselect it
      setSelectedUsers(selectedUsers.filter(id => id !== userId));
    } else {
      // If the user is not selected, display a confirmation alert
      const confirmEdit = window.confirm("Are you sure you want to edit this user? You will lose your photo.");
      
      if (confirmEdit) {
        // If the user confirms, select the user
        setSelectedUsers([...selectedUsers, userId]);
      }
    }
  };

  const toggleSelectAll = () => {
    setSelectAll(!selectAll);

    if (!selectAll) {
      // If not all are selected, set all users to selectedUsers
      const allUserIds = users.map(user => user.id);
      setSelectedUsers(allUserIds);
    } else {
      // If all are selected, clear selectedUsers
      setSelectedUsers([]);
    }
  };

  const handleEdit = () => {
      alert('If you edit your user you will lose your image')
  }

  return (
    <div className='users border shadow'>
      <h1 className='text-center border shadow fixed'>Liste des utilisateurs</h1>
      <div className='user-list'>
        <div className="add text-end me-3">
          <Link to="/add" className='btn btn-success my-2'>Add +</Link>
        </div>
        <table className='table'>
          <thead>
            <tr className='user-card'>
              <th><input type="checkbox" checked={selectAll} onChange={toggleSelectAll} /></th>
              <th>ID</th>
              <th>Name</th>
              <th>Photo</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr className='user-card' key={user.id}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedUsers.includes(user.id)}
                    onChange={() => toggleUserSelection(user.id)}
                  />
                </td>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>
                  <img
                    src={user.image}
                    alt='img'
                    className='user-img rounded-circle'
                    style={{ width: '30px', height: '30px' }}
                  />
                </td>
                <td>{user.email}</td>
                <td className='link'>
                  <Link to={`/view/${user.id}`}>
                    <EyeFill size={18} color='skyblue' className='ms-2' />
                  </Link>
                  <Link onClick={handleEdit} to={`/edit/${user.id}`}>
                    <PencilFill size={18} color='yellow' className='ms-2' />
                  </Link>
                  <span onClick={() => deleteUser(user.id)}>
                    <TrashFill size={18} color='red' className='ms-2' />
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
