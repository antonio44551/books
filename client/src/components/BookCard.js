import React from "react";

export default function BookCard(props) {
  const { book } = props;

  return (
    <div>
      <div>Title: {book.title}</div>
      <div>Author: {book.author}</div>
      <div>Description: {book.description}</div>
      <div>Number of pages: {book.numberOfPages}</div>
      <div>Rating: {book.rating}</div>
      <div>Total ratings: {book.totalRatings}</div>
      <div>Reviews: {book.reviews}</div>
      <div>
        <img alt={book.title + book.author} src={book.imageUrl}></img>
      </div>
    </div>
  );
}
