export type ListingsTableViewProps = {
  rows?: any[];
  onDelete: (id: string | undefined) => void;
  onPublish: (id: string | undefined, isPublished: boolean) => void;
  onDuplicate: (data: any) => void;
};
