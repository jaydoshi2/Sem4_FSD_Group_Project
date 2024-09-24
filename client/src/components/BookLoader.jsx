import React from 'react';
import '../styles/Book.css'; // Importing the CSS file

const BookLoader = () => {
  return (
    <div className="book">
      <div className="book__pg-shadow"></div>
      <div className="book__pg"></div>
      <div className="book__pg book__pg--2"></div>
      <div className="book__pg book__pg--3"></div>
      <div className="book__pg book__pg--4"></div>
      <div className="book__pg book__pg--5"></div>
    </div>
  );
};

export default BookLoader;
