import React, { useEffect, useState } from "react";
import { getFeedbacks } from "../helpers/UserApis";
import "../stylings/TestimonyCarousel.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

function TestimonyCarousel() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const data = await getFeedbacks();
        setFeedbacks(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFeedbacks();
  }, []);

  const handleNext = () => {
    if (currentIndex < feedbacks.length - 1) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex(currentIndex + 1);
        setIsTransitioning(false);
      }, 300);
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex(currentIndex - 1);
        setIsTransitioning(false);
      }, 300);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  const currentFeedback = feedbacks[currentIndex];
  const nextFeedback =
    currentIndex < feedbacks.length - 1 ? feedbacks[currentIndex + 1] : null;
  const prevFeedback = currentIndex > 0 ? feedbacks[currentIndex - 1] : null;

  return (
    <div
      className="carousel-container d-flex min-vh-100"
      // style={{ borderRadius: "80px 0px 0px 80px" }}
    >
      {/* Previous Feedback */}
      {prevFeedback && (
        <div
          className={`feedback prev-feedback`}
          style={{
            backgroundImage: `url(${prevFeedback.image_url})`,
            opacity: isTransitioning ? 0 : 1,
          }}
        />
      )}

      {/* Current Feedback */}
      <div
        className={`feedback current-feedback`}
        style={{
          backgroundImage: `url(${currentFeedback.image_url})`,
          transition: isTransitioning ? "none" : "all 0.3s ease-in-out",
        }}
      />

      {/* Next Feedback */}
      {nextFeedback && (
        <div
          className={`feedback next-feedback`}
          style={{
            backgroundImage: `url(${nextFeedback.image_url})`,
            opacity: isTransitioning ? 0 : 1,
          }}
        />
      )}

      {/* Content */}
      <div className="carousel-content p-5 mt-auto mt-lg-auto border mx-5 mb-5 rounded-5 shadow-lg">
        <p className="fs-3 fw-normal">“{currentFeedback.content}”</p>
        <div className="row">
          <div className="col-lg-8">
            <p className="fs-3 fw-normal">{currentFeedback.user.name}</p>
            <p className="m-0 fw-normal">{currentFeedback.position}</p>
            <p className="fw-light">{currentFeedback.company}</p>
          </div>
          <div className="col-lg-4 carousel-buttons d-flex justify-content-end align-items-end">
            <button
              className="rounded-circle"
              onClick={handleBack}
              disabled={currentIndex === 0}
            >
              <ArrowBackIcon />
            </button>
            <button
              className="rounded-circle"
              onClick={handleNext}
              disabled={currentIndex === feedbacks.length - 1}
            >
              <ArrowForwardIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TestimonyCarousel;
