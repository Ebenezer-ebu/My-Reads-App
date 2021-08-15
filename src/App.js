import { Route, Switch } from "react-router-dom";
import React from 'react';
import MainPage from './MainPage';
import Search from './Search';
import { options } from "./utils/utils";
import NoMatch from './NoMatch';
import * as BooksAPI from "./BooksAPI";
import './App.css';

class BooksApp extends React.Component {
  state = {
    books: {
      currentlyReading: [],
      wantToRead: [],
      read: [],
    },
    allBooks: [],
    shelf: "",
    options,
  };
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      let currentlyReading = books.filter(
        (book) => book.shelf === "currentlyReading"
      );
      let wantToRead = books.filter((book) => book.shelf === "wantToRead");
      let read = books.filter((book) => book.shelf === "read");
      this.setState((prevState) => ({
        books: {
          currentlyReading: [
            ...prevState.books.currentlyReading,
            ...currentlyReading,
          ],
          wantToRead: [...prevState.books.wantToRead, ...wantToRead],
          read: [...prevState.books.read, ...read],
        },
        allBooks: books,
      }));
    });
  }

  handleChange = async (e, id) => {
    const { allBooks } = this.state;
    // console.log(allBooks);
    let selectedBook = allBooks.find((book) => book.id === id);
    this.setState({
      shelf: e.target.value,
    });
    // console.log(selectedBook);
    // let checkBook = await BooksAPI.get(id);
    // let selectedBook = await checkBook;
    // console.log(selectedBook);
    this.updateBook(selectedBook, e.target.value);
  };

  updateBook = async (book, shelf) => {
    console.log('i entered')
    BooksAPI.update(book, shelf).then((res) => {
      console.log(res);
      this.refetchBook();
    });
  };

  refetchBook = () => {
    console.log("refetch");
    BooksAPI.getAll().then((books) => {
      let currentlyReading = books.filter(
        (book) => book.shelf === "currentlyReading"
      );
      let wantToRead = books.filter((book) => book.shelf === "wantToRead");
      let read = books.filter((book) => book.shelf === "read");
      this.setState(() => ({
        books: {
          currentlyReading: [...currentlyReading],
          wantToRead: [...wantToRead],
          read: [...read],
        },
        allBooks: books,
      }));
    });
  };

  render() {
    return (
      <div className="app">
        <Switch>
          <Route exact path="/" render={() => (
            <MainPage
              books={this.state.books}
              options={this.state.options}
              handleChange={this.handleChange}
            />
          )}
          />
          <Route path="/search" render={() => (
            <Search
              allBooks={this.state.allBooks}
              options={this.state.options}
              refetch={this.updateBook}
            />
          )}
          />
          <Route component={NoMatch} />
        </Switch>
      </div>
    );
  }
}

export default BooksApp
