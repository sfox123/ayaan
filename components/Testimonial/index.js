import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faQuoteLeft } from "@fortawesome/free-solid-svg-icons"; // Import star and quote icons

const Testimonial = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        // Fetch from your Next.js API route
        const response = await fetch("/api/google-reviews");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setTestimonials(data);
      } catch (err) {
        console.error("Failed to fetch Google reviews:", err);
        setError("Failed to load reviews. Please try again later.");
        // Fallback to dummy data if fetching fails, useful for development
        setTestimonials([
          {
            tsImg: "/images/testimonial/img-1.jpg", // Use Next.js public path
            Des: "“The trip was incredible. I got to see so many places I wouldn't have by myself, me and my husband really enjoyed a lot.”",
            Title: "Benjir Walton",
            Sub: "Singapore",
            starRating: 5, // Add a dummy rating
          },
          {
            tsImg: "/images/testimonial/img-2.jpg",
            Des: "“Ayaan Tours made our honeymoon truly special. Every detail was perfect, and the personalized itinerary allowed us to experience the real Sri Lanka.”",
            Title: "Jenefar Meera",
            Sub: "Canada",
            starRating: 5,
          },
          {
            tsImg: "/images/testimonial/img-3.jpg",
            Des: "“Their commitment to sustainable tourism is commendable. We learned so much about the local culture and felt great supporting responsible travel.”",
            Title: "Lily Monalisa",
            Sub: "United Kingdom",
            starRating: 4,
          },
          {
            tsImg: "/images/testimonial/img-1.jpg",
            Des: "“Excellent service from start to finish! The chauffeur guide was incredibly knowledgeable, friendly, and went out of his way to make our journey comfortable.”",
            Title: "Michael S.",
            Sub: "Australia",
            starRating: 5,
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []); // Empty dependency array means this runs once on mount

  var settings = {
    dots: false,
    arrows: false,
    speed: 3000,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  if (loading) {
    return <div className="testimonial__loading">Loading reviews...</div>;
  }

  if (error && testimonials.length === 0) {
    // Only show error if no fallback data
    return <div className="testimonial__error">Error: {error}</div>;
  }

  return (
    <div className="testimonial__area section-padding">
      <div className="testimonial__container">
        <div className="testimonial__title-col">
          <div className="testimonial__section-title">
            <span>What Say Clients</span>
            <h2>
              Our Clients are <br /> Important to Us
            </h2>
          </div>
        </div>
        <div className="testimonial__row">
          <div className="testimonial__slider-wrapper">
            {testimonials.length > 0 ? (
              <Slider {...settings}>
                {testimonials.map((tesmnl, tsm) => (
                  <div
                    className="testimonial__grid"
                    key={tesmnl.reviewId || tsm}
                  >
                    {" "}
                    {/* Use reviewId for unique key */}
                    <div className="testimonial__ratting">
                      <ul>
                        {/* Render FontAwesome stars dynamically based on starRating */}
                        {[...Array(5)].map((_, i) => (
                          <li key={i}>
                            <FontAwesomeIcon
                              icon={faStar}
                              className={
                                i < tesmnl.starRating
                                  ? "testimonial__star-filled"
                                  : "testimonial__star-empty"
                              }
                            />
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="testimonial__quote">
                      <FontAwesomeIcon
                        icon={faQuoteLeft}
                        className="testimonial__quote-icon"
                      />
                      <p>{tesmnl.comment || tesmnl.Des}</p>{" "}
                      {/* Use 'comment' from API, fallback to 'Des' */}
                    </div>
                    <div className="testimonial__client-info">
                      <div className="testimonial__client-img">
                        {tesmnl.reviewerProfilePhotoUrl ? (
                          <Image
                            src={tesmnl.reviewerProfilePhotoUrl}
                            alt={tesmnl.reviewerName || "Client"}
                            width={60} // Adjust as needed
                            height={60} // Adjust as needed
                            objectFit="cover"
                            className="testimonial__client-avatar"
                          />
                        ) : tesmnl.tsImg ? ( // Fallback to local dummy image if API doesn't provide
                          <Image
                            src={tesmnl.tsImg}
                            alt={tesmnl.Title || "Client"}
                            width={60}
                            height={60}
                            objectFit="cover"
                            className="testimonial__client-avatar"
                          />
                        ) : (
                          // Placeholder if no image is available
                          <div className="testimonial__client-avatar-placeholder"></div>
                        )}
                      </div>
                      <div className="testimonial__client-text">
                        <h5>{tesmnl.reviewerName || tesmnl.Title}</h5>{" "}
                        {/* Use 'reviewerName' from API */}
                        <p>{tesmnl.Sub || "Google Review"}</p>{" "}
                        {/* Sub is for location/source */}
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
            ) : (
              <p className="testimonial__no-reviews">
                No reviews to display yet.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
