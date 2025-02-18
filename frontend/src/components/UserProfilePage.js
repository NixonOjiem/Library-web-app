import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHands } from '@fortawesome/free-solid-svg-icons';

function UserProfilePage() {
  const [username, setUsername] = useState('');

  useEffect(() => {
    const storedUsername = localStorage.getItem('username_local');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []); // Empty dependency array ensures this runs only once

  console.log(username);

  return (
    <div>
      Hey there, {username} <FontAwesomeIcon icon= {faHands} className='hand-shaking'/>
    </div>
  );
}

export default UserProfilePage;