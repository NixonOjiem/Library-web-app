import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DeleteBooks from './DeleteBooks';

function RemoveBooksPage() {
  const [showAddBooks, setShowAddBooks] = useState(true);
  const [books, setBooks] = useState([{ title: '', author: '', isbn: '', published_date: '', genre: '', copies_available: 1 }]);
  const [fetchedBooks, setFetchedBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentView, setCurrentView] = useState('addBooks'); // New state variable
  const navigate = useNavigate();

  const handleRemoveBooksPage = () => {
    setShowAddBooks(false);
  };

  const handleAddBooksPage = () => {
    setShowAddBooks(true);
  };

  const handleAddRow = () => {
    setBooks([...books, { title: '', author: '', isbn: '', published_date: '', genre: '', copies_available: 1 }]);
  };

  const handleRemoveRow = (index) => {
    const newBooks = books.filter((_, i) => i !== index);
    setBooks(newBooks);
  };

  const handleChange = (index, event) => {
    const { name, value, files } = event.target;
    const newBooks = books.map((book, i) => 
      i === index ? { ...book, [name]: files ? files[0] : value } : book
    );
    setBooks(newBooks);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('http://localhost:5000/add-books', books);
      alert('Books added successfully');
    } catch (error) {
      alert('Error adding books');
    }
    console.log('Books:', books);
  };

  useEffect(() => {
    axios.get('http://localhost:5000/books')
      .then(response => {
        setFetchedBooks(response.data);
      })
      .catch(error => {
        alert('Error retrieving data');
      });
  }, []);

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredBooks = fetchedBooks.filter(book => {
    return (
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.isbn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.published_date.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.genre.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const handleBookClicked = () => {
    setCurrentView('deleteBooks'); // Update state to show DeleteBooks component
    console.log("book clicked");
  };

  const handleDeleteBook = () => {
    setCurrentView('deleteBooks'); // Update state to show DeleteBooks component
    console.log("book clicked");
  };

  const handleBack = () => {
    setCurrentView('addBooks'); // Update state to show AddBooks component
  };

  return (
    <div>
      <h1>Book Management</h1>
      {currentView === 'deleteBooks' ? (
        <DeleteBooks onBack={handleBack} />
      ) : (
        <>
          {showAddBooks ? (
            <div className='bookmanagement'>
              <h1>Add a book page</h1>
              <form onSubmit={handleSubmit} className='add-book-form'>
                {books.map((book, index) => (
                  <div key={index} className="book-row">
                    <input
                      type="text"
                      name="title"
                      placeholder="Title"
                      value={book.title}
                      className='add-book-input'
                      onChange={(e) => handleChange(index, e)}
                    />
                    <input
                      type="text"
                      name="author"
                      placeholder="Author"
                      value={book.author}
                      className='add-book-input'
                      onChange={(e) => handleChange(index, e)}
                    />
                    <input
                      type="text"
                      name="isbn"
                      placeholder="ISBN"
                      value={book.isbn}
                      className='add-book-input'
                      onChange={(e) => handleChange(index, e)}
                    />
                    <input
                      type="date"
                      name="published_date"
                      placeholder="Published Date"
                      value={book.published_date}
                      className='add-book-input'
                      onChange={(e) => handleChange(index, e)}
                    />
                    <input
                      type="text"
                      name="genre"
                      placeholder="Genre"
                      value={book.genre}
                      className='add-book-input'
                      onChange={(e) => handleChange(index, e)}
                    />
                    <input
                      type="number"
                      name="copies_available"
                      placeholder="Copies Available"
                      value={book.copies_available}
                      className='add-book-input'
                      onChange={(e) => handleChange(index, e)}
                    />
                    <input 
                      type="file"
                      accept="image/*"
                      capture="camera"
                      className="add-book-input"
                      onChange={(e) => handleChange(index, e)}
                    />
                    <button type="button" onClick={() => handleRemoveRow(index)}>Delete</button>
                  </div>
                ))}
                <button type="button" onClick={handleAddRow}>Add Book</button>
                <button type="submit">Submit</button>
              </form>
              <p>To delete books click here: 
                <a className='remove-books-link' onClick={handleRemoveBooksPage}>
                 Delete Books
                </a>
              </p>
            </div>
          ) : (
            <div className='bookmanagement'>
              <input 
                type="text" 
                id="searchInput" 
                onChange={handleSearchInputChange} 
                placeholder="Filter Table.." 
                className='search-input' 
              />
              <table className='book-table'>
                <thead>
                  <tr>
                    <th>Book Title</th>
                    <th>Author</th>
                    <th>ISBN</th>
                    <th>Published Date</th>
                    <th>Genre</th>
                    <th>Copies Available</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBooks.map(book => (
                    <tr key={book.id} onClick={handleBookClicked}>
                      <td>{book.title}</td>
                      <td>{book.author}</td>
                      <td>{book.isbn}</td>
                      <td>{book.published_date}</td>
                      <td>{book.genre}</td>
                      <td>{book.copies_available}</td>
                      <button type="button" className='delete-book-button' onClick={handleDeleteBook}>Delete</button>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p>To add books click here:
                <a className='add-books-link' onClick={handleAddBooksPage}>
                  Add Books
                </a>
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default RemoveBooksPage;