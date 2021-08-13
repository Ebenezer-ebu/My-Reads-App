import React from "react";

const SearchError = () => {
  return (
    <div className="bookshelf-title">
      <h2 className="book-cover-title-error">
        No search results with your input. Try searching by the specified search
        names listed in SEARCH_TERMS.md file in the root directory.
      </h2>
    </div>
  );
};

export default SearchError;
