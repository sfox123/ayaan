// components/Review.js
import React from "react";
import ReviewCard from "../ReviewCard"; // Import the new ReviewCard component

const Review = ({ reviews }) => {
  if (!reviews || reviews.length === 0) {
    return <p className="review__no-reviews-message">No reviews yet.</p>;
  }

  return (
    <div className="review__container">
      {reviews.map((review, index) => (
        // Pass the entire review object to ReviewCard
        <ReviewCard review={review} key={index} />
      ))}
    </div>
  );
};

export default Review;
