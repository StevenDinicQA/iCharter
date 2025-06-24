import { useMediaQuery } from "@mui/material";
import { DownloadIcon } from "../../../general/atoms/icons/DownloadIcon";
import { DragnDropProps } from "./types";
import {
  ChangeEvent,
  DragEvent,
  KeyboardEvent,
  memo,
  useEffect,
  useRef,
} from "react";
import { DeleteIcon } from "../../../general/atoms/icons/DeleteIcon";
import Image from "next/image";
import { FileType } from "@/types/media/files";
import { CloseIcon } from "@/components/shared/general/atoms/icons/CloseIcon";
import { nanoid } from "nanoid";
import apiService from "@/services/apiService";
import { toast } from "react-hot-toast";

export const DragnDropUnmemoized = ({
  isShrinked,
  isLocked,
  files,
  isPDF,
  setFiles,
  footnote,
  inputName,
  listingId,
  acceptedFiles = "",
}: DragnDropProps) => {
  // Note: Change this any to a most meaningful
  // type
  const inputRef = useRef<any>();
  const isResponsive = useMediaQuery("(max-width: 1024px)");

  const handleFilesUpdate = (uploadedFiles: File[]) => {
    let filteredFiles: File[] = [];

    if (!isPDF) {
      filteredFiles = uploadedFiles.filter(
        (file) => file.type.includes("image") || file.type.includes("video")
      );
    }

    if (isPDF) {
      filteredFiles = uploadedFiles.filter(
        (file) =>
          file.type.includes("pdf") ||
          file.type.includes("image") ||
          file.type.includes("video")
      );
    }

    const mappedUploadedFiles: FileType[] = filteredFiles.map(
      (uploadedFile) => ({
        file: uploadedFile,
        id: nanoid(),
      })
    );

    if (!files || isPDF) {
      if (mappedUploadedFiles?.length > 0) {
        setFiles(mappedUploadedFiles);
      }
      return;
    }

    setFiles([...files, ...mappedUploadedFiles]);
    return;
  };

  const handleFilesDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    handleFilesUpdate(Array.from(event.dataTransfer.files));
  };

  const handleFilesInput = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    if (!event.target.files) {
      return;
    }

    handleFilesUpdate(Array.from(event.target.files));
  };

  const handleFileDelete = async (index: number, id?: string) => {
    if (!files) return;

    const { error, status } = await apiService.delete(
      `listings/${listingId}/media/${id}`
    );
    if (error) {
      toast.error(error);
      return;
    }
    const updatedFiles = [...files];
    updatedFiles.splice(index, 1);

    setFiles(updatedFiles);
  };

  const handleFilesClear = () => {
    setFiles([]);
    inputRef.current.value = null;
  };

  const mediaPreview =
    files &&
    files.map((file, index) => (
      <div key={`${file.id}`} className="relative">
        {file.file.type.includes("image") ? (
          <Image
            width={226}
            height={226}
            src={URL.createObjectURL(file.file)}
            alt="Uploaded photo by the user"
            className="w-full h-[226px] rounded-[12px] object-cover"
          ></Image>
        ) : (
          <video
            controls
            src={URL.createObjectURL(file.file)}
            className="w-full h-[226px] rounded-[12px] object-cover"
          ></video>
        )}
        {!isLocked ? (
          <div
            className="text-slate-400 focus:text-red-500 hover:text-red-500 m-[12px] p-[10px] rounded-full outline-red-500 absolute top-0 right-0 cursor-pointer bg-white transition"
            onClick={() => {
              handleFileDelete(index, file.id);
            }}
            onKeyDown={(event: KeyboardEvent<HTMLDivElement>) => {
              if (event.key === "Enter") {
                handleFileDelete(index, file.id);
              }
            }}
            tabIndex={0}
          >
            <DeleteIcon size={18} />
          </div>
        ) : (
          <div className="w-full h-full bg-white/50 absolute top-0 left-0"></div>
        )}
      </div>
    ));

  const pdfPreview = files && files[0] && (
    <div className="mb-[10px] border border-[#EFEFEF] rounded-[12px] py-[7px] px-[16px] flex justify-between items-center gap-[20px]">
      <div className="w-full flex justify-start items-center gap-[15px]">
        {files[0]?.file.type.includes("pdf") && (
          <Image
            src="/svgs/pdf_icon.svg"
            width={43}
            height={43}
            alt="Pdf Icon SVG"
          />
        )}
        <p className="text-[#454545] text-[16px] font-[500]">
          {files[0].file.name.slice(0, 13)}
          {files[0].file.name.length > 13 && "..."}
        </p>
      </div>
      <div className="flex items-center gap-[14px]">
        <label
          htmlFor={inputName}
          tabIndex={0}
          onKeyDown={(event: KeyboardEvent<HTMLLabelElement>) => {
            if (event.key === "Enter") {
              (event.target as HTMLLabelElement).click();
            }
          }}
          className="text-white text-[16px] font-[500] leading-[12px] py-[14px] px-[24px] rounded-[12px] bg-[#2D3AAF] cursor-pointer focus:outline-none focus:ring focus:border-blue-400"
        >
          Change
        </label>
        <div
          tabIndex={0}
          onClick={handleFilesClear}
          onKeyDown={(event: KeyboardEvent<HTMLDivElement>) => {
            if (event.key === "Enter") {
              handleFilesClear();
            }
          }}
          className="cursor-pointer"
        >
          <CloseIcon size={29} />
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <div
        id="drag-n-drop"
        onDragCapture={(event) => event.preventDefault()}
        onDragOverCapture={(event) => event.preventDefault()}
        onDrop={handleFilesDrop}
        className={`${isPDF && files && files[0] && "hidden"} ${
          !isShrinked
            ? "min-h-[247px] rounded-[24px]"
            : "py-[20px] px-[16px] rounded-[12px]"
        } mb-[10px] border border-dashed border-[#BDBDBD] flex flex-col justify-center items-center`}
      >
        {!isShrinked ? (
          <>
            <DownloadIcon size={49} />
            <h4 className="text-black text-[16px] font-[500] mt-[10px] mb-[4px]">
              Drag and drop a file
            </h4>
            <p className="text-black text-[13px] mb-[10px]">
              or upload file{!isPDF && "s"} from your documents
            </p>
            <label
              htmlFor={inputName}
              className="text-white text-[14px] px-[24px] py-[14px] rounded-[12px] bg-blue-hover cursor-pointer"
              tabIndex={0}
              onKeyDown={(event: KeyboardEvent<HTMLLabelElement>) => {
                if (event.key === "Enter") {
                  (event.target as HTMLLabelElement).click();
                }
              }}
            >
              Browse files
            </label>
          </>
        ) : (
          <>
            {!isResponsive ? (
              <label
                htmlFor={inputName}
                tabIndex={0}
                onKeyDown={(event: KeyboardEvent<HTMLLabelElement>) => {
                  if (event.key === "Enter") {
                    (event.target as HTMLLabelElement).click();
                  }
                }}
                className="text-black text-[13px] text-center cursor-pointer"
              >
                <strong>Drag and drop a file</strong> or{" "}
                <strong>upload files</strong> from your documents
              </label>
            ) : (
              <p className="text-black text-[13px] font-bold text-center mb-[4px] cursor-pointer">
                Upload files from your documents
              </p>
            )}
            <label
              htmlFor={inputName}
              className="lg:hidden text-white text-[14px] px-[24px] py-[14px] rounded-[12px] bg-blue-hover cursor-pointer"
            >
              Browse files
            </label>
          </>
        )}
        <input
          type="file"
          className="hidden"
          id={inputName}
          onChange={handleFilesInput}
          multiple
          ref={inputRef}
          accept={
            acceptedFiles.length === 0
              ? isPDF
                ? "image/png,image/jpg,image/jpeg,application/pdf,image/heif,image/heic,image/heif-sequence,image/heic-sequence"
                : "image/png,image/jpg,image/jpeg,video/mp4,video/avi,video/quicktime,image/heif,image/heic,image/heif-sequence,image/heic-sequence"
              : acceptedFiles
          }
        />
      </div>
      {isPDF && pdfPreview}
      <p className="text-[#B3B3B3] text-[11px] lg:text-[13px] text-center lg:text-left">
        {footnote}
      </p>
      <div
        id="preview-container"
        className={
          isPDF
            ? "mt-[20px]"
            : `mt-[20px] grid grid-cols-1 lg:grid-cols-2 gap-[20px]`
        }
      >
        {!isPDF && mediaPreview}
      </div>
    </div>
  );
};

export const DragnDrop = memo(DragnDropUnmemoized);
