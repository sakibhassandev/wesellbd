import { CartItem } from "@/components/cart/CartItem";
import { EmptyCart } from "@/components/cart/EmptyCart";
import { CommonCartSectionProps } from "@/lib/definitions";
import { Reply } from "lucide-react";

export const CommonCartSection = ({
  productList,
  emptyCardName,
  toastName,
  increaseAction,
  decreaseAction,
  removeAction,
  bottomSec,
}: CommonCartSectionProps) => {
  return (
    <div className="py-24 mx-6">
      {productList && productList.length < 1 ? (
        <EmptyCart name={emptyCardName || ""} />
      ) : (
        <div className="relative  xl:max-w-[1140px] lg:max-w-[960px] md:max-w-[720px] mx-auto overflow-x-auto">
          <div className="top rounded mb-8 p-[17px_37px] bg-[#F9F1E7]">
            <p className="hover:text-[#83AAC9] w-max ease-out duration-300">
              <a href="/shop" className="flex items-center gap-2">
                Continue Shopping <Reply className="text-xl" />
              </a>
            </p>
          </div>
          <table className="w-full max-lg:w-[900px] text-sm border border-[#eaedff]">
            <thead className="text-sm text-center capitalize">
              <tr className="border-b border-[#eaedff]">
                <th className="md:px-16 px-8 py-3 border-r border-[#eaedff]">
                  <span>Images</span>
                </th>
                <th scope="col" className="px-6 py-3 border-r border-[#eaedff]">
                  Product
                </th>
                <th scope="col" className="px-6 py-3 border-r border-[#eaedff]">
                  Unit Price
                </th>
                <th scope="col" className="px-6 py-3 border-r border-[#eaedff]">
                  Quantity
                </th>
                <th scope="col" className="px-6 py-3 border-r border-[#eaedff]">
                  Total
                </th>
                <th scope="col" className="px-6 py-3 border-r border-[#eaedff]">
                  Remove
                </th>
              </tr>
            </thead>
            <tbody>
              {productList?.map(
                ({
                  id,
                  img,
                  name,
                  price,
                  discountPrice,
                  quantity,
                  color,
                  size,
                }) => (
                  <CartItem
                    key={crypto.randomUUID()}
                    id={id}
                    img={img}
                    name={name}
                    color={color}
                    size={size}
                    price={price}
                    discountPrice={discountPrice}
                    quantity={quantity}
                    toastName={toastName}
                    increaseAction={increaseAction}
                    decreaseAction={decreaseAction}
                    removeAction={removeAction}
                  />
                )
              )}
            </tbody>
          </table>
        </div>
      )}
      {bottomSec}
    </div>
  );
};
