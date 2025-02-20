import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { encode } from 'base64-arraybuffer';

function HomePage() {
  const [booksFetched, setBooksFetched] = useState([]);
  const [showBorrowForm, setShowBorrowForm] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [borrowDate, setBorrowDate] = useState('');
  const [returnDate, setReturnDate] = useState('');

  useEffect(() => {
    const fetchBooksStored = async () => {
      try {
        const response = await axios.get('http://localhost:5000/books');
        console.log('API Response:', response.data);
        setBooksFetched(response.data);
      } catch (error) {
        console.log('Error fetching books:', error);
      }
    };
    fetchBooksStored();
  }, []);

  useEffect(() => {
    console.log('Books Fetched:', booksFetched);
  }, [booksFetched]);

  const handleBookClick = (book) => {
    setSelectedBook(book);
    setShowBorrowForm(true);
    const currentDate = new Date();
    setBorrowDate(currentDate.toLocaleDateString());
    const returnDate = new Date(currentDate);
    returnDate.setDate(returnDate.getDate() + 30);
    setReturnDate(returnDate.toLocaleDateString());
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted for book:', selectedBook);
  };

  return (
    <div>
      <h1>Home Page</h1>
      {showBorrowForm && selectedBook ? (
        <div className='borrow-form'>
          <h2>Borrow {selectedBook.title}</h2>
          <form onSubmit={handleFormSubmit}>
            <label>
              Name:
              <input type='text' name='name' value={selectedBook.title} readOnly />
            </label>
            <label>
              Genre:
              <input type='text' name='genre' value={selectedBook.genre} readOnly />
            </label>
            <label>
              ISBN:
              <input type='text' name='isbn' value={selectedBook.isbn} readOnly />
            </label>
            <label>
              Date Borrowed:
              <input type='text' name='borrowDate' value={borrowDate} readOnly />
            </label>
            <label>
              Return Date:
              <input type='text' name='returnDate' value={returnDate} readOnly />
            </label>
            <button type='submit' className='submit-button'>Submit</button>
          </form>
        </div>
      ) : (
        <div className='display-available-books'>
          {Array.isArray(booksFetched) && booksFetched.length > 0 ? (
            <div className='book-container'>
              {booksFetched.map((book) => {
                const base64String = encode(new Uint8Array(book.cover_image.data));
                console.log(`Base64 String for ${book.title}:`, base64String);
                return (
                  <div key={book.id} className='book-item' onClick={() => handleBookClick(book)}>
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
                        className='book-cover'
                      />
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <p>No books available.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default HomePage;