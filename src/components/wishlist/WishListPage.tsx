"use client";

import Link from "next/link";
import { RootState } from "@/store";
import { CommonCartSection } from "@/components/cart/CommonCartSection";
import { SectionCommonHeader } from "@/components/common/SectionCommonHeader";
import { InfoHighlights } from "@/components/common/InfoHighlights";
import { useSelector } from "react-redux";
import {
  increaseWishlistQuantity,
  decreaseWishlistQuantity,
  removeWishListItem,
} from "@/store/slices/wishListSlice";

const WishListPage = () => {
  const wishListItems = useSelector((state: RootState) => state.wishList);
  return (
    <section>
      <SectionCommonHeader name="My Wishlist" prev="Home" curr="Wishlist" />
      <CommonCartSection
        productList={wishListItems}
        emptyCardName="wishlist"
        toastName="wishlist"
        increaseAction={increaseWishlistQuantity}
        decreaseAction={decreaseWishlistQuantity}
        removeAction={removeWishListItem}
        bottomSec={
          <div
            className={`wishListsBtn pt-14 xl:max-w-[1140px] text-white lg:max-w-[960px] md:max-w-[720px] mx-auto ${
              wishListItems.length < 1 ? "hidden" : ""
            }`}
          >
            <Link
              className="p-[16px_40px_18px] rounded-sm hover:bg-[#96732B] ease-out duration-300 bg-[#ddad3d] text-sm"
              href="/cart"
            >
              Go to Cart
            </Link>
          </div>
        }
      />
      <InfoHighlights />
    </section>
  );
};

export default WishListPage;
