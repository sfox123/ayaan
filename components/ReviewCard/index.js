// components/ReviewCard.js
import React, { useState, useRef } from "react";

// UserIcon and StarRating components remain the same as before
const UserIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    width="24px"
    height="24px"
    aria-hidden="true"
    className="review__avatar-svg"
  >
    <path d="M0 0h24v24H0V0z" fill="none" />
    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
  </svg>
);

const StarRating = ({ stars }) => {
  const totalStars = 5;
  return (
    <div className="review__stars-container">
      {[...Array(totalStars)].map((_, index) => {
        const starNumber = index + 1;
        return (
          <span
            key={starNumber}
            className={`review__star ${starNumber <= stars ? "review__star--filled" : "review__star--empty"}`}
            aria-hidden="true"
          >
            ★
          </span>
        );
      })}
    </div>
  );
};

const ReviewCard = ({ review }) => {
  const [isExpandedByClick, setIsExpandedByClick] = useState(false);
  const textRef = useRef(null);

  const handleClick = () => {
    setIsExpandedByClick(!isExpandedByClick);
  };

  return (
    <div
      className={`review__card ${isExpandedByClick ? "review__card--js-expanded" : ""}`}
      onClick={handleClick}
      role="button" // Make it accessible as a clickable element
      tabIndex={0} // Make it focusable
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") handleClick();
      }} // Keyboard accessibility
    >
      <div className="review__card-header">
        <div className="review__avatar-section">
          <UserIcon />
        </div>
        <div className="review__author-details">
          <h3 className="review__author">{review.author || "Anonymous"}</h3>
          <StarRating stars={review.stars} />
        </div>
      </div>
      <div className="review__text-content">
        <p ref={textRef} className="review__text">
          {review.review}
        </p>
      </div>
    </div>
  );
};

export default ReviewCard;
