// import { BookCard } from "./BookCard"

// export const BookShelf = () => {
//   return (
// <div className="list-books">
//         <div className="list-books-title">
//           <h1>MyReads</h1>
//         </div>
//         <div className="list-books-content">
//           <div>
//             <div className="bookshelf">
//               <h2 className="bookshelf-title">Currently Reading</h2>
//               <div className="bookshelf-books">
//                 <ol className="books-grid">
//                   {books.filter((book) => book.shelf === 'currentlyReading').map((book) => (
//                       <BookCard book={book} handleUpdate={updateBook}/>
//                   ))}
//                 </ol>
//               </div>
//               <h2 className="bookshelf-title">Want to read</h2>
//                 <ol className="books-grid">
//                   {books.filter((book) => book.shelf === 'wantToRead').map((book) => (
//                       <BookCard book={book} handleUpdate={updateBook}/>
//                   ))}
//                 </ol>
//               <h2 className="bookshelf-title">Read</h2>
//                 <ol className="books-grid">
//                   {books.filter((book) => book.shelf === 'read').map((book) => (
//                       <BookCard book={book} handleUpdate={updateBook}/>
//                   ))}
//                 </ol>
//             </div>
//           </div>
//         </div>
//         <div className="open-search">
//           <a onClick={() => navigate("/search")}>Add a book</a>
//         </div>
//       </div>
//   )
// }
