import React, { MouseEventHandler } from "react";
import { useMediaQuery } from "@mui/material";

type Props = {
  onMouseLeave?: MouseEventHandler<any>;
  onExperienceClick: (value: string) => void;
};

export default function ExperiencesMenu({ onMouseLeave, onExperienceClick }: Props) {
  const isResponsive = useMediaQuery("(max-width: 1024px)");

  return (
    <div onMouseLeave={onMouseLeave} className="absolute" style={{ zIndex: 9999 }}>
      <ul className={`p-[20px] bg-white rounded-lg shadow-md flex flex-col items-start justify-center ${isResponsive ? 'mt-2 w-[328px]' : 'mt-6 w-[440px]'}`}>
        <li className={`hover:bg-slate-50 w-full cursor-pointer py-[19px] px-[10px]`} onClick={() => onExperienceClick("Fishing Charters")}>
          <p className="text-base line-clamp-1">Fishing Charters</p>
        </li>
        <li className={`hover:bg-slate-50 w-full cursor-pointer py-[19px] px-[10px]`} onClick={() => onExperienceClick("Tours: Dolphins, Island, Sunset/Sunrise, Shelling")}>
          <p className="text-base line-clamp-1">Tours: Dolphins, Island, Sunset/Sunrise, Shelling</p>
        </li>
      </ul>
    </div>
  );
}
