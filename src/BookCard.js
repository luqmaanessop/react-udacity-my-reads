import PropTypes from "prop-types";
export const BookCard = ({book, handleUpdate}) => {

  const bookImage = book['imageLinks'] && book['imageLinks'].thumbnail ? book['imageLinks'].thumbnail : 'https://picsum.photos/id/870/200/300?grayscale&blur=2';

  const shelves = [
    {
      id: '1',
      value: 'moveTo',
      disabled: true,
      label: 'Move to...'
    },
    {
      id: '2',
      value: 'currentlyReading',
      disabled: false,
      label: 'Currently reading'
    },
    {
      id: '3',
      value: 'wantToRead',
      disabled: false,
      label: 'Want to read'
    },
    {
      id: '4',
      value: 'read',
      disabled: false,
      label: 'Read'
    },
    {
      id: '5',
      value: 'none',
      disabled: false,
      label: 'None'
    },
  ]

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
          {shelves.map((shelf) => (
            <option key={shelf.id} value={shelf.value} disabled={shelf.disabled}>
              {shelf.label}
            </option>
          ))}
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
