// Dans App.js ou votre composant principal de routage
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Users from './Pages/users/Users';
import ViewUser from './Pages/voir/ViewUser';
import EditUser from './Pages/edit/EditUser';
import AddUsers from './Pages/adduser/AddUsers';
import NavBar from './Components/Navbar/NavBar'

const App = () => {
  return (
    <BrowserRouter>
    <NavBar/>
        <div className="content" style={{marginLeft: "60px"}}>
          <Routes>
              <Route path="/" element={<Users/>} />
              <Route path="/add" element={<AddUsers/>} />
              <Route path="/view/:id" element={<ViewUser/>} />
              <Route path="/edit/:id" element={<EditUser updateUser={(updatedUser) => console.log(updatedUser)} />} />
          </Routes>
        </div>
    </BrowserRouter>
  );
};

export default App;
