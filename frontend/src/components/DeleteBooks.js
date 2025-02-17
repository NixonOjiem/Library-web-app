import React, { useEffect, useState } from 'react';
import axios from 'axios';
import admin_image from '../assets/images/adminimage1.jpg';

function DeleteBooks({ bookID, onBack }) {
  const [book, setBook] = useState({}); // Initialize as an object

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/edit-books/${bookID}`);
        setBook(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBook();
  }, [bookID]);

 const handleImageChange=()=>{

 }
  return (
    <div>
      {book.title ? (
        <div>
          <div className='admin-image'>
            <img src={admin_image} alt='An image appears here' />
          </div>
          <div className='Admin-form'>
            <form className='book-details-form'>
                <label>
                    <span>Title</span>
                    <input type='text' value={book.title}  />
                </label>
                
                <label>
                    <span>Author</span>
                    <input type='text' value={book.author} />
                </label>

                <label>
                    <span>Year Published</span>
                    <input type='number' value={book.publiched_date} />
                </label>

                <label>
                    <span>Genre</span>
                    <input type='text' value={book.genre} />
                </label>

                <label>
                    <span>ISBN</span>
                    <textarea value={book.isbn} />
                </label>

                <label>
                    <span>Copies Available</span>
                    <input type='number' value={book.copies_available} />
                </label>

                <label>
                    <span>Book Image</span>
                    <input type='file' onChange={handleImageChange} value={book.cover_image}/>
                </label>

            </form>
          </div>
          
          <button onClick={onBack}>Back</button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default DeleteBooks;