import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditUser = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [editedName, setEditedName] = useState('');
  const [editedEmail, setEditedEmail] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/users/${id}`);
        if (!response.data) {
          throw new Error('Unexpected Server Response');
        }

        const data = response.data;
        setUser(data);
        setEditedName(data.name);
        setEditedEmail(data.email);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchUser();
  }, [id]);

  const handleNameChange = (e) => {
    setEditedName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEditedEmail(e.target.value);
  };

  const handleSave = async () => {
    try {
      // Update user information in the database
      const response = await axios.put(`http://localhost:3001/users/${id}`, {
        name: editedName,
        email: editedEmail,
      });

      if (!response.data) {
        throw new Error('Failed to save changes');
      }

      console.log('Changes saved successfully');

      // Navigate to the visualization page after saving
      navigate('/');
    } catch (error) {
      console.error('Error saving changes:', error);
    }
  };

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div className='form m-auto shadow border-top w-50 my-4'>
      <h2 className='text-center border-bottom shadow'>Edit User</h2>
      <div className="input d-flex flex-column w-75 m-auto">
        <p><span>ID: </span>{user.id}</p>
        <label><span>Name:</span>
          <input type="text" value={editedName} onChange={handleNameChange} className='form-control' />
        </label><br />
        <label><span>Email: </span>
          <input type="text" value={editedEmail} onChange={handleEmailChange} className='form-control' />
        </label><br />

        <label><span>Photo: </span>
        <div className="alert alert-warning my-3">
          you don't change your image !
        </div>
        </label>

        <button onClick={handleSave} className='my-4 btn btn-primary mx-auto'>Save Changes</button>
      </div>
    </div>
  );
};

export default EditUser;
