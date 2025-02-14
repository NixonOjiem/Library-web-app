import React, {useState, useEffect} from 'react'
import axios from 'axios'

function ManageUsersPage() {
const [users, setUsers] = useState([])
const [error, setError] = useState('')

useEffect(() => {
  axios.get('http://localhost:5000/users')
  .then(response => {
    setUsers(response.data)
  })
  .catch(error => {
    setError('Error retrieving data')
  })
})

  return (
    <div className='manage-users-page'>
      <h2>Manage Users Page</h2>
      {/* <ul className='users-list'>
        {users.map(user => (
          <>
          <li key={user.id}>
          {user.username}&nbsp;&nbsp;&nbsp;&nbsp;
          {user.role}&nbsp;&nbsp;&nbsp;&nbsp;
          {user.first_name}&nbsp;&nbsp;&nbsp;&nbsp;
          {user.last_name}
          </li>
          <hr />
          </>
        ))}
      </ul> */}

      <table>
         <tr>
          <th>Username</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Role</th>
        </tr>
        {users.map(user => (
        <tr key={user.id}>
          <td>{user.username}</td>
          <td>{user.first_name}</td>
          <td>{user.last_name}</td>
          <td>{user.role}</td>
        </tr>
        ))}
      </table>

    </div>
  )
}

export default ManageUsersPage