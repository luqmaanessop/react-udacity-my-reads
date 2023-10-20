import "./App.css";
import { useEffect, useState } from "react";
import * as BooksApi from './BooksAPI.js';
import { Route, Routes, useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [isUpdated, setIsUpdated] = useState(false);

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
        <div className="open-search">
          <a onClick={() => navigate("/search")}>Add a book</a>
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
                />
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div>
        }
      />
    </Routes>

  );
}

export default App;

function BookCard({book, handleUpdate}) {


  return (
  <div className="book">
    <div className="book-top">
      <div
        className="book-cover"
        style={{
          width: 128,
          height: 192,
        }}
      >
        <img src={book['imageLinks'].thumbnail} alt={book.title}
        style={{
          width: 128,
          height: 192,
          objectFit: 'cover',
        }}></img>
      </div>
      <div className="book-shelf-changer">
        <select value={book.shelf} onChange={(e) => {
          handleUpdate(book, e.target.value);
        }}>
          <option value="none" disabled>
            Move to...
          </option>
          <option value="currentlyReading">
            Currently Reading
          </option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>
      </div>
    </div>
    <div className="book-title">
      {book.title}
    </div>
    <div className="book-authors">{book.authors}</div>
  </div>)
}
