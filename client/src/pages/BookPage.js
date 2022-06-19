import React, { useEffect, useState, useCallback } from "react";
import DescriptionRow from "../components/DescriptionRow";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLongArrowAltLeft,
  faPen,
  faStar,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import {
  deleteBook as removeBook,
  updateBook as editBook,
} from "../store/actions/index";
import { getOneBook, deleteBook, updateBook } from "../api/index";

export default function BookPage() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(false);
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
    getBookById();
  }, [getBookById, id]);

  const backHandler = () => {
    navigate("/");
  };

  const deleteHandler = () => {
    deleteBook(book._id)
      .then((response) => {
        console.log("deleteBook", response.data);
        dispatch(removeBook(book._id));
      })
      .catch((error) => console.error("An error occurred!", error));
  };

  const toggleFavoriteHandler = () => {
    const updatedBook = { ...book, isFavorite: !book.isFavorite };
    updateBook(book._id, updatedBook)
      .then((response) => {
        console.log("toggleFavoriteHandler", response.data);
        dispatch(editBook(book._id, response.data));
        showToastMessage("Book set as favorite!");
      })
      .catch((error) => console.error("An error occurred!", error));
  };

  const showToastMessage = (message) => {
    console.log("showToastMessage", message);
    toast(message);
  };

  const updateHandler = () => {
    navigate(`/book-edit/${book._id}`);
  };

  if (loading || !book) {
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
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <section className="book-page-infos">
        <img src={book.imageUrl} alt={book.title + book.author}></img>
        <div className="book-page-infos-right">
          <h1 className="book-page-infos-right-name">{book.title}</h1>
          <div className="book-page-infos-description">
            <div className="country-infos-description-left">
              <DescriptionRow title="Author" text={book.author} />
              <DescriptionRow title="Description" text={book.description} />
              <DescriptionRow
                title="Number of pages"
                text={book.numberOfPages}
              />
              <DescriptionRow title="Rating" text={book.rating} />
            </div>
            <div className="country-infos-description-right">
              <DescriptionRow title="Total ratings" text={book.totalRatings} />
              <DescriptionRow title="Reviews" text={book.reviews} />
            </div>
          </div>
          <div className="book-page-infos-actions">
            <div className="book-page-infos-actions-favorite">
              <button className="books-button" onClick={toggleFavoriteHandler}>
                <FontAwesomeIcon icon={faStar} />
                <span>Favorite</span>
              </button>
            </div>
            <div className="book-page-infos-actions-edit">
              <button className="books-button" onClick={updateHandler}>
                <FontAwesomeIcon icon={faPen} />
                <span>Edit</span>
              </button>
            </div>
            <div className="book-page-infos-actions-delete">
              <Popup
                trigger={
                  <button className="books-button">
                    <FontAwesomeIcon icon={faTrash} />
                    <span>Delete</span>
                  </button>
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
      </section>
    </>
  );
}
