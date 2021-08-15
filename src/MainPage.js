import React from "react";
import Shelf from "./Shelf";
import { withRouter } from "react-router-dom";

class MainPage extends React.Component {
  render() {
    const { books, handleChange, options } = this.props;
    const shelves = Object.keys(books);
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {shelves.map((shelf) => (
              <Shelf
                title={shelf}
                key={shelf}
                books={books[shelf]}
                options={options}
                handleChange={handleChange}
              />
            ))}
          </div>
        </div>
        <div className="open-search">
          <button
            onClick={() => {
              this.props.history.push("/search");
            }}
          >
            Add a book
          </button>
        </div>
      </div>
    );
  }
}

export default withRouter(MainPage);
