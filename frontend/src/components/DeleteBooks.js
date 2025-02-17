import React, {useState, useEffect} from 'react';
import axios from 'axios';

function DeleteBooks({ bookID, onBack }) {
    const [book, setBook] = useState([]);

    useEffect(() => {
        const fetchBook = async () => {
          try {
            const response = await axios.get(`http://localhost:3001/books/${bookID}`);
            setBook(response.data);
          } catch (error) {
            console.error(error);
          }
        };
    
        fetchBook();
      }, [bookID]);
      
  return (
    <div>
      <h1>Delete Books</h1>
      <p>Book ID: {bookID}</p>
      <button onClick={onBack}>Back</button>
    </div>
  );
}

export default DeleteBooks;