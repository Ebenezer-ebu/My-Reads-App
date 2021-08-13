import React from "react";
import CurrentlyReading from "./CurrentlyReading";
import WantToRead from "./WantToRead";
import Read from "./Read";
import { Link } from "react-router-dom";
import { options } from "./utils/utils";
import * as BooksAPI from "./BooksAPI";

class BookShelf extends React.Component {
  state = {
    books: [],
    shelf: "",
    options,
  };

  componentDidMount() {
      BooksAPI.getAll().then((books) => {
      this.setState(() => ({
          books,
      }));
    });
  }

  handleChange = (e, id) => {
    this.setState(() => ({
      shelf: e.target.value,
    }));
    const { books } = this.state;
    const selectedBook = books.filter((book) => book.id === id);
    this.updateBook(selectedBook, e.target.value);
  };

  updateBook = (book, shelf) => {
    BooksAPI.update(book[0], shelf).then((res) => {
      console.log(res);
        // window.location.reload();
    });
  };

    render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <CurrentlyReading
              books={this.state.books}
              options={this.state.options}
              value={this.state.shelf}
              handleChange={this.handleChange}
            />
            <WantToRead
              books={this.state.books}
              options={this.state.options}
              value={this.state.shelf}
              handleChange={this.handleChange}
            />
            <Read
              books={this.state.books}
              options={this.state.options}
              value={this.state.shelf}
              handleChange={this.handleChange}
            />
          </div>
        </div>
        <div className="open-search">
          <Link to="./search">
            <button>Add a book</button>
          </Link>
        </div>
      </div>
    );
  }
}

export default BookShelf;
