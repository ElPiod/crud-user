// AddUsers.js
import React, { useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { storage, firestore } from '../../Firebase';
import { ref, uploadBytes, getDownloadURL } from '@firebase/storage';
import { addDoc, collection } from '@firebase/firestore';
import './addusers.scss';

const AddUsers = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    image: null,
  });

  const [imageUrl, setImageUrl] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    const newValue = type === 'file' ? files[0] : value;

    setUserData({
      ...userData,
      [name]: newValue,
    });
  };

  const messageRef = useRef("")
  
  const handleAddUser = async (e) => {
    e.preventDefault();

    try {
      // Upload de l'image vers Firebase Storage
      const storageRef = ref(storage, `images/${userData.image.name}`);
      await uploadBytes(storageRef, userData.image);

      // Récupération de l'URL d'image
      const imageUrl = await getDownloadURL(storageRef);

      // Enregistrement de l'URL d'image dans le state
      setImageUrl(imageUrl);

      // Afficher une alerte
      alert('L\'image a été récupérée avec succès!');

      // Envoi des données de l'utilisateur (y compris l'URL d'image) vers le serveur
      await axios.post('http://localhost:3001/users', {
        name: userData.name,
        email: userData.email,
        image: imageUrl,
      });

      // Redirection vers la page des utilisateurs après l'ajout réussi
      navigate('/');
    } catch (error) {
      console.error('Error adding user:', error);
    } finally {
      // Réinitialisation des données du formulaire après l'envoi
      setUserData({
        name: '',
        email: '',
        image: null,
      });
      setImageUrl('');
    }

    // capter les donnes
    const messagesCollection = collection(firestore, "messages")

    const data = {
      name: userData.name,
      email: userData.email,
    };

    try {
          await addDoc(messagesCollection, data);
          alert('Document successfully written!');
      } catch (error) {
          console.error('Error writing document: ', error);
          alert('Error writing document. Check the console for details.');
      }
      
    };


  return (
    <div>
      <h1 className='text-center shadow p-2'>Ajouter un utilisateur</h1>
      <form onSubmit={handleAddUser} className='form border shadow m-auto text-center my-3 w-50' ref={messageRef}>
        <label>
          <input
            className='form-control'
            type="text"
            name="name"
            value={userData.name}
            onChange={handleChange}
            placeholder='Nom complet'
          />
        </label>
        <br />

        <label>
          <input
            className='form-control'
            type="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            placeholder='exemple@gmail.com'
          />
        </label>
        <br />

        <label>
          <input
            className='form-control last-child'
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
          />
        </label>
        <br />

        {imageUrl && <img src={imageUrl} alt="Utilisateur" />}
        <br />

        <button className='btn btn-primary my-5' type="submit">Ajouter</button>
      </form>
    </div>
  );
};

export default AddUsers;
