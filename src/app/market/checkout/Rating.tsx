import { AnchorIcon } from "@/components/shared/general/atoms/icons/AnchorIcon";
import React, { useState } from "react";

type RatingProps = {
  rating: number;
  setRating: Function;
  includeLabel?: boolean;
};

function RatingComponent({
  rating,
  setRating,
  includeLabel = true,
}: RatingProps) {
  const handleAnchorClick = (newRating: number) => {
    setRating(newRating);
  };

  return (
    <div className="flex gap-[20px] text-blue-800">
      {[1, 2, 3, 4, 5].map((index) => (
        <AnchorIcon
          key={index}
          size={40}
          opacity={index <= rating ? 1 : 0.5}
          onClick={() => handleAnchorClick(index)}
          className="cursor-pointer"
        />
      ))}
      {includeLabel ? (
        <div className="text-blue-800 text-3xl font-bold leading-normal">
          {rating}/5
        </div>
      ) : null}
    </div>
  );
}

export default RatingComponent;
