export interface Seller {
  _id: string;
  googleId: string;
  name: string;
  logo: string;
  address: string;
  mobileNo: string;
  verifiedSupplier: boolean;
  experience: number;
  onlineStatus: boolean;
  views: number;
  rating: number;
  trustSEAL: boolean;
  leadingSupplier: boolean;
  verified: boolean;
  details:string,
  reviews:{name:string,comment:string,rating:string}[],
  banner:string,
  establishment:number,
  workingDays:string,
  annualTurnover:number,
  numberOfEmployees:number,
  legalStatus:string,
  natureOfBusiness:string,
  website:string,
  responseRate:number,
  transactions:number,
  country:string,
  email:string,
  __v: number;
}

export interface Product {
  _id: string;
  title: string;
  description: string;
  productType: string;
  grade: string;
  purity: string;
  unitsOfMeasure: string;
  category: string;
  moq: number;
  mrp: number;
  images: string[];
  listing: string;
  seller: Seller;
  updatedAt: string; // ISO 8601 date string
  createdAt: string; // ISO 8601 date string
  sales: any[]; // You can replace `any` with a more specific type if available
  __v: number;
}
export interface query{
  selectedCategory: string|null,
  inStock: null | boolean,
  minPrice: number|string,
  maxPrice: number|string,
  businessType: string|null,
}
