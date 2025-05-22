import { PayloadAction } from "@reduxjs/toolkit";

export type CartState = {
  id: string;
  img: string;
  name: string;
  price: number;
  quantity: number;
  discountPrice?: number;
  size?: string;
  color?: string;
};

export type WishListState = {
  id: string;
  img: string;
  name: string;
  price: number;
  quantity: number;
  discountPrice?: number;
};

export interface ImageFile {
  name?: string;
  preview: string | string[];
  publicId?: string;
}

export type ProductType = {
  id: string;
  name: string;
  description: string;
  sku: string;
  categories: string[];
  tags: string[];
  reviews?: {
    name: string;
    rating: number;
    message: string;
    updatedAt?: string;
  }[];
  hasDiscount?: number;
  sizes: string[];
  colors: { id: string; name: string; image: string }[];
  images: { color: string; url: string[] }[];
  price: number;
  updatedAt?: string;
};

export type AddressType = {
  userId: string;
  firstName: string;
  lastName: string;
  companyName?: string;
  country: string;
  street: string;
  state: string;
  city: string;
  zip: string;
  phone: string;
  email: string;
  additionalInfo?: string;
  paymentMethod?: string;
};

interface OrderItem {
  product: ProductType;
  quantity: number;
  color: string;
  size: string;
}

export interface OrderType {
  id: string;
  orderDate: string;
  orderItems: OrderItem[];
  paymentMethod: string;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  trackingNumber: string;
  total: number;
  deliveryCharge: number;
  user: {
    email: string;
    name: string;
    address: {
      street: string;
      city: string;
      state: string;
      country: string;
      zip: string;
    }[];
  };
}

export type OrderStatus =
  | "delivered"
  | "pending"
  | "processing"
  | "shipped"
  | "cancelled";

export interface ProfileData {
  name: string;
  email: string;
  address: {
    id: string;
    firstName: string;
    lastName: string;
    companyName: string;
    country: string;
    street: string;
    state: string;
    city: string;
    zip: string;
    phone: string;
    email: string;
    additionalInfo: string;
    userId: string;
    createdAt: string;
    updatedAt: string;
  }[];
  createdAt: string;
}

export type FormAddressType = {
  userId: string;
  firstName: string;
  lastName: string;
  companyName?: string;
  country: { label: string; value: string };
  street: string;
  state: { label: string; value: string };
  city: { label: string; value: string };
  zip: string;
  phone: string;
  email: string;
  additionalInfo?: string;
  paymentMethod?: string;
};

export type CommonCartSectionProps = {
  productList?: CartState[];
  emptyCardName?: string;
  toastName: string;
  increaseAction: (payload: {
    id: CartState["id"];
  }) => PayloadAction<{ id: CartState["id"] }>;
  decreaseAction: (payload: {
    id: CartState["id"];
  }) => PayloadAction<{ id: CartState["id"] }>;
  removeAction: (payload: {
    id: CartState["id"];
  }) => PayloadAction<{ id: CartState["id"] }>;
  bottomSec?: React.ReactNode;
};

export type FaqItem = {
  question: string;
  answer: string;
};
