import React from 'react';

function DeleteBooks({ onBack }) {
  return (
    <div>
      <h1>Delete Books</h1>
      <button onClick={onBack}>Back</button>
    </div>
  );
}

export default DeleteBooks;