// /* eslint-disable no-unused-vars */

// import React, { useState } from "react";
// import { useParams } from "react-router-dom";
// import Parse from "parse";
// import "./css/ReturnBook.css";

// const ReturnBook = () => {
//   const { bookId } = useParams();
//   const [libraryMemberId, setLibraryMemberId] = useState("");

//   const handleReturn = async (e) => {
//     e.preventDefault();
//     try {
//       await Parse.Cloud.run("returnBookToLibrary", { libraryMemberId, bookId });
//       alert("Book returned successfully");
//     } catch (error) {
//       alert(`Failed to return book: ${error.message}`);
//     }
//   };

//   return (
//     <div>
//       <h1>Return Book to Library</h1>
//       <form onSubmit={handleReturn}>
//         <label>
//           Library Member ID:
//           <input
//             type="text"
//             value={libraryMemberId}
//             onChange={(e) => setLibraryMemberId(e.target.value)}
//             required
//           />
//         </label>
//         <button type="submit">Return</button>
//       </form>
//     </div>
//   );
// };

// export default ReturnBook;
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Parse from 'parse';

const ReturnBook = () => {
  const [libraryMemberId, setLibraryMemberId] = useState('');
  const { bookId } = useParams();
  const navigate = useNavigate();

  const handleReturn = async (event) => {
    event.preventDefault();
    try {
      // Assuming `returnBookToLibrary` is the name of the cloud function for returning books
      await Parse.Cloud.run('returnBookToLibrary', { libraryMemberId, bookId });
      navigate(`/books/${bookId}`);
    } catch (error) {
      console.error('Error returning the book', error);
    }
  };

  return (
    <div className="return-book-container">
      <h1 className="return-book-header">Return Book</h1>
      <form className="return-book-form" onSubmit={handleReturn}>
        <label htmlFor="libraryMemberId" className="return-book-label">
          Library Member ID:
          <input
            type="text"
            id="libraryMemberId"
            value={libraryMemberId}
            onChange={(e) => setLibraryMemberId(e.target.value)}
            required
            className="return-book-input"
          />
        </label>
        <button type="submit" className="return-book-submit-btn">
          Return Book
        </button>
      </form>
    </div>
  );
};

export default ReturnBook;





