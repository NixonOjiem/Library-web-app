import React, {useState} from 'react'

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
    // Handle form submission logic here
    console.log('Books:', books);
  };

  return (
    <div>
      <h1>Book Management</h1>
      {showAddBooks ? (
        <div className='bookmanagement'>
          <h1>Add a book page</h1>
          <form>
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