import { SvgIconTypeMap } from "@mui/material";
import React from "react";

type props = {
  Icon: any;
  title: string;
  content: string;
};

function Card({ Icon, title, content }: props) {
  return (
    <div className="flex flex-col items-center justify-center  w-56">
      <div className="rounded-full flex items-center justify-center bg-[#92D6F3] h-14 w-14 mb-2">
        <Icon sx={{ color: "white" }} />
      </div>
      <h4 className="font-medium text-lg mb-4">{title}</h4>
      <p className="text-base text-center	">{content}</p>
    </div>
  );
}

export default Card;
