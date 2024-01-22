// /* eslint-disable no-unused-vars */

// import React, { useState } from "react";
// import { useParams } from "react-router-dom";
// import Parse from "parse";
// import "./css/BorrowBook.css";

// const BorrowBook = () => {
//   const { bookId } = useParams();
//   const [libraryMemberId, setLibraryMemberId] = useState("");

//   const handleBorrow = async (e) => {
//     e.preventDefault();
//     try {
//       await Parse.Cloud.run("borrowBookFromLibrary", {
//         libraryMemberId,
//         bookId,
//       });
//       alert("Book borrowed successfully");
//     } catch (error) {
//       alert(`Failed to borrow book: ${error.message}`);
//     }
//   };

//   return (
//     <div>
//       <h1>Borrow Book</h1>
//       <form onSubmit={handleBorrow}>
//         <label>
//           Library Member ID:
//           <input
//             type="text"
//             value={libraryMemberId}
//             onChange={(e) => setLibraryMemberId(e.target.value)}
//             required
//           />
//         </label>
//         <button type="submit">Borrow</button>
//       </form>
//     </div>
//   );
// };

// export default BorrowBook;
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Parse from 'parse';

const BorrowBook = () => {
  const [book, setBook] = useState(null);
  const [libraryMemberId, setLibraryMemberId] = useState('');
  const { bookId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const loadBook = async () => {
      const query = new Parse.Query('Books');
      try {
        const bookObject = await query.get(bookId);
        setBook({
          id: bookObject.id,
          title: bookObject.get('title'),
          availableCopies: bookObject.get('availableCopies'),
        });
      } catch (error) {
        console.error('Error fetching book details', error);
      }
    };

    loadBook();
  }, [bookId]);

  const handleBorrow = async (event) => {
    event.preventDefault();
    // Call the cloud function `borrowBookFromLibrary` to handle the borrowing logic
    try {
      await Parse.Cloud.run('borrowBookFromLibrary', { bookId, libraryMemberId });
      navigate(`/books/${bookId}`);
    } catch (error) {
      console.error('Error borrowing the book', error);
    }
  };

  if (!book) {
    return <div>Loading...</div>;
  }

  return (
    <div className="borrow-book-container">
      <h1 className="borrow-book-header">Borrow {book.title}</h1>
      <form className="borrow-book-form" onSubmit={handleBorrow}>
        <p>Available Copies: {book.availableCopies}</p>
        <label htmlFor="libraryMemberId" className="borrow-book-label">
          Your Library Member ID:
          <input
            type="text"
            id="libraryMemberId"
            value={libraryMemberId}
            onChange={(e) => setLibraryMemberId(e.target.value)}
            required
            className="borrow-book-input"
          />
        </label>
        <button type="submit" className="borrow-book-submit-btn">
          Borrow Book
        </button>
      </form>
    </div>
  );
};

export default BorrowBook;
