import React from "react";
import { Link, withRouter } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import SearchError from "./SearchError";

class Search extends React.Component {
  state = {
    books: [],
    query: "",
    main: [],
    shelf: "none",
  };
  handleChangeSearch = async (e) => {
    const { value } = e.target;
    this.setState(() => ({
      query: value,
    }));
    const { allBooks } = this.props;
    let books = await BooksAPI.search(value);
    let response = await books;
    if (response && response.length > 0) {
      for (let i = 0; i < response.length; i++) {
        let bookItem = response[i];
        for (let j = 0; j < allBooks.length; j++) {
          let compareBookItem = allBooks[j];
          if (compareBookItem.id === bookItem.id) {
            response.splice(i, 1, compareBookItem);
          }
        }
      }
      this.setState(() => ({
        books: response,
      }));
    }
  };

  handleChange = (e, id) => {
    console.log(this.props)
    this.setState(() => ({
      shelf: e.target.value,
    }));
    const { books } = this.state;
    const selectedBook = books.find((book) => book.id === id);
    this.props.refetch(selectedBook, e.target.value);
  };

  render() {
    const { books, shelf } = this.state;
    const { options } = this.props;
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
      <div className="search-books">
        <div className="search-books-bar">
            <button
              className="close-search"
              onClick={() => {
                this.props.history.push("/");
              }}
            >
              Close
            </button>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={this.state.query}
              onChange={this.handleChangeSearch}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {!books.error ? (
              books.map((book) => (
                <li key={book.id}>
                  <div className="book">
                    <div className="book-top">
                      <div
                        className="book-cover"
                        style={{
                          width: 128,
                          height: 192,
                          backgroundImage: `url(${
                            book.imageLinks
                              ? book.imageLinks.smallThumbnail
                              : null
                          })`,
                        }}
                      ></div>
                      <div className="book-shelf-changer">
                        <select
                          value={book.shelf ? book.shelf : shelf}
                          onChange={(e) => this.handleChange(e, book.id)}
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
              ))
            ) : (
              <SearchError />
            )}
          </ol>
        </div>
      </div>
    );
  }
}
export default withRouter(Search);
