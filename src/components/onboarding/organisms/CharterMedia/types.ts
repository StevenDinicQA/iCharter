export interface CharterMediaProps {
  files: CustomFileType[];
  setFiles: any;
  isUploading?: boolean;
  className?: string;
  formFieldStyles?: string;
}

export type CustomFileType = {
  file: File;
  id: string;
};
