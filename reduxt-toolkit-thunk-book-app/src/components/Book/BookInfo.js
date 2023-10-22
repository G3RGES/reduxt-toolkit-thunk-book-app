import React, { Fragment } from "react";

const BookInfo = ({ selectedBook }) => {
  // console.log(selectedBook);//TESTING
  return (
    <Fragment>
      <h2>Book Details</h2>
      {/* //* COULD USE Object.keys or Object.values 
      //* WHICHEVER OF THEM AS LONG AS THEY HAVE LENGTH MORE THAN 0 THEY WILL WORK */}
      {Object.keys(selectedBook).length > 0 ? (
        <div>
          <p className="fw-bold">Title: {selectedBook.title}</p>
          <p className="fst-italic">Author: {selectedBook.author}</p>
          <p className="fw-light">Description: {selectedBook.description}</p>
          <p className="fst-italic">Price: {selectedBook.price}$</p>
        </div>
      ) : (
        <div className="alert alert-secondary" role="alert">
          There is no books selected yet. Please select!
        </div>
      )}
    </Fragment>
  );
};

export default BookInfo;
