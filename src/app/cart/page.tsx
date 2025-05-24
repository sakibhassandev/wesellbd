import { Metadata } from "next";
import StoreProvider from "@/store/StoreProvider";
import CartPage from "@/components/cart/CartPage";

export const metadata: Metadata = {
  title: "Cart",
};

const Cart = () => {
  return (
    <StoreProvider>
      <CartPage />
    </StoreProvider>
  );
};

export default Cart;
