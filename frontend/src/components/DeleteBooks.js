import React, { useEffect, useState } from 'react';
import axios from 'axios';

function YourComponent({ bookID }) {
  const [book, setBook] = useState({}); // Initialize as an object

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/edit-books/${bookID}`);
        setBook(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBook();
  }, [bookID]);

  return (
    <div>
      {book.title ? (
        <div>
          <h1>{book.title}</h1>
          <p>{book.author}</p>
          {/* Render other book details here */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default YourComponent;