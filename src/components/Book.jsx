import React from "react";

const Book = ({ book }) => {
  return (
    <div>
      <strong>{book.title}</strong> by {book.author.name} <br />
      Published at: {book.published_at}
    </div>
  );
};

export default Book;
