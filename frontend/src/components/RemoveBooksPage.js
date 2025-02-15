import React, {useState} from 'react'
import axios from 'axios'

function RemoveBooksPage() {
  const [showAddBooks, setShowAddBooks] = useState(true);
  const [books, setBooks] = useState([{ title: '', author: '', isbn: '', published_date: '', genre: '', copies_available: 1 }]);
  

  const handleRemoveBooksPage = () => {
    setShowAddBooks(false);
  }
  const handleAddBooksPage = () => {
    setShowAddBooks(true);
  }

  const handleAddRow = () => {
    setBooks([...books, { title: '', author: '', isbn: '', published_date: '', genre: '', copies_available: 1 }]);
  };

  const handleRemoveRow = (index) => {
    const newBooks = books.filter((_, i) => i !== index);
    setBooks(newBooks);
  };

  const handleChange = (index, event) => {
    const { name, value } = event.target;
    const newBooks = books.map((book, i) => (i === index ? { ...book, [name]: value } : book));
    setBooks(newBooks);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    try{
      axios.post('http://localhost:5000/add-books', books)

      alert('Books added successfully');
    }
    catch(error){
      alert('Error adding books');
    }

    console.log('Books:', books);
  };

  return (
    <div>
      <h1>Book Management</h1>
      {showAddBooks ? (
        <div className='bookmanagement'>
          <h1>Add a book page</h1>
          <form onSubmit={handleSubmit}>
            {books.map((book, index) => (
              <div key={index} className="book-row">
                <input
                  type="text"
                  name="title"
                  placeholder="Title"
                  value={book.title}
                  onChange={(e) => handleChange(index, e)}
                />
                <input
                  type="text"
                  name="author"
                  placeholder="Author"
                  value={book.author}
                  onChange={(e) => handleChange(index, e)}
                />
                <input
                  type="text"
                  name="isbn"
                  placeholder="ISBN"
                  value={book.isbn}
                  onChange={(e) => handleChange(index, e)}
                />
                <input
                  type="date"
                  name="published_date"
                  placeholder="Published Date"
                  value={book.published_date}
                  onChange={(e) => handleChange(index, e)}
                />
                <input
                  type="text"
                  name="genre"
                  placeholder="Genre"
                  value={book.genre}
                  onChange={(e) => handleChange(index, e)}
                />
                <input
                  type="number"
                  name="copies_available"
                  placeholder="Copies Available"
                  value={book.copies_available}
                  onChange={(e) => handleChange(index, e)}
                />
                <button type="button" onClick={() => handleRemoveRow(index)}>Delete</button>
              </div>
            ))}
            <button type="button" onClick={handleAddRow}>Add Book</button>
            <button type="submit">Submit</button>
          </form>
          <p>To remove books click here: 
            <a className='remove-books-link' onClick={handleRemoveBooksPage}>
             RemoveBooks
            </a>
          </p>
        </div>
      ):(
        <div className='bookmanagement'>
          <h1>Remove a book page</h1>
          <form>
          </form>
          <p>To add books click here:
            <a className='add-books-link' onClick={handleAddBooksPage}>
              AddBooks
            </a>
          </p>
        </div>
      )}
    </div>
  )
}

export default RemoveBooksPage