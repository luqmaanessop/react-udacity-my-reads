import "./App.css";
import { useEffect, useState } from "react";
import * as BooksApi from './BooksAPI.js';
import { Route, Routes } from "react-router-dom";
import { BookSearch } from './BookSearch';
import { BookShelf } from "./BookShelf";
import { Link } from "react-router-dom";

function App() {
  const [books, setBooks] = useState([]);
  const [isUpdated, setIsUpdated] = useState(false);

  const handleUpdate = (book, shelf) => {
    // Invalidate UI after updating a book to cause a re-render
    BooksApi.update(book, shelf).then(() => setIsUpdated(true));
  }

  useEffect(() => {
    BooksApi.getAll().then((res) => {
      setBooks(res)
    });

    setIsUpdated(false);
  }, [isUpdated])

  return (
    <Routes>
      <Route
        exact
        path="/"
        element={
          <>
            <BookShelf books={books} setIsUpdated={setIsUpdated} handleUpdate={handleUpdate}/>
            <Link className="open-search" to="/search">Open search</Link>
          </>
        }
      />
      <Route
        path="/search"
        element={
          <BookSearch books={books} setIsUpdated={setIsUpdated} handleUpdate={handleUpdate}/>
        }
      />
    </Routes>

  );
}

export default App;

