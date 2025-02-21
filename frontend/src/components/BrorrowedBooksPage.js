import axios from 'axios';
import React, { useEffect, useState } from 'react';

function BorrowedBooksPage() {
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredBooks, setFilteredBooks] = useState([]);

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

  return (
    <div className='borrowed-books'>
      <h1>Borrowed Books Page</h1>
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
            <div key={index} className='borrowed-book-item'>
              <p>User: {books.username}</p>
              <p>Book Name: {books.title}</p>
              <p>Date Borrowed: {books.date_borrowed}</p>
              <p>Expected Return Date: {books.date_expected_return}</p>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default BorrowedBooksPage;