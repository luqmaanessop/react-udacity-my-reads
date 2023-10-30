import * as BooksApi from './BooksAPI.js';


export const BookCard = ({book, setIsUpdated}) => {
  const handleUpdate = (book, shelf) => {
    // Invalidate UI after updating a book to cause a re-render
    BooksApi.update(book, shelf).then(() => setIsUpdated(true));
  }

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
