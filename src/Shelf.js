import React, { useState, useEffect } from "react";
import * as BooksAPI from "./BooksAPI";

const Shelf = (props) => {
  const { books, options, title } = props;
  let ShelfName =
    title === "currentlyReading"
      ? "Currently Reading"
      : title === "wantToRead"
      ? "Want To Read"
      : "Read";

  const [shelf, setShelf] = useState(title);
  const handleChange = (e, id) => {
    setShelf(e.target.value);
    const selectedBook = books[0].filter((book) => book.id === id);
    updateBook(selectedBook, e.target.value);
  };

  const updateBook = (book, shelf) => {
    BooksAPI.update(book[0], shelf).then((res) => {
      console.log(res);
      window.location.reload();
    });
  };

  useEffect(() => {}, [shelf]);
  const selectItems = options.map((optionItem, index) => {
    return (
      <option
        key={index}
        value={optionItem.value}
        disabled={optionItem.disabled}
      >
        {optionItem.label}
      </option>
    );
  });

  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{ShelfName}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books[0]?.map((book) => (
            <li key={book.id}>
              <div className="book">
                <div className="book-top">
                  <div
                    className="book-cover"
                    style={{
                      width: 128,
                      height: 192,
                      backgroundImage: `url(${
                        book.imageLinks ? book.imageLinks.smallThumbnail : null
                      })`,
                    }}
                  ></div>
                  <div className="book-shelf-changer">
                    <select
                      value={shelf}
                      onChange={(e) => handleChange(e, book.id)}
                    >
                      {selectItems}
                    </select>
                  </div>
                </div>
                <div className="book-title">{book.title}</div>
                <div className="book-authors">
                  {book.authors
                    ? book.authors.map((author, i) => (
                        <span key={i}>{author}</span>
                      ))
                    : null}
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};
export default Shelf;
