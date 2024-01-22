import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Parse from "parse";

const BookDetail = () => {
  const [book, setBook] = useState(null);
  const { bookId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const loadBookDetail = async () => {
      const query = new Parse.Query("Books");
      query.include("author"); // Include the author object data
      try {
        const bookObject = await query.get(bookId);
        setBook({
          id: bookObject.id,
          title: bookObject.get("title"),
          authorName: bookObject.get("author").get("authorName"), // Assuming author is a Parse Object
          publicationYear: bookObject.get("publicationYear"),
          availableCopies: bookObject.get("availableCopies"),
          author: bookObject.get("author"), // Reference to the author Parse Object
        });
      } catch (error) {
        console.error("Error fetching book details", error);
      }
    };

    loadBookDetail();
  }, [bookId]);

  const handleBorrowBook = () => {
    navigate(`/books/${bookId}/borrow`);
  };

  const handleReturnBook = () => {
    navigate(`/books/${bookId}/return-to-library`);
  };

  if (!book) {
    return <div>Loading...</div>;
  }

  return (
    <div className="book-detail-container">
      <h1 className="book-detail-title">{book.title}</h1>
      <p className="book-detail-author">
        Author:{" "}
        <Link to={`/books/authors/${encodeURIComponent(book.authorName)}`}>
          {book.authorName}
        </Link>
      </p>
      <p className="book-detail-year">Published: {book.publicationYear}</p>
      <p className="book-detail-copies">
        Available Copies: {book.availableCopies}
      </p>
      <button onClick={handleBorrowBook} className="book-detail-borrow-btn">
        Borrow Book
      </button>
      <button onClick={handleReturnBook} className="book-detail-return-btn">
        Return Book
      </button>
    </div>
  );
};

export default BookDetail;
