import { CharterMediaProps } from "./types";
import { DragnDrop } from "@/components/shared/forms/atoms/DragnDrop";
import { FormField } from "@/components/shared/forms/molecules/FormField";
import { RequiredIcon } from "@/components/shared/general/atoms/icons/RequiredIcon";

export const CharterMedia = ({
  files,
  setFiles,
  isUploading,
  className,
  formFieldStyles,
}: CharterMediaProps) => {
  /**
   * We can change how we handle the form state with
   * react-hook-form. See more on https://www.react-hook-form.com/
   */
  return (
    <div
      className={`text-[#454545] w-full flex flex-col gap-[21px] mt-4 ${className}`}
    >
      <section className="flex flex-col gap-[30px]">
        <div className="flex flex-col gap-[8px]">
          <h3 className="flex gap-1 text-[20px] font-[500] leading-[15px]">
            Photos and videos <RequiredIcon size={11} />
          </h3>
          <p className="text-[13px] leading-[18px]">
            Upload at least 5 photos or videos to publish in your profile.
          </p>
        </div>
        <FormField className={formFieldStyles}>
          <DragnDrop
            isShrinked={files.length > 0}
            isLocked={isUploading}
            files={files}
            setFiles={setFiles}
            inputName="media-upload"
            footnote={
              <span className="text-[13px] text-[#B3B3B3] font-[400]">
                <strong>Images:</strong> JPEG, JPG, PNG <strong>Videos:</strong>{" "}
                MP4, MOV, AVI, WAV
              </span>
            }
            acceptedFiles="image/png,image/jpg,image/jpeg,video/mp4,video/avi,video/quicktime"
          />
        </FormField>
      </section>
    </div>
  );
};
