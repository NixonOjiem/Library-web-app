import React, { useState, useEffect } from 'react';

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
      Hey there, {username}
    </div>
  );
}

export default UserProfilePage;