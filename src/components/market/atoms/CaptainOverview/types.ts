export interface CaptainOverviewProps {
  location?: string;
  phone?: string;
  email?: string;
  license?: string;
  companyName: string;
  captainName?: string;
  captainProfilePictureURL: string;
  groups: string[];
  paymentMethods: string[];
  firstResponderDiscount?: string;
  veteranDiscount?: string;
  militaryDiscount?: string;
  experience: string;
  charterId?: string;
  charter?: boolean;
  instagram: string,
  facebook: string,
  tikTok: string,
  yelp: string,
  experienceType?: string;
}
