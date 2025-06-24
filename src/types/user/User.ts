export default interface User {
  id: string;
  name: string;
  lastName: string;
  email: string;
  isFacebookUser: boolean;
  createdAt: Date;
  userType: "customer" | "charter";
  charterProfile?: CharterProfile | null | undefined;
}

export interface CharterProfile {
  instagram: string;
  facebook: string;
  tikTok: string;
  yelp: string;
  id: number;
  email: string;
  companyName: string;
  captains: string[];
  phoneNumber: string;
  yearsOfExperience: string;
  licensePDFUrl: string;
  location: string;
  profilePictureUrl: null;
  nationality: string;
  groups: Groups;
  createdAt: Date;
  media: CharterProfileMedia[];
}

export interface Groups {
  veteran: boolean;
  military: boolean;
  firstResponders: boolean;
  minorityOwnedBusiness: boolean;
}

export interface CharterProfileMedia {
  mediaId: number;
  fileUrl: string;
}
