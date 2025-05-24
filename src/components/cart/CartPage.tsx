"use client";

import Link from "next/link";
import { useSelector } from "react-redux";
import { SectionCommonHeader } from "@/components/common/SectionCommonHeader";
import { CommonCartSection } from "@/components/cart/CommonCartSection";
import { InfoHighlights } from "@/components/common/InfoHighlights";
import {
  decreaseCartItemQuantity,
  increaseCartItemQuantity,
  removeCartItem,
} from "@/store/slices/cartSlice";
import { RootState } from "@/store";
import { CartState } from "@/lib/definitions";

const CartPage = () => {
  const cartItems = useSelector((state: RootState) => state.cartItems);
  const totalPrice = cartItems
    .reduce((acc: number, curr: CartState) => {
      return (
        acc +
        (curr.discountPrice ? curr.discountPrice : curr.price) * curr.quantity
      );
    }, 0)
    .toFixed(2);
  return (
    <section id="cart-page">
      <SectionCommonHeader prev={"Home"} curr={"Cart"} name={"My Cart"} />
      <CommonCartSection
        productList={cartItems}
        emptyCardName="cart"
        toastName="cart"
        increaseAction={increaseCartItemQuantity}
        decreaseAction={decreaseCartItemQuantity}
        removeAction={removeCartItem}
        bottomSec={
          <div
            className={`${
              cartItems.length < 1
                ? "hidden"
                : "xl:max-w-[1140px] lg:max-w-[960px] md:max-w-[720px] mx-auto md:flex justify-end"
            }`}
          >
            <div className="ml-auto mt-14 md:w-5/12">
              <h2 className="text-2xl mb-5 capitalize text-[#03041c] font-semibold">
                Cart totals
              </h2>
              <ul className="border border-[#eaeaef] mb-8">
                <li className="text-[15px] text-[#03041c] p-[10px_20px] border-b border-[#eaeaef]">
                  Subtotal{" "}
                  <span className="float-right text-[#525258]">
                    ${totalPrice}
                  </span>
                </li>
                <li className="text-[15px] text-[#03041c] p-[10px_20px] border-b border-[#eaeaef]">
                  Total{" "}
                  <span className="float-right text-[#525258]">
                    ${totalPrice}
                  </span>
                </li>
              </ul>
              <Link
                href="/checkout"
                className="p-[16px_40px_18px] rounded-sm  text-white ease-out duration-300 bg-[#83AAC9] hover:bg-[#8399C9] text-sm"
              >
                Proceed to checkout
              </Link>
            </div>
          </div>
        }
      />
      <InfoHighlights />
    </section>
  );
};

export default CartPage;
