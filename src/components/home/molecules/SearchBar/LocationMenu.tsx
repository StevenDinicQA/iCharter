import React, { LegacyRef, MouseEventHandler } from "react";
import { useMediaQuery } from "@mui/material";

type Props = {
  onMouseLeave?: MouseEventHandler<any>;
  onLocationClick: (value: string) => void; 
  isMarketPlace?: boolean;
};

export default function LocationMenu({ onMouseLeave, onLocationClick, isMarketPlace }: Props) {
  const isResponsive = useMediaQuery("(max-width: 1024px)");

  return (
    <div onMouseLeave={onMouseLeave} className={`absolute ${isMarketPlace ? 'left-[226px]' : 'left-0'}`} style={{ zIndex: 9999 }}>
      <div className="relative">
        <ul className={`bg-white p-[20px] rounded-lg shadow-md flex flex-col items-start justify-center ${isResponsive ? 'mt-2 w-[328px]' : 'mt-6 w-[290px]'}`}>
          <li className={`hover:bg-slate-50 w-full cursor-pointer py-[19px] px-[10px]`} onClick={() => onLocationClick("Tampa Bay, Florida, EEUU")}>
            <p className="text-base line-clamp-1">Tampa Bay, Florida, EEUU</p>
          </li>
          <li className={`hover:bg-slate-50 w-full cursor-pointer py-[19px] px-[10px]`} onClick={() => onLocationClick("Tampa Bay")}>
            <p className="text-base line-clamp-1">Tampa Bay</p>
          </li>
          <li className={`hover:bg-slate-50 w-full cursor-pointer py-[19px] px-[10px]`} onClick={() => onLocationClick("Florida, EEUU")}>
            <p className="text-base line-clamp-1">Florida, EEUU</p>
          </li>
        </ul>
      </div>
    </div>
  );
}
