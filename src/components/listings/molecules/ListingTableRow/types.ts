export type ListingTableRowProps = {
  id?: string;
  previewImgUrl?: string;
  experienceName: string;
  complete: boolean;
  experienceType?: string[];
  duration?: string;
  bidRequests?: { id: number; amount: number; status: string; createdAt: string }[];
  isPublished?: boolean;
  onDelete: () => void;
  onPublish: (id: string | undefined, isPublished: boolean) => void;
  onDuplicate: (data: any) => void;
  fullRowData: any;
  isCharterBidEnabled: any;
};
