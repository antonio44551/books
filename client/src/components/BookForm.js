import React, { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import Input from "./Input";

export default function BookForm(props) {
  console.log("BookForm props", props);

  const [title, setTitle] = useState(props.bookTitle || "");
  const [description, setDescription] = useState(props.bookDescription || "");
  const [author, setAuthor] = useState(props.bookAuthor || "");
  const [numberOfPages, setNumberOfPages] = useState(
    props.bookNumberOfPages || 100
  );
  const [rating, setRating] = useState(props.bookRating || 5);
  const [totalRatings, setTotalRatings] = useState(props.bookTotalRatings || 5);
  const [reviews, setReviews] = useState(props.bookReviews || 5);
  const [imageUrl, setImageUrl] = useState(props.bookImageUrl || "");
  const [isFavorite, setIsFavorite] = useState(
    Boolean(props.bookIsFavorite || false)
  );

  console.log("BookForm title", title);

  const submitFormHandler = (event) => {
    event.preventDefault();
    const payload = {
      title,
      description,
      author,
      numberOfPages,
      rating,
      totalRatings,
      reviews,
      imageUrl,
      isFavorite,
    };
    console.log("payload", payload);
    props.sendPayloadHandler(payload);
  };

  return (
    <form className="book-form">
      <Input
        onChangeHandler={(e) => setTitle(e.target.value)}
        title="Book title"
        ariaLabel="Book title"
        name="title"
        placeholder="Book title"
        type="text"
        icon="heading"
        value={title}
      />
      <Input
        onChangeHandler={(e) => setDescription(e.target.value)}
        title="Book description"
        ariaLabel="Book description"
        name="description"
        placeholder="Book description"
        type="text"
        icon="pen"
        value={description}
      />
      <Input
        onChangeHandler={(e) => setAuthor(e.target.value)}
        title="Book author"
        ariaLabel="Book author"
        name="author"
        placeholder="Book author"
        type="text"
        icon="user"
        value={author}
      />
      <Input
        onChangeHandler={(e) => setNumberOfPages(e.target.value)}
        title="Number of pages"
        ariaLabel="Number of pages"
        name="numberOfPages"
        placeholder="Number of pages"
        type="number"
        icon="list"
        value={numberOfPages}
      />
      <Input
        onChangeHandler={(e) => setRating(e.target.value)}
        title="Rating"
        ariaLabel="Rating"
        name="rating"
        placeholder="Rating"
        type="number"
        icon="star"
        value={rating}
      />
      <Input
        onChangeHandler={(e) => setTotalRatings(e.target.value)}
        title="Total ratings"
        ariaLabel="Total ratings"
        name="totalRatings"
        placeholder="Total ratings"
        type="number"
        icon="check"
        value={totalRatings}
      />
      <Input
        onChangeHandler={(e) => setReviews(e.target.value)}
        title="Reviews"
        ariaLabel="Reviews"
        name="reviews"
        placeholder="Reviews"
        type="number"
        icon="ranking"
        value={reviews}
      />
      <Input
        onChangeHandler={(e) => setImageUrl(e.target.value)}
        title="Image URL"
        ariaLabel="Image URL"
        name="imageUrl"
        placeholder="Image URL"
        type="url"
        icon="image"
        value={imageUrl}
      />
      <Input
        onChangeHandler={(e) => setIsFavorite(Boolean(e.target.value))}
        title="Is favorite"
        ariaLabel="Is favorite"
        name="isFavorite"
        placeholder="Is favorite"
        type="checkbox"
        value={isFavorite}
      />
      <button
        className="books-button"
        onClick={submitFormHandler}
        type="submit"
      >
        <FontAwesomeIcon icon={faSave} />
        <span>Submit</span>
      </button>
    </form>
  );
}
