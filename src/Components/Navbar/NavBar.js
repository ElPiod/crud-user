import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.scss'
import { EyeFill, PencilSquare, PersonCircle, PersonFillAdd, TrashFill } from "react-bootstrap-icons"

const NavBar = () => {
    return ( 
        <div className="sidebar">
            <ul>
                <li><Link className='text-white' to="/"><PersonCircle size={20} color='lime'/></Link></li>
                <li><Link className='text-white' to="/add"><PersonFillAdd size={20} color='orange'/></Link></li>
                <li><Link className='text-white' to="/view/:id"><EyeFill size={20} color='blue'/></Link></li>
                <li><Link className='text-white' to="/edit/:id"><PencilSquare size={20} color='yellow'/></Link></li>
                <li><Link className='text-white' to="/delete/:id"><TrashFill size={20} color='red'/></Link></li>
            </ul>
        </div>
    );
};

export default NavBar;