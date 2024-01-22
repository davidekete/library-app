import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Parse from "parse";

const Books = () => {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadBooks = async () => {
      try {
        // Assuming you have a cloud function named `getAllBooks`
        const results = await Parse.Cloud.run("getAllBooks");
        setBooks(results);
      } catch (error) {
        console.error("Error while fetching books:", error);
      }
    };

    loadBooks();
  }, []);

  return (
    <div className="books-container">
      <h1 className="books-header">Books</h1>
      <div className="books-grid">
        {books.map((book) => (
          <div
            key={book.objectId}
            className="book-card"
            onClick={() => navigate(`/books/${book.objectId}`)}
          >
            <h2 className="book-title">{book.title}</h2>
            <p className="book-author">by {book.authorName}</p>
            <p className="book-year">Published in {book.publicationYear}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Books;
