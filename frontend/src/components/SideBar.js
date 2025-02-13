import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faBook, faUser, faUsersLine, faBookOpenReader, faRightFromBracket, faPlusMinus } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, Link } from 'react-router-dom';

function SideBar() {
  const [userRole, setUserRole] = useState('');
  const [userID, setUserID] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserID = localStorage.getItem('userId');
    setUserID(storedUserID);

    if (storedUserID) {
      axios.get(`http://localhost:5000/user/${storedUserID}`)
        .then(res => {
          console.log(res.data);
          setUserRole(res.data.role);
        })
        .catch(error => console.error('Error fetching user data:', error));
    }
  }, []);

  const handleLogout = () => {
    navigate('/');
  }

  return (
    <div className='sidebar-container'>
      <h3>Community Book Store</h3>
      <Link to="/home"className='sidebar-text'>
        <div className='sidebar-item'>
          <FontAwesomeIcon icon={faHome} className='sidebar-icon' />
          <span className="sidebar-text"> Home</span>
        </div>
      </Link>
      <Link to="/popular" className='sidebar-text'>
        <div className='sidebar-item'>
          <FontAwesomeIcon icon={faBook} className='sidebar-icon' />
          <span className="sidebar-text"> Popular</span>
        </div>
      </Link>
      <Link to="/profile" className='sidebar-text'>
        <div className='sidebar-item'>
          <FontAwesomeIcon icon={faUser} className='sidebar-icon' />
          <span className="sidebar-text"> Profile</span>
        </div>
      </Link>
      <br />
      {userRole === 'librarian' && (
        <div className='Admin-content' id='admin-content'>
          <h4>Admin</h4>
          <Link to="/users" className='sidebar-text'>
            <div className='sidebar-item'>
              <FontAwesomeIcon icon={faUsersLine} className='sidebar-icon' />
              <span className="sidebar-text"> Users</span>
            </div>
          </Link>
          <Link to="/borrowed-books" className='sidebar-text'>
            <div className='sidebar-item'>
              <FontAwesomeIcon icon={faBookOpenReader} className='sidebar-icon' />
              <span className="sidebar-text"> Borrowed Books</span>
            </div>
          </Link>
          <Link to="/add-remove-books" className='sidebar-text'>
            <div className='sidebar-item'>
              <FontAwesomeIcon icon={faPlusMinus} className='sidebar-icon' />
              <span className="sidebar-text"> Add/Remove Books</span>
            </div>
          </Link>
        </div>
      )}
      <div className='sidebar-item' onClick={handleLogout}>
        <FontAwesomeIcon icon={faRightFromBracket} className='sidebar-icon' />
        <span> LogOut</span>
      </div>
    </div>
  );
}

export default SideBar;