import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHands } from '@fortawesome/free-solid-svg-icons';

function UserProfilePage() {
  const [username, setUsername] = useState('');
  const [userId, setUserID] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    const storedUsername = localStorage.getItem('username_local');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []); // Empty dependency array ensures this runs only once

  console.log(username);

  const handleUserChangeDetails=(event)=>{
    event.preventDefault();
    console.log("User details changed");
  }

  return (
    <div>
     <p> Hey there, {username} <FontAwesomeIcon icon= {faHands} className='hand-shaking'/></p>
      <div className='userpage-form-container'>
        <p>Edit your current details</p>
        <form className='userprofile-form' onSubmit={handleUserChangeDetails}>

          <label>
            <span>Username:</span>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
          </label>

          <label className='password-label'>
            <span>Password:</span>
            <input type="password" value= {password} onChange={(e)=>setPassword(e.target.value) }/>
          </label>
          <button type='submit' className='submit-button'>Submit</button>
        </form>
      </div>
    </div>
  );
}

export default UserProfilePage;