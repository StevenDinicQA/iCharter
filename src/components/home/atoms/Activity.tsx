import React from "react";

type Props = {
  title: string;
  imageName: string;
};
function Activity({ title, imageName }: Props) {
  return (
    <div
      className={`w-[364px] h-[200px] rounded-md border bg-cover bg-no-repeat bg-center flex items-end relative`}
      style={{
        backgroundImage: `url(${imageName})`,
      }}
    >
      <div
        className="w-full h-full absolute top-0 left-0 bg-black opacity-50"
        style={{ borderRadius: "inherit" }}
      />
      <p className="text-base text-white font-bold mb-4 ml-4  absolute bottom-4 left-4">
        {title}
      </p>
    </div>
  );
}

export default Activity;
