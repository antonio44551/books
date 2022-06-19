import React from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faTrash, faPen } from "@fortawesome/free-solid-svg-icons";

export default function BookCard(props) {
  const {
    book,
    deleteHandler,
    updateHandler,
    toggleFavoriteHandler,
    clickHandler,
  } = props;

  return (
    <div className="books-card">
      <img
        src={book.imageUrl}
        alt={book.title + book.author}
        onClick={clickHandler}
      />
      <div className="books-card-body">
        <div className="books-card-name">{book.title}</div>
        <div className="books-card-body-row">
          <span className="books-card-body-row-title"> Author: </span>
          <span> {book.author} </span>
        </div>

        <div className="books-card-actions">
          <FontAwesomeIcon
            onClick={toggleFavoriteHandler}
            icon={faStar}
            className={`${
              book.isFavorite
                ? "books-card-actions-star"
                : "books-card-actions-star-empty"
            }`}
          />

          <FontAwesomeIcon
            icon={faPen}
            className="books-card-actions-edit"
            onClick={updateHandler}
          />

          <Popup
            trigger={
              <FontAwesomeIcon
                icon={faTrash}
                className="books-card-actions-delete"
              />
            }
            position="center center"
          >
            {(close) => (
              <div className="delete-modal">
                <div>Are you sure you want to delete this book?</div>
                <div className="delete-modal-buttons">
                  <button className="books-button" onClick={deleteHandler}>
                    <span>Yes</span>
                  </button>
                  <button className="books-button" onClick={close}>
                    <span>No</span>
                  </button>
                </div>
              </div>
            )}
          </Popup>
        </div>
      </div>
    </div>
  );
}
