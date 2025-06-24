import React from "react";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { RightArrowIcon } from "@/components/shared/general/atoms/icons/RightArrowIcon";

interface MenuMobileCardProps {
  onClick: () => void;
  bg: string;
  color: string;
  text: string;
  hasIcon?: boolean;
  id?: string;
  toggledArrow?: boolean;
}

const MenuMobileCard: React.FC<MenuMobileCardProps> = ({
  onClick,
  bg,
  color,
  text,
  hasIcon,
  id,
  toggledArrow,
}) => {
  return (
    <button
      id={id}
      onClick={onClick}
      className="rounded-lg h-16 w-[246px] flex justify-between items-center px-4"
      style={{ background: bg }}
    >
      <div>
        {hasIcon && <PersonOutlineOutlinedIcon />}
        <span className="text-lg font-bold ml-2" style={{ color: color }}>
          {text}
        </span>
      </div>
      <div className={`${toggledArrow && "rotate-[90deg]"}`}>
        <RightArrowIcon size={15} stroke={"#2D3AAF"} />
      </div>
    </button>
  );
};

export default MenuMobileCard;
