import { BookCard } from "./BookCard";
import PropTypes from "prop-types";

export const BookShelf = ({books, setIsUpdated}) => {

  return (
  <div className="list-books">
        <div className="list-books-title">
          <h1>Luqmaan Essop dev library</h1>
        </div>
        <div className="list-books-content">
          <div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Currently Reading</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {books.map((book) => (
                    book.shelf === 'currentlyReading' &&
                    <BookCard key={book.id} book={book} setIsUpdated={setIsUpdated}/>
                  ))}
                </ol>
              </div>
              <h2 className="bookshelf-title">Want to read</h2>
                <ol className="books-grid">
                  {books.map((book) => (
                    book.shelf === 'wantToRead' &&
                    <BookCard key={book.id} book={book} setIsUpdated={setIsUpdated}/>
                  ))}
                </ol>
              <h2 className="bookshelf-title">Read</h2>
                <ol className="books-grid">
                  {books.map((book) => (
                    book.shelf === 'read' &&
                    <BookCard key={book.id} book={book} setIsUpdated={setIsUpdated}/>
                  ))}
                </ol>
            </div>
          </div>
        </div>
      </div>
  )
}

BookShelf.propTypes = {
  books: PropTypes.array.isRequired,
  setIsUpdated: PropTypes.func.isRequired,
};
