import { useNavigate } from "react-router-dom";
import { BookCard } from "./BookCard";
import { useState } from "react";
import * as BooksApi from './BooksAPI.js';

export const BookSearch = ({setIsUpdated}) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [grandLibrary, setGrandLibrary] = useState([])

  const handleOnChange = (e) => {
    setSearchTerm(e.target.value);
    clearTimeout(debouncedSearchTerm);

    // Set a timeout to call the API after 500 milliseconds of user inactivity
    const debounceTimeout = setTimeout(() => {
      setDebouncedSearchTerm(e.target.value.toLowerCase());
      BooksApi.search(e.target.value.toLowerCase(), 10000).then((res) => setGrandLibrary(res));
    }, 500);

    setDebouncedSearchTerm(debounceTimeout);
  };

  return (
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
          value={searchTerm}
          type="text"
          placeholder="Search by title, author, or ISBN"
          onChange={(e)=> {
            handleOnChange(e);
          }}
        />
      </div>
    </div>
    <div className="search-books-results">
      <ol className="books-grid">
      { grandLibrary && grandLibrary.length > 0 && grandLibrary.map(book => <BookCard key={book.id} book={book} setIsUpdated={setIsUpdated} />)}
      </ol>
    </div>
  </div>
  )

}
