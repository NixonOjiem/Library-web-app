import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ManageUsersPage() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

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

  return (
    <div className='manage-users-page'>
      <h2>Manage Users Page</h2>
      {error && <p>{error}</p>}
      
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
            <tr key={user.id}>
              <td>{user.username}</td>
              <td>{user.first_name}</td>
              <td>{user.last_name}</td>
              <td>{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ManageUsersPage;