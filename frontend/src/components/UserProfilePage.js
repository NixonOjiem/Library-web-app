import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHands } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

function UserProfilePage() {
  const [username, setUsername] = useState('');
  const [userId, setUserID] = useState(0);
  const [password, setPassword] = useState('');
  const [hasBorrowedBooks, setHasBorrowedBooks] = useState(false);

  useEffect(() => {
    const storedUsername = localStorage.getItem('username_local');
    const storedUserId = localStorage.getItem('userId');
    // console.log(storedUserId)

    if (storedUsername && storedUserId) {
      setUsername(storedUsername);
      setUserID(Number(storedUserId));
    }
  }, []); // Empty dependency array ensures this runs only once

  useEffect(() => {
    const fetchBorrowedBooks = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/books-borrowed/${userId}`);
        console.log(response.data);

        if (response.data.length === 0) {
          setHasBorrowedBooks(false);
        } else {
          setHasBorrowedBooks(true);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchBorrowedBooks();
  }, [userId]);

  console.log(username);

  const handleUserChangeDetails = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put(`http://localhost:5000/update-user-api/${userId}`, {
        username,
        password
      });
      console.log(response.data);
      alert('User updated successfully');
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <div>
      <p>Hey there, {username} <FontAwesomeIcon icon={faHands} className='hand-shaking' /></p>
      <div className='userpage-form-container'>
        <p>Edit your current details</p>
        <form className='userprofile-form' onSubmit={handleUserChangeDetails}>
          <label>
            <span>Username:</span>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
          </label>
          <label className='password-label'>
            <span>Password:</span>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
          <button type='submit' className='submit-button'>Submit</button>
        </form>
      </div>
      <div className='borrowed-books-container'>
        <p>Books Borrowed</p>
        {hasBorrowedBooks ? (
          <div>
            <p>Borrowed books appear here</p>
          </div>
        ) : (
          <div>
            <p>You haven't borrowed any books yet</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserProfilePage;