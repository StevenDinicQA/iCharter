import Link from "next/link";
import React from "react";
import { ArrowLeft } from "@/components/shared/general/atoms/icons/ArrowLeft";

type Props = {
  path?: string;
  [props: string]: any;
};

function BackPageBtn({ path = "/", ...props }: Props) {
  return (
    <Link
      className="self-start ml-10 mt-10 flex items-center"
      href={path}
      {...props}
    >
      <ArrowLeft fill="black" size={16} />
      <p className="self-start md:block hidden">Go Back</p>
    </Link>
  );
}

export default BackPageBtn;
