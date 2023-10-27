import "./App.css";
import { useEffect, useState } from "react";
import * as BooksApi from './BooksAPI.js';
import { Route, Routes, useNavigate } from "react-router-dom";
import {BookCard} from './BookCard';

function App() {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [isUpdated, setIsUpdated] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(()=> {
    const getBooks = async () => {
      const res = await BooksApi.getAll().then();
      setBooks(res);
    };

    getBooks();
    setIsUpdated(false);
  }, [isUpdated])

  const updateBook = (book, shelf) => {
    const updateBook = async () => {
      await BooksApi.update(book, shelf).then(()=>
        setIsUpdated(true));
    };

    updateBook();
    navigate("/")
  }

  return (
    <Routes>
      <Route
        exact
        path="/"
        element={<div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Currently Reading</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {books.filter((book) => book.shelf === 'currentlyReading').map((book) => (
                      <BookCard book={book} handleUpdate={updateBook}/>
                  ))}
                </ol>
              </div>
              <h2 className="bookshelf-title">Want to read</h2>
                <ol className="books-grid">
                  {books.filter((book) => book.shelf === 'wantToRead').map((book) => (
                      <BookCard book={book} handleUpdate={updateBook}/>
                  ))}
                </ol>
              <h2 className="bookshelf-title">Read</h2>
                <ol className="books-grid">
                  {books.filter((book) => book.shelf === 'read').map((book) => (
                      <BookCard book={book} handleUpdate={updateBook}/>
                  ))}
                </ol>
            </div>
          </div>
        </div>
        <div className="open-search cursor-pointer">
          <a className="cursor-pointer" onClick={() => navigate("/search")}>Add a book</a>
        </div>
      </div>
        }
      />
      <Route
        path="/search"
        element={
          <div className="search-books">
            <div className="search-books-bar">
              <a
                className="close-search"
                onClick={() => navigate("/")}
              >
                Close
              </a>
              <div className="search-books-input-wrapper">
                <input
                  type="text"
                  placeholder="Search by title, author, or ISBN"
                  onChange={(e)=> {
                    setQuery(e.target.value.toLowerCase());
                  }}
                />
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
                {books.filter((book) => book.title.toLowerCase().match(query) || book.authors.join().toLowerCase().match(query) || book.industryIdentifiers.map((identifier) => { return identifier.type === 'ISBN_10' ? identifier.identifier : ''}).join().toLowerCase().match(query)).map((book) => (
                    <BookCard book={book} handleUpdate={updateBook}/>
                ))}</ol>
            </div>
          </div>
        }
      />
    </Routes>

  );
}

export default App;

