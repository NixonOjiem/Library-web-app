import React, {useState} from 'react'

function RemoveBooksPage() {
  const [showAddBooks, setShowAddBooks] = useState(true);

  const handleRemoveBooksPage = () => {
    setShowAddBooks(false);
  }
  const handleAddBooksPage = () => {
    setShowAddBooks(true);
  }

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