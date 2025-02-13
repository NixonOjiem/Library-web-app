import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faHome, faBook, faUser, faUsersLine, faBookOpenReader, faRightFromBracket} from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

function SideBar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate('/');
    }


  return (
    <div className='sidebar-container'>
        <h3>Community Book Store</h3>
        <div className='sidebar-item'>
            <FontAwesomeIcon icon={faHome} className='sidebar-icon'/>
            <span> Home</span>
        </div>
        <div className='sidebar-item'>
            <FontAwesomeIcon icon={faBook} className='sidebar-icon'/>
            <span> Popular</span>
        </div>
        <div className='sidebar-item'>
            <FontAwesomeIcon icon={faUser} className='sidebar-icon'/>
            <span> Profile</span>
        </div>
        <div className='sidebar-item'>
            <FontAwesomeIcon icon={faUsersLine} className='sidebar-icon'/>
            <span> Users</span>
        </div>
        <div className='sidebar-item'>
            <FontAwesomeIcon icon={faBookOpenReader} className='sidebar-icon'/>
            <span> Borrowed Books</span>
        </div>
        <div className='sidebar-item' onClick={()=>handleLogout()}>
            <FontAwesomeIcon icon={faRightFromBracket} className='sidebar-icon'/>
            <span> LogOut</span>
        </div>
    </div>
  )
}

export default SideBar