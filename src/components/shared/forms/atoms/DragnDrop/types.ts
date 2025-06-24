import { FileType } from "@/types/media/files";
import { FILE_TYPE } from "@/utils/enums/fileTypes";
import { ReactNode } from "react";

export type DragnDropProps = {
  isShrinked?: boolean;
  isLocked?: boolean;
  isPDF?: boolean;
  files?: FileType[];
  setFiles: (arg: FileType[]) => void;
  footnote?: ReactNode;
  inputName: string;
  multiple?: boolean;
  listingId?: string;
  acceptedFiles?: string;
};
