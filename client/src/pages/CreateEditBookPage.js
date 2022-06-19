import React, { useEffect, useCallback, useState } from "react";
import { useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLongArrowAltLeft } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import BookForm from "../components/BookForm";
import {
  updateBook as editBook,
  createBook as addBook,
} from "../store/actions/index";
import { createBook, updateBook, getOneBook } from "../api/index";

const placeholderBookImage =
  "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80";

export default function CreateEditBookPage() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(false);

  console.log("CreateEditBookPage id", id);

  const getBookById = useCallback(() => {
    setLoading(true);
    getOneBook(id)
      .then((response) => {
        console.log("getBookById", response.data);
        setBook(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("An error occurred!", error);
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    if (id) {
      getBookById();
    }
  }, [getBookById, id]);

  const backHandler = () => {
    navigate("/");
  };

  const sendPayloadHandler = (payload) => {
    console.log("sendPayloadHandler payload", payload);
    //if id exists we update book, otherwise we create it
    if (id) {
      updateBook(id, payload)
        .then((response) => {
          console.log("sendPayloadHandler", response.data);
          dispatch(editBook(id, response.data));
          navigate(`/book/${id}`);
        })
        .catch((error) => console.error("An error occurred!", error));
      return;
    }
    createBook(payload)
      .then((response) => {
        console.log("sendPayloadHandler create", response.data.book);
        dispatch(addBook(response.data.book));
        navigate(`/book/${response.data.book._id}`);
      })
      .catch((error) => console.error("An error occurred!", error));
    return;
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="search-create-row">
        <div>
          <button className="books-button" onClick={backHandler}>
            <FontAwesomeIcon icon={faLongArrowAltLeft} />
            <span>Back</span>
          </button>
        </div>
        <div></div>
      </div>
      <section className="book-page-infos">
        {book ? (
          <img src={book.imageUrl} alt={book.title + book.author}></img>
        ) : (
          <img src={placeholderBookImage} alt={"book and coffee"}></img>
        )}
        <div className="book-page-infos-right">
          <h1 className="book-page-infos-right-title">
            {id ? "Update book" : "Create new book"}
          </h1>
          {book ? (
            <BookForm
              bookTitle={book.title}
              bookDescription={book.description}
              bookAuthor={book.author}
              bookNumberOfPages={book.numberOfPages}
              bookRating={book.rating}
              bookTotalRatings={book.totalRatings}
              bookReviews={book.reviews}
              bookImageUrl={book.imageUrl}
              bookIsFavorite={book.isFavorite}
              sendPayloadHandler={sendPayloadHandler}
            />
          ) : (
            <BookForm sendPayloadHandler={sendPayloadHandler} />
          )}
        </div>
      </section>
    </>
  );
}
