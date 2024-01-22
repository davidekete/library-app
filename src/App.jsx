/* eslint-disable no-unused-vars */

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Books from './components/Books';
import BookDetails from './components/BookDetails';
import BooksByAuthor from './components/BooksByAuthor';
import BorrowBook from './components/BorrowBook';
import ReturnBook from './components/ReturnBook';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/books" element={<Books />} />
        <Route path="/books/:bookId" element={<BookDetails />} />
        <Route path="/books/authors/:authorName" element={<BooksByAuthor />} />
        <Route path="/books/:bookId/borrow" element={<BorrowBook />} />
        <Route path="/books/:bookId/return-to-library" element={<ReturnBook />} />
      </Routes>
    </Router>
  );
};

export default App;