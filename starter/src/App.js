import "./App.css";
import { useEffect, useState } from "react";
import * as BooksApi from './BooksAPI.js';

function App() {
  const [showSearchPage, setShowSearchpage] = useState(false);
  const [books, setBooks] = useState([]);

  useEffect(()=> {
    const getBooks = async () => {
      const res = await BooksApi.getAll();
      setBooks(res);
    };

    getBooks();
  }, [])

  console.log(books)

  return (
    <div className="app">
      {showSearchPage ? (
        <div className="search-books">
          <div className="search-books-bar">
            <a
              className="close-search"
              onClick={() => setShowSearchpage(!showSearchPage)}
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
      ) : (
        <div className="list-books">
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
                        <BookCard book={book}/>
                    ))}
                  </ol>
                </div>
                <h2 className="bookshelf-title">Want to read</h2>
                  <ol className="books-grid">
                    {books.filter((book) => book.shelf === 'wantToRead').map((book) => (
                        <BookCard book={book}/>
                    ))}
                  </ol>
                <h2 className="bookshelf-title">Read</h2>
                  <ol className="books-grid">
                    {books.filter((book) => book.shelf === 'read').map((book) => (
                        <BookCard book={book}/>
                    ))}
                  </ol>
              </div>
            </div>
          </div>
          <div className="open-search">
            <a onClick={() => setShowSearchpage(!showSearchPage)}>Add a book</a>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

function BookCard({book}) {
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
        <select>
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
