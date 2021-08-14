import React from "react";
import Shelf from "./Shelf";
import { Link } from "react-router-dom";
import { options } from "./utils/utils";
import * as BooksAPI from "./BooksAPI";

class MainPage extends React.Component {
  state = {
    books: {
      currentlyReading: [],
      wantToRead: [],
      read: [],
    },
    shelf: "",
    options,
  };

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      console.log(books);
      let currentlyReading = books.filter(
        (book) => book.shelf === "currentlyReading"
      );
      let wantToRead = books.filter((book) => book.shelf === "wantToRead");
      let read = books.filter((book) => book.shelf === "read");
      this.setState((prevState) => ({
        books: {
          currentlyReading: [
            ...prevState.books.currentlyReading,
            currentlyReading,
          ],
          wantToRead: [...prevState.books.wantToRead, wantToRead],
          read: [...prevState.books.read, read],
        },
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
    });
  };

  render() {
      const shelves = Object.keys(this.state.books);
      console.log(shelves)
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {shelves.map((shelf) => (
              <Shelf title={shelf} key={shelf}
                books={this.state.books[shelf]}
                options={this.state.options}
                value={this.state.shelf}
                handleChange={this.handleChange}
              />
            ))}
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

export default MainPage;
