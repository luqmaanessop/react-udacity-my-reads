import { BookCard } from "./BookCard";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import * as BooksApi from './BooksAPI.js';
import PropTypes from "prop-types";


export const BookSearch = ({setIsUpdated, books}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [grandLibrary, setGrandLibrary] = useState([]);
  const [isMounted, setIsMounted] = useState(true);

  useEffect(() => {
    return () => {
      // Cleanup function to set isMounted to false when the component is unmounted
      setIsMounted(false);
    };
  }, []);

  const handleOnChange = (e) => {
    setSearchTerm(e.target.value);
    clearTimeout(debouncedSearchTerm);

    // Set a timeout to call the API after 500 milliseconds of user inactivity
    const debounceTimeout = setTimeout(() => {
      setDebouncedSearchTerm(e.target.value.toLowerCase());

      // Call the search function of the API - then check if any of the current books matches and update their current shelf value
      isMounted &&
        BooksApi.search(e.target.value.toLowerCase(), 10000).then((res) => {
          if(res) {
            const updatedSearchResults = res.length && res.length > 0 && res.map((searchResultBook) => {
              const foundBook = books.find((book) => searchResultBook.id === book.id);

              if (foundBook) {
                // If the book is found, update the shelf
                return {
                  ...searchResultBook,
                  shelf: foundBook.shelf,
                };
              } else {
                // If the book is not found, set the shelf to 'none'
                return {
                  ...searchResultBook,
                  shelf: 'none',
                };
              }
            });
            updatedSearchResults && updatedSearchResults.length > 0 && setGrandLibrary(updatedSearchResults);
          } else {
            setGrandLibrary([])
          }
        })}
    , 1000);

    setDebouncedSearchTerm(debounceTimeout);
  };

  return (
    <div className="search-books">
    <div className="search-books-bar">
      <Link
        to="/"
        className="close-search"
      >
        Close
      </Link>
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
      { grandLibrary && grandLibrary.length > 0 ? grandLibrary.map(book => <BookCard key={book.id} book={book} setIsUpdated={setIsUpdated} />) : <p>No results found... Try another search</p>}
      </ol>
    </div>
  </div>
  )
}

BookSearch.propTypes = {
  books: PropTypes.array.isRequired,
  setIsUpdated: PropTypes.func.isRequired,
};
