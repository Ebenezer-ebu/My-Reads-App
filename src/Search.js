import React from "react";
import { Link, withRouter } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import { options } from "./utils/utils";
import SearchError from "./SearchError";

class Search extends React.Component {
  state = {
    books: [],
    compareBooks: [],
    query: "",
    options,
    shelf: "none",
  };

  handleChange = (e) => {
    const { value } = e.target;
    this.setState(() => ({
      query: value,
    }));
  };

  handleChangeSelect = (e, id) => {
    this.setState(() => ({
      shelf: e.target.value,
    }));
    const { books } = this.state;
    const selectedBook = books.filter((book) => book.id === id);
    this.updateBook(selectedBook, e.target.value);
  };
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState(() => ({
        compareBooks: books,
      }));
    });
  }
  updateBook = (book, shelf) => {
    const { history } = this.props;
    BooksAPI.update(book[0], shelf).then((res) => console.log(res));
    if (history) history.push("/");
  };

  handleSearch = async (e) => {
    e.preventDefault();
    const { query, compareBooks } = this.state;
      let books = await BooksAPI.search(query);
      let response = await books;
      for (let i = 0; i < response.length; i++) {
          let bookItem = response[i]
          for (let j = 0; j < compareBooks.length; j++) {
              let compareBookItem = compareBooks[j];
              if (compareBookItem.id === bookItem.id) {
                  response.splice(i, 1, compareBookItem)
              } 
          }
      }
      this.setState(() => ({
          books: response,
      }))
  };

  render() {
      const { books, options, shelf } = this.state;
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
          <Link to="/">
            <button className="close-search">Close</button>
          </Link>
          <div className="search-books-input-wrapper">
            <form onSubmit={(e) => this.handleSearch(e)}>
              <input
                type="text"
                placeholder="Search by title or author"
                value={this.state.query}
                onChange={this.handleChange}
              />
            </form>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {!books.error ? books.map((book) => (
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
                        value={
                          book.shelf
                            ? book.shelf
                            : shelf
                        }
                        onChange={(e) => this.handleChangeSelect(e, book.id)}
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
            )) : <SearchError /> }
          </ol>
        </div>
      </div>
    );
  }
}
export default withRouter(Search);
