import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import './view.scss';

const ViewUser = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`http://localhost:3001/users/${id}`);
        if (!response.ok) {
          throw new Error("Unexpected Server Response");
        }

        const data = await response.json();
        setUser(data);

        // Récupérer l'URL de l'image depuis Firebase Storage
        const storage = getStorage();
        const imageRef = ref(storage, data.img);
        const url = await getDownloadURL(imageRef);
        setImageUrl(url);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchUser();
  }, [id]);

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div className='border shadow m-auto w-50 my-5'>
      <h2 className='text-center shadow'>User Details</h2>
      <div className="bg-dark text-white p-5 d-flex justify-content-between">
        <div className="info">
          <p><span className='fw-bold ms-3'>ID </span>: {user.id}</p>
          <p><span className='fw-bold ms-3'>Name</span>: {user.name}</p>
          <p><span className='fw-bold ms-3'>Email</span>: {user.email}</p>
          <Link to={`/edit/${user.id}`} className='btn btn-warning ms-3'>Edit</Link>
          <Link to="/" className='btn btn-primary ms-3'>Back</Link>
        </div>
        <div className="myImg">
          <p className='text-center'>
            <span className='fw-bold ms-3'></span>
            {imageUrl ? (
              <img src={user.image} alt='img' />
            ) : (
              <p>No image available</p>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ViewUser;
