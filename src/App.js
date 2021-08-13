import React from 'react';
// import * as BooksAPI from './BooksAPI';
import BookShelf from './BookShelf';
import Search from './Search';
import { Route } from "react-router-dom";
import './App.css'

class BooksApp extends React.Component {
  state = {
    
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" component={BookShelf} />
        <Route path="/search" component={Search} />
      </div>
    );
  }
}

export default BooksApp
