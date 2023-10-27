import "./App.css";
import { useEffect, useState } from "react";
import * as BooksApi from './BooksAPI.js';
import { Route, Routes, useNavigate } from "react-router-dom";
import { BookSearch } from './BookSearch';
import { BookShelf } from "./BookShelf";

function App() {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [isUpdated, setIsUpdated] = useState(false);

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
            <BookShelf books={books} setIsUpdated={setIsUpdated}/>
            <div className="open-search">
              <a onClick={() => navigate("/search")}>Add a book</a>
            </div>
          </>
        }
      />
      <Route
        path="/search"
        element={
          <BookSearch books={books} setIsUpdated={setIsUpdated}/>
        }
      />
    </Routes>

  );
}

export default App;

