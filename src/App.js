import React from 'react';
import MainPage from './MainPage';
import Search from './Search';
import { Route } from "react-router-dom";
import './App.css';

class BooksApp extends React.Component {
  state = {
    
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" component={MainPage} />
        <Route path="/search" component={Search} />
      </div>
    );
  }
}

export default BooksApp
