import React, { useEffect, useState } from 'react';
import axios from 'axios';
import admin_image from '../assets/images/adminimage1.jpg';

function DeleteBooks({ bookID, onBack }) {
  const [book, setBook] = useState({}); // Initialize as an object
  const [coverImage, setCoverImage] = useState({ cover_image: '' });

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/edit-books/${bookID}`);
        const fetchedBook = response.data;
        // Ensure the date is in the correct format
        if (fetchedBook.published_date) {
          fetchedBook.published_date = fetchedBook.published_date.split('T')[0];
        }
        setBook(fetchedBook);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBook();
  }, [bookID]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setBook({ ...book, [name]: value });
  };
  console.log('Book Id is', bookID)

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverImage({ cover_image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBookChanges = async (event) => {
    event.preventDefault(); // Prevent form submission
    const updatedBook = { ...book, cover_image: coverImage.cover_image || book.cover_image };
    try {
      const response = await axios.put(`http://localhost:5000/edit-book-api/${bookID}`, updatedBook);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {book.title ? (
        <div>
          <div className='admin-image'>
            <img src={admin_image} alt='An image appears here' />
          </div>
          <div className='Admin-form'>
            <form className='book-details-form' onSubmit={handleBookChanges}>
              <label>
                <span>Title</span>
                <input 
                  type='text' 
                  name='title' 
                  value={book.title} 
                  onChange={handleInputChange} 
                />
              </label>
              
              <label>
                <span>Author</span>
                <input 
                  type='text' 
                  name='author' 
                  value={book.author} 
                  onChange={handleInputChange} 
                />
              </label>

              <label>
                <span>Year Published</span>
                <input 
                  type='date' 
                  name='published_date' 
                  value={book.published_date} 
                  onChange={handleInputChange} 
                />
              </label>

              <label>
                <span>Genre</span>
                <input 
                  type='text' 
                  name='genre' 
                  value={book.genre} 
                  onChange={handleInputChange} 
                />
              </label>

              <label>
                <span>ISBN</span>
                <textarea 
                  name='isbn' 
                  value={book.isbn} 
                  onChange={handleInputChange} 
                />
              </label>

              <label>
                <span>Copies Available</span>
                <input 
                  type='number' 
                  name='copies_available' 
                  value={book.copies_available} 
                  onChange={handleInputChange} 
                />
              </label>

              <label>
                <span>Book Image</span>
                <input type='file' onChange={handleImageChange} />
              </label>

              <button type='submit'>Submit</button>
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