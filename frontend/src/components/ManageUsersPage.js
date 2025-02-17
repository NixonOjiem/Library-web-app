import React, { useState, useEffect } from 'react';
import axios from 'axios';
import admin_image from '../assets/images/adminimage.jpg'
function ManageUsersPage() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const password = 'password';

    useEffect(() => {
      axios.get('http://localhost:5000/users')
        .then(response => {
          setUsers(response.data);
        })
        .catch(error => {
          setError('Error retrieving data');
        });
    }, []);

    const searchTable = (event) => {
      setSearchTerm(event.target.value);
    };

    const filteredUsers = users.filter(user => 
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase())
    );

    
    const handleRowClick = (user) => {
     setSelectedUser(user);
     setEditMode(true);
    };

   const handleInputChange = (event) => {
     const { name, value } = event.target;
     setSelectedUser({ ...selectedUser, [name]: value });
    };

   const handleDisableUser = () => {
     setSelectedUser({ ...selectedUser, role: 'disabled' });
    };

  const handleSave = () => {
    axios.put(`http://localhost:5000/user-update/${selectedUser.id}`, selectedUser)
      .then(response => {
        setUsers(users.map(user => user.id === selectedUser.id ? selectedUser : user));
        setEditMode(false);
        setSelectedUser(null);
      })
      .catch(error => {
        setError('Error updating user');
      });
  };

  const resetPassword = () => {
    axios.put(`http://localhost:5000/reset-password/${selectedUser.id}`, { password })
      .then(response => {
        alert('Password reset successfully! Passwpord is: password');
      })
      .catch(error => {
        setError('Error resetting password');
      });
  };

  const handleBack = () => {
    setEditMode(false);
    setSelectedUser(null);
  }
  
  return (
    <div className='manage-users-page'>
      <h2>Manage Users</h2>
      {error && <p>{error}</p>}
      
      {editMode ? (
        <div className=''>

          <div className='admin-image'>
            <img src={admin_image} alt='admin_vector_image' />
          </div>

          <div className='Admin-form'>
          <form className='user-details-form'>
            <h3>Edit User</h3>
            <label>
              <p>Username:</p>
              <input 
                type="text"
                name="username"
                value={selectedUser.username}
                onChange={handleInputChange}
                className='admin-input'
              />
            </label>
            <br />
            <label>
              <p>First Name:</p>
              <input 
                type="text" 
                name="first_name"
                value={selectedUser.first_name}
                onChange={handleInputChange}
                className='admin-input'
              />
            </label>
            <br />
            <label>
              <p>Last Name:</p>
              <input 
                type="text" 
                name="last_name" 
                value={selectedUser.last_name} 
                onChange={handleInputChange} 
                className='admin-input'
              />
            </label>
            <br />
            <label>
              <p>User Role:</p>
              <input 
                type="text" 
                name="role" 
                value={selectedUser.role} 
                onChange={handleInputChange} 
                className='admin-input'
              />
            </label>
            <br />

            <div className='admin-btns'>
            <button type="button" onClick={handleDisableUser} className='admin-btn'>Disable User</button>
            <button type="button" onClick={handleSave} className='admin-btn1'>Save</button>
            <button type="button" onClick={() => resetPassword()} className='admin-btn2'>Reset Password</button>

            </div>
            <h5 onClick={handleBack}>Back</h5>
          </form>
          </div>
          
        </div>
      ) : (
        <div>
          <input 
            type="text" 
            id="searchInput" 
            onChange={searchTable} 
            placeholder="Filter Table.." 
            className='search-input' 
          />
          <br />
          <table id="userTable">
            <thead>
              <tr>
                <th>Username</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map(user => (
                <tr key={user.id} onClick={() => handleRowClick(user)}>
                  <td>{user.username}</td>
                  <td>{user.first_name}</td>
                  <td>{user.last_name}</td>
                  <td>{user.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default ManageUsersPage;