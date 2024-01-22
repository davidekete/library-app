// /* eslint-disable no-unused-vars */

// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import Parse from "parse";

// function BooksByAuthor() {
//   const [books, setBooks] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const { authorName } = useParams();

//   useEffect(() => {
//     setLoading(true);
//     Parse.Cloud.run("getByAuthor", { authorName })
//       .then(setBooks)
//       .catch(setError)
//       .finally(() => setLoading(false));
//   }, [authorName]);

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error loading books by author.</div>;

//   return (
//     <div>
//       <h1>Books by {authorName}</h1>
//       <ul>
//         {books.map((book) => (
//           <li key={book.objectId}>{book.title}</li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default BooksByAuthor;
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Parse from 'parse';

const BooksByAuthor = () => {
  const [books, setBooks] = useState([]);
  const { authorName } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const loadBooksByAuthor = async () => {
      const authorQuery = new Parse.Query('Authors');
      authorQuery.equalTo('authorName', decodeURIComponent(authorName));

      const bookQuery = new Parse.Query('Books');
      bookQuery.matchesQuery('author', authorQuery);
      bookQuery.include('author');

      try {
        const results = await bookQuery.find();
        setBooks(results.map(book => ({
          id: book.id,
          title: book.get('title'),
          // Additional properties can be added as needed
        })));
      } catch (error) {
        console.error('Error fetching books by author', error);
      }
    };

    loadBooksByAuthor();
  }, [authorName]);

  const goToBookDetails = (bookId) => {
    navigate(`/books/${bookId}`);
  };

  return (
    <div className="books-by-author-container">
      <h1 className="books-by-author-header">{decodeURIComponent(authorName)}'s Books</h1>
      <div className="books-grid">
        {books.map((book) => (
          <div
            key={book.id}
            className="book-card"
            onClick={() => goToBookDetails(book.id)}
          >
            <h2 className="book-title">{book.title}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BooksByAuthor;
