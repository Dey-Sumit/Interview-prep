import React, { useState } from "react";

type RatingProps = {
  defaultValue?: number;
  length?: number;
};

const Rating: React.FC<RatingProps> = ({ defaultValue = 3, length = 5 }) => {
  const [rating, setRating] = useState(defaultValue);
  const [hoverRating, setHoverRating] = useState<number | null>(null);

  const renderStars = () => {
    const effectiveRating = hoverRating ?? rating; // Use hoverRating if available, otherwise use rating
    const stars = [];
    for (let i = 1; i <= length; i++) {
      const isFullStar = effectiveRating >= i; // Check if the current star should be full

      stars.push(
        <span
          key={i}
          data-index={i}
          className={`cursor-pointer text-5xl ${isFullStar ? "text-yellow-500" : "text-gray-300"}`}
        >
          ★
        </span>
      );
    }
    return stars;
  };
  const handleMouseOver = (event: React.MouseEvent<HTMLDivElement>) => {
    const index = (event.target as HTMLSpanElement).dataset.index;
    if (index) {
      setHoverRating(Number(index));
    }
  };

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const index = (event.target as HTMLSpanElement).dataset.index;
    // const index = event.target.getAttribute("data-index");
    if (index) {
      setRating(Number(index));
    }
  };

  const handleMouseLeave = () => {
    setHoverRating(null);
  };

  return (
    <div
      className="flex  p-2 gap-4"
      onMouseOver={handleMouseOver}
      onClick={handleClick}
      onMouseLeave={handleMouseLeave}
    >
      {renderStars()}

      <span>hoverRating: {hoverRating}</span>
      <span>rating: {rating}</span>
    </div>
  );
};

export default Rating;
