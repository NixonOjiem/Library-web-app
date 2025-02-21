import axios from 'axios';
import React, { useEffect, useState } from 'react';
import image from '../assets/images/adminimage2.jpg';

function BorrowedBooksPage() {
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [showBookClicked, setShowBookClicked] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null); // State to hold the selected book details
  const [status, setStatus] = useState(""); // State for status
  const [dateReturned, setDateReturned] = useState(""); // State for date returned

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
    setStatus(book.status); // Initialize status with the current status of the book
    setDateReturned(book.date_returned); // Initialize dateReturned with the current date returned of the book
    setShowBookClicked(true); // Show the book details
  };

  const handleChangesMade = () => {
    console.log('Changes made:', { status, dateReturned });
    // You can add code here to send the updated status and dateReturned to your backend
  };

  return (
    <div className='borrowed-books'>
      <h1>Borrowed Books Page</h1>
      {
        showBookClicked ? (
          <>
            <div className='borrowed-book-image-holder'>
              <img src={image} alt="Admin Image" className='my_image'/>
            </div>

            <div className="book-borrowed-classification">
              <h2>Book Details</h2>
              {selectedBook && ( // Check if a book is selected
                <>
                  <p>User: {selectedBook.username}</p>
                  <p>Book Name: {selectedBook.title}</p>
                  <p>Date Borrowed: {selectedBook.date_borrowed}</p>
                  <p>Expected Return Date: {selectedBook.date_expected_return}</p>
                  <p>Date returned: 
                    <input 
                      type='date' 
                      placeholder='Select date if book has been returned...' 
                      value={dateReturned}
                      onChange={(e) => setDateReturned(e.target.value)}
                    />
                  </p>
                  <p>Status: 
                    <select 
                      id="status" 
                      name="status" 
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                    >
                      <option value="lost">Lost</option>
                      <option value="returned">Returned</option>
                      <option value="borrowed">Borrowed</option>
                    </select>
                  </p>
                  <button className="back-button-borrowed-books" onClick={() => setShowBookClicked(false)}>Discard</button>
                  <button className='submit-changes-for-books' onClick={handleChangesMade}>Submit</button>
                </>
              )}
            </div>
          </>
        ) : (
          <>
            <input 
              type='text' 
              className='borrowed-books-search' 
              placeholder='Search for a user or book...' 
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