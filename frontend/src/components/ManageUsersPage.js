import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ManageUsersPage() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [editMode, setEditMode] = useState(false);

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

  return (
    <div className='manage-users-page'>
      <h2>Manage Users</h2>
      {error && <p>{error}</p>}
      
      {editMode ? (
        <div>
          <h3>Edit User</h3>
          <form>
            <label>
              Username:
              <input 
                type="text" 
                name="username" 
                value={selectedUser.username} 
                onChange={handleInputChange} 
              />
            </label>
            <br />
            <label>
              First Name:
              <input 
                type="text" 
                name="first_name" 
                value={selectedUser.first_name} 
                onChange={handleInputChange} 
              />
            </label>
            <br />
            <label>
              Last Name:
              <input 
                type="text" 
                name="last_name" 
                value={selectedUser.last_name} 
                onChange={handleInputChange} 
              />
            </label>
            <br />
            <label>
              Role:
              <input 
                type="text" 
                name="role" 
                value={selectedUser.role} 
                onChange={handleInputChange} 
              />
            </label>
            <br />
            <button type="button" onClick={handleDisableUser}>Disable User</button>
            <button type="button" onClick={handleSave}>Save</button>
          </form>
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