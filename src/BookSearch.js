import { BookCard } from "./BookCard";
import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import * as BooksApi from './BooksAPI.js';
import PropTypes from "prop-types";
import { debounce } from 'lodash';


export const BookSearch = ({setIsUpdated, books}) => {
  const [grandLibrary, setGrandLibrary] = useState([]);
  const [isMounted, setIsMounted] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    return () => {
      // Cleanup function to set isMounted to false when the component is unmounted
      setIsMounted(false);
    };
  }, []);


	const debouncedSearch = (
		useCallback(debounce((value) => {
      // Call the search function of the API - then check if any of the current books matches and update their current shelf value
      isMounted && BooksApi.search(value, 1000).then((res) => {
        if(res) {
          const updatedSearchResults = res.length && res.length > 0 && res.map((searchResultBook) => {
            const foundBook = books.find((book) => searchResultBook.id === book.id);

            // If the book is found, update the shelf else set to 'none'
            return {
              ...searchResultBook,
              shelf: foundBook ? foundBook.shelf : 'none',
            };
          });
          updatedSearchResults && updatedSearchResults.length > 0 && setGrandLibrary(updatedSearchResults);
        } else {
          setGrandLibrary([])
        }
      })
    }),[isMounted, books], 1000) // will be created only once initially
	);


  const handleOnChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
    debouncedSearch(e.target.value.toLowerCase());
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
