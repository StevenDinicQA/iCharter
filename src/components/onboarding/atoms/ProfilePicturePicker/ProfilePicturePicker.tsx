import { EditIcon } from "@/components/shared/general/atoms/icons/EditIcon";
import { ProfilePicturePickerProps } from "./types";
import { useEffect, useState } from "react";
import Image from "next/image";

export const ProfilePicturePicker = ({
  htmlFor,
  file,
  profilePictureUrl
}: ProfilePicturePickerProps) => {
  const [avatarUrl, setAvatarUrl] = useState<string>("");

  useEffect(() => {
    // We only want to update the preview if `file`
    // isn’t null

    if (file && file.type.includes("image")) {
      // The `File` type is a child of the `Blob` type,
      // so we can safely cast this here.
      setAvatarUrl(URL.createObjectURL(file as Blob));
    }else{
      setAvatarUrl(profilePictureUrl)
    }
  }, [file]);

  return (
    <div className="flex flex-col items-center lg:items-start">
      <div className="w-max relative">
        <div className="w-[138px] h-[138px] mb-[14px] rounded-full bg-slate-200 overflow-hidden">
          {avatarUrl && (
            <Image
              width={138}
              height={138}
              src={avatarUrl}
              alt="Uploaded profile picture"
              className={`${!avatarUrl && "hidden"} w-full h-full object-cover`}
            />
          )}
        </div>
        <label
          className="w-[46px] h-[46px] rounded-full bg-white flex justify-center items-center absolute bottom-0 right-0 cursor-pointer"
          htmlFor={htmlFor}
        >
          <EditIcon size={25} />
        </label>
      </div>
      <small className="text-[#B3B3B3] text-[13px]">
        <span className="font-[700]">Accepted images:</span> JPEG, JPG, PNG
      </small>
    </div>
  );
};
