import React from "react";

const Shelf = (props) => {
  const { books, options, title, handleChange } = props;
  let ShelfName =
    title === "currentlyReading"
      ? "Currently Reading"
      : title === "wantToRead"
      ? "Want To Read"
      : "Read";

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
          {books?.map((book) => (
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
                      value={title}
                      onChange={(e) => handleChange(e, book.id)}
                    >
                      {selectItems}
                    </select>
                  </div>
                </div>
                <div className="book-title">{book.title}</div>
                <div className="book-authors">
                  {book.authors ? book.authors.join(" ") : null}
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
