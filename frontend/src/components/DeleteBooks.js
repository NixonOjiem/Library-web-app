import React from 'react';

function DeleteBooks({ bookID, onBack }) {
  return (
    <div>
      <h1>Delete Books</h1>
      <p>Book ID: {bookID}</p>
      <button onClick={onBack}>Back</button>
    </div>
  );
}

export default DeleteBooks;