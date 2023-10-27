import { BookCard } from "./BookCard"

export const BookShelf = ({books, setIsUpdated}) => {

  return (
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
                  {books.map((book) => (
                    book.shelf === 'currentlyReading' &&
                    <BookCard book={book} setIsUpdated={setIsUpdated}/>
                  ))}
                </ol>
              </div>
              <h2 className="bookshelf-title">Want to read</h2>
                <ol className="books-grid">
                  {books.map((book) => (
                    book.shelf === 'wantToRead' &&
                    <BookCard book={book} setIsUpdated={setIsUpdated}/>
                  ))}
                </ol>
              <h2 className="bookshelf-title">Read</h2>
                <ol className="books-grid">
                  {books.map((book) => (
                    book.shelf === 'read' &&
                    <BookCard book={book} setIsUpdated={setIsUpdated}/>
                  ))}
                </ol>
            </div>
          </div>
        </div>
      </div>
  )
}
