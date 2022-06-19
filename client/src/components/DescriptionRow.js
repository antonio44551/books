import React from "react";

function DescriptionRow(props) {
  const { title, text } = props;
  return (
    <div className="book-page-infos-description-row">
      <span className="book-page-infos-description-title">{title}: </span>
      <span className="book-page-infos-description-text">{text}</span>
    </div>
  );
}
export default DescriptionRow;
