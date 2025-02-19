import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { encode } from 'base64-arraybuffer';

function HomePage() {
  const [booksFetched, setBooksFetched] = useState([]);

  useEffect(() => {
    const fetchBooksStored = async () => {
      try {
        const response = await axios.get('http://localhost:5000/books'); // Await the axios call
        console.log('API Response:', response.data);
        setBooksFetched(response.data); // Set the fetched data in state
      } catch (error) {
        console.log('Error fetching books:', error);
      }
    };
    fetchBooksStored();
  }, []); // Empty dependency array to run only once on mount

  useEffect(() => {
    console.log('Books Fetched:', booksFetched);
  }, [booksFetched]); // Log booksFetched whenever it updates

  return (
    <div>
      <h1>Home Page</h1>
      <div className='display-available-books'>
        {Array.isArray(booksFetched) && booksFetched.length > 0 ? (
          booksFetched.map(book => {
            const base64String = encode(new Uint8Array(book.cover_image.data));
            console.log(`Base64 String for ${book.title}:`, base64String);
            return (
              <div key={book.id}>
                <h3>{book.title}</h3>
                <p>Author: {book.author}</p>
                <p>ISBN: {book.isbn}</p>
                <p>Published Date: {new Date(book.published_date).toLocaleDateString()}</p>
                <p>Genre: {book.genre}</p>
                <p>Copies Available: {book.copies_available}</p>
                {book.cover_image && (
                  <img
                    src={`data:image/jpeg;base64,${base64String}`}
                    alt={book.title}
                    style={{ width: '100px', height: '150px' }}
                  />
                )}
              </div>
            );
          })
        ) : (
          <p>No books available.</p>
        )}
      </div>
    </div>
  );
}

export default HomePage;