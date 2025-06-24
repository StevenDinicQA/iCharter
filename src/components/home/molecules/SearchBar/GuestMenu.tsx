import React, { MouseEventHandler } from "react";
import { useMediaQuery } from "@mui/material";
import { GuestPlusIcon } from "@/components/shared/general/atoms/icons/GuestPlusIcon";
import { GuestMinorIcon } from "@/components/shared/general/atoms/icons/GuestMinorIcon";

type Props = {
  guests: number;
  setGuests: (guests: number) => void;
  isMarketPlace?: boolean;
  isMapView?: boolean;
  onMouseLeave?: MouseEventHandler<any>;
};

export default function GuestMenu({
  guests,
  setGuests,
  isMarketPlace,
  isMapView,
  onMouseLeave,
}: Props) {
  const isResponsive = useMediaQuery("(max-width: 768px)");

  const handleIncrement = () => {
    const updatedCounter = guests + 1;
    setGuests(updatedCounter);
  };

  const handleDecrement = () => {
    if (guests > 0) {
      const updatedCounter = guests - 1;
      setGuests(updatedCounter);
    }
  };

  return (
    <div
      onMouseLeave={onMouseLeave}
      className={`absolute bg-white rounded-lg p-4 shadow-md
      ${isResponsive && !isMarketPlace && "lg:left-[59%] mt-2 w-[150px]"}
      ${
        !isResponsive &&
        !isMarketPlace &&
        "lg:left-[59%] top-[245px] mt-4 w-[170px]"
      }
      ${isMarketPlace && !isMapView && "lg:left-[59%] lg:top-[70%]"}
      ${!isResponsive && isMapView && "top-[60px] left-[59%]"}
      `}
      style={{ zIndex: 9999 }}
    >
      <div className="relative flex justify-center">
        <button onClick={handleDecrement}>
          <GuestMinorIcon stroke="#454545" size={27} />
        </button>
        <span className="mx-3 font-bold"> {guests} </span>
        <button onClick={handleIncrement}>
          <GuestPlusIcon stroke="#454545" size={27} />
        </button>
      </div>
    </div>
  );
}
