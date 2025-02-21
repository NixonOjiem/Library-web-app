import axios from 'axios';
import React, {useEffect, useState} from 'react'

function BrorrowedBooksPage() {
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/borrowed-books');
        console.log(response.data); // Do something with the response
        setBorrowedBooks(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='borrowed-books'>
      <h1>BrorrowedBooksPage</h1>
      <div className='books-container'>
        {
          borrowedBooks.map((books, index) => (
            <div key = {index}>
              {books.book_id}
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default BrorrowedBooksPage