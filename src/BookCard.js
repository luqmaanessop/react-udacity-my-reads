import PropTypes from "prop-types";
export const BookCard = ({book, handleUpdate}) => {

  const bookImage = book['imageLinks'] && book['imageLinks'].thumbnail ? book['imageLinks'].thumbnail : 'https://picsum.photos/id/870/200/300?grayscale&blur=2';

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
        <img src={bookImage} alt={book.title}
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
          <option value="moveTo" disabled>
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

BookCard.propTypes = {
  book: PropTypes.object.isRequired,
  handleUpdate: PropTypes.func.isRequired,
};
