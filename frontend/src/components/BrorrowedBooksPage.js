import axios from 'axios';
import React, { useEffect, useState } from 'react';

function BorrowedBooksPage() {
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [showBookClicked, setShowBookClicked] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null); // State to hold the selected book details

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/borrowed-books');
        console.log(response.data); // Do something with the response
        setBorrowedBooks(response.data);
        setFilteredBooks(response.data); // Initialize filteredBooks with all borrowedBooks
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handlerSearch = () => {
    const lowercasedSearch = search.toLowerCase();
    const filtered = borrowedBooks.filter(book => 
      book.username.toLowerCase().includes(lowercasedSearch) || 
      book.title.toLowerCase().includes(lowercasedSearch)
    );
    setFilteredBooks(filtered);
  };

  const bookClicked = (book) => {
    setSelectedBook(book); // Set the selected book details
    setShowBookClicked(true); // Show the book details
  };
 
  return (
    <div className='borrowed-books'>
      <h1>Borrowed Books Page</h1>
      {
        showBookClicked ? (
          <>
            <div className="book">
              <h2>Book Details</h2>
              {selectedBook && ( // Check if a book is selected
                <>
                  <p>User: {selectedBook.username}</p>
                  <p>Book Name: {selectedBook.title}</p>
                  <p>Date Borrowed: {selectedBook.date_borrowed}</p>
                  <p>Expected Return Date: {selectedBook.date_expected_return}</p>
                </>
              )}
            </div>
            <button className="back-button-borrowed-books" onClick={() => setShowBookClicked(false)}>Close</button>
          </>
        ) : (
          <>
            <input 
              type='text' 
              className='borrowed-books-search' 
              placeholder='search for a user or book...' 
              value={search}
              onChange={(e) => setSearch(e.target.value)} 
            />
            <button className='search-borrowed-books-button' onClick={handlerSearch}>Search</button>
            <div className='all-borrowed-books-container'>
              {
                filteredBooks.map((books, index) => (
                  <div key={index} className='borrowed-book-item' onClick={() => bookClicked(books)}>
                    <p>User: {books.username}</p>
                    <p>Book Name: {books.title}</p>
                    <p>Date Borrowed: {books.date_borrowed}</p>
                    <p>Expected Return Date: {books.date_expected_return}</p>
                  </div>
                ))
              }
            </div>
          </>
        )
      }
    </div>
  );
}

export default BorrowedBooksPage;